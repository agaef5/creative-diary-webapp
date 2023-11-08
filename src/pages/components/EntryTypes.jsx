import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ref, set, push, serverTimestamp, onValue } from "firebase/database";
import { database } from "../../../firebase-config";
import { UserAuth } from "../../authentication/context/AuthContext";
import { AddProject, SelectProject } from "./Projects";
import { AddTag, SelectTag } from "./Tags";
import "../../styles/braindump.css";
import LightBulb from  "../../styles/images/lightbulb.png"
import LightBulbOn from  "../../styles/images/lightbulbOn.png"


// function to get time and display it below title
// it is global, so can be used in all functions below
export const currentDate = () => {
  var today = new Date();
  // var options = { weekday: 'long' };
  var day = String(today.getDate()).padStart(2, "0");
  var month = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var year = today.getFullYear();
  var formattedDate = day + "/" + month + "/" + year;
  return formattedDate;
};

const DailyChallengeTimer = () => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0,
        0,
        0
      );
      const timeDifference = midnight.getTime() - now.getTime();

      let hours = Math.floor(timeDifference / (1000 * 60 * 60));

      hours = hours < 10 ? "0" + hours : hours;

      setTimeLeft(`${hours}`);
    };

    const timer = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <p>{timeLeft}h</p>;
};

export function SaveEntry({ open, onClose, ...props }) {
  if (!open) return null;
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const { inputType, title, userInput, ChallengePromptID, BoosterPromptID } =
    props;
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const { user } = UserAuth();
  const userID = user.uid;

  function dbUpload() {
    const newEntry = push(ref(database, "entries/" + userID));

    //uploading BrainDump data to database
    const entryData = {
      timestamp: serverTimestamp(),
      text: userInput,
    };

    if (inputType) {
      entryData.inputType = inputType;
    }

    if (title) {
      entryData.title = title;
    }

    if (ChallengePromptID) {
      entryData.promptID = ChallengePromptID;
    }
    if (BoosterPromptID) {
      entryData.promptID = BoosterPromptID;
    }

    if (selectedProjects && selectedProjects.length > 0) {
      entryData.projects = selectedProjects;
    }

    if (selectedTags && selectedTags.length > 0) {
      entryData.tags = selectedTags;
    }

    set(newEntry, entryData);

    if (ChallengePromptID) {
      set(
        ref(
          database,
          "users/" + userID + "/prompts/DailyChallenge/" + ChallengePromptID
        ),
        true
      );
    }

    if (BoosterPromptID) {
      set(
        ref(
          database,
          "users/" + userID + "/prompts/CreativityBooster/" + BoosterPromptID
        ),
        true
      );
    }
    // confirmation
    alert("Entry saved!");
    navigate("/dashboard/ChooseEntryType");
    // navigate to ChooseInputType component
  }

  return (
    <>
      <div className="overlay" onClick={onClose}>
        <div
          className="moduleContainer flex-col"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <button onClick={onClose}>x</button>
          <div className="flex-col">
            <h2>Add Tags</h2>
            <SelectTag onTagSelect={setSelectedTags} />
            <AddTag />
          </div>
          <div>
            <h2>Assign to a Project</h2>
            <AddProject open={openModal} onClose={() => setOpenModal(false)} />
            <SelectProject onProjectSelect={setSelectedProjects} />
            <button onClick={() => setOpenModal(true)}>+</button>
          </div>
          <button onClick={dbUpload}>Save</button>
        </div>
      </div>
    </>
  );
}

export function ChooseInputType() {
  return (
    <section>
      <h2>Where Will Your Pen Take You Today?</h2>
      <p>Pick Your Entry Of Choice</p>
      <div>
        <div>
          <Link to="/dashboard/BrainDump">
            <div>
              <img></img>
              <p>Brain Dump</p>
            </div>
          </Link>

          <Link to="/dashboard/DailyChallenge">
            <div>
              <div className="DailyChallengeTimer">
                <DailyChallengeTimer />
              </div>
              <img></img>
              <p>Daily Challenge</p>
            </div>
          </Link>

          <Link to="/dashboard/CreativityBooster">
            <div>
              <img></img>
              <p>Creativity Booster</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function BrainDump() {
  const [title, setTitle] = useState("");
  const [userInput, setUserInput] = useState("");
  const [openSave, setOpenSave] = useState(false);

  return (
    <div className="inputSpaceBD">
      <div className="flex-col">
        <div className="flex-row">
          <input
            className="titleStylesBD"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled"
          />
          <button className="saveBtn" onClick={() => setOpenSave(true)}>
            Save
          </button>
        </div>
        <p className="dateStleBD">{currentDate()}</p>
      </div>
      <div>
        <input
          className="inputStyleBD"
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="What is it you're thinking of..."
        />
      </div>

      <SaveEntry
        open={openSave}
        inputType="BrainDump"
        title={title}
        userInput={userInput}
        onClose={() => setOpenSave(false)}
      />
    </div>
  );
}

function fetchTodayPromptID(inputType, userID, setGeneratedID) {
  const todayDate = currentDate();
  const userTodayPromptRef = ref(
    database,
    `users/${userID}/prompts/todayPrompt/${inputType}`
  );

  onValue(userTodayPromptRef, (snapshot) => {
    const data = snapshot.val();
    if (data && data.updateDate === todayDate) {
      setGeneratedID(data.promptID);
    } else {
      // PROMISE
      generateUniquePromptID(inputType, userID, setGeneratedID)
        .then((newID) => {
          setGeneratedID(newID);
          set(userTodayPromptRef, { updateDate: todayDate, promptID: newID });
        })
        .catch((error) => {
          console.error("Error occurred: ", error);
        });
    }
  });
}

function generateUniquePromptID(inputType, userID, setGeneratedID) {
  return new Promise((resolve, reject) => {
    generateNewID(inputType, userID, resolve, reject);
  });
}

function generateNewID(inputType, userID, resolve, reject) {
  const newGeneratedID = Math.floor(Math.random() * 41) + 1;
  const userPromptsRef = ref(database, `users/${userID}/prompts/${inputType}/`);

  onValue(userPromptsRef, (snapshot) => {
    const data = snapshot.val();
    if (data && data[newGeneratedID]) {
      generateNewID(inputType, userID, resolve, reject);
    } else {
      resolve(newGeneratedID);
    }
  });
}

export function DailyChallenge() {
  const [prompt, setPrompt] = useState("");
  const [userInput, setUserInput] = useState("");
  const [openSave, setOpenSave] = useState(false);
  const [generatedID, setGeneratedID] = useState("");
  const { user } = UserAuth();
  const userID = user.uid;

  useEffect(() => {
    fetchTodayPromptID("DailyChallenge", userID, setGeneratedID); // !!!!!!!!!
  }, []);

  useEffect(() => {
    generatePrompt();
  }, [generatedID]);

  function generatePrompt() {
    if (generatedID !== "") {
      const promptRef = ref(database, `prompts/DailyChallenge/${generatedID}`);
      onValue(promptRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setPrompt(data.prompt);
        }
      });
    }
  }

  return (
    <>
      <div className="inputSpaceBD">
        <div className="flexboxing">
          <div>
            <h2 className="promptStylesBD">{prompt}</h2>
            <p className="dateStleBD">{currentDate()}</p>
          </div>
          <button className="saveBtn" onClick={() => setOpenSave(true)}>
            Save
          </button>
        </div>
        <div>
          <input
            className="inputStyleBD"
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="What is it you're thinking of..."
          />
        </div>

        <SaveEntry
          open={openSave}
          inputType="DailyChallenge"
          title={prompt}
          userInput={userInput}
          ChallengePromptID={generatedID}
          onClose={() => setOpenSave(false)}
        />
      </div>
    </>
  );
}

export function CreativityBooster() {
  const [prompt, setPrompt] = useState("");
  const [userInput, setUserInput] = useState("");
  const [openSave, setOpenSave] = useState(false);
  const [generatedID, setGeneratedID] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [imageSource1, setImageSource1] = useState(LightBulb);
  const [imageSource2, setImageSource2] = useState(LightBulb);
  const [imageSource3, setImageSource3] = useState(LightBulb);
  const { user } = UserAuth();
  const userID = user.uid;

  useEffect(() => {
    const hasInteracted = localStorage.getItem("hasInteracted");
    const today = new Date().toDateString();
    if (hasInteracted === today) {
      setShowPrompt(true);
    } else {
      setShowPrompt(false);
    }
  }, []);

  useEffect(() => {
    fetchTodayPromptID("CreativityBooster", userID, setGeneratedID);
  }, []);

  useEffect(() => {
    generatePrompt();
  }, [generatedID]);

  function generatePrompt() {
    // loading prompt data, searching for the one with ID we just generated
    if (generatedID !== "") {
      const promptRef = ref(
        database,
        `prompts/CreativityBooster/${generatedID}`
      );
      onValue(promptRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setPrompt(data.prompt);
        }
      });
    }
  }


  const handleLightBulbOn = (imageNumber) => {
    if (imageNumber === 1) {
      setImageSource1(LightBulbOn);
      setImageSource2(LightBulb);
      setImageSource3(LightBulb);
    } else if (imageNumber === 2) {
      setImageSource1(LightBulb);
      setImageSource2(LightBulbOn);
      setImageSource3(LightBulb);
    } else if (imageNumber === 3) {
      setImageSource1(LightBulb);
      setImageSource2(LightBulb);
      setImageSource3(LightBulbOn);
    }
  };
  
  function showCreativityBooster() {
    const today = new Date().toDateString();
    localStorage.setItem("hasInteracted", today);
    setShowPrompt(true);
  }

  return (
    <div className="inputSpaceBD">
      <div>
        {showPrompt === false && (
          <div className="choosePictureContainer">
            <div className="choosePictureContent">
                <div className="choosePictureText">
                  <h2>Choose Your Creativity Booster</h2>
                  <p>Pick Your Variant Of Choice</p>
                  </div>
                  <div className="choosePicture">
                    <div onMouseDown={() => handleLightBulbOn(1)} onClick={showCreativityBooster}>
                      <img src={imageSource1} />
                    </div>

                    <div onMouseDown={() => handleLightBulbOn(2)} onClick={showCreativityBooster}>
                      <img src={imageSource2} />
                    </div>

                    <div onMouseDown={() => handleLightBulbOn(3)} onClick={showCreativityBooster}>
                      <img src={imageSource3} />
                    </div>
                  </div>
            </div>

          </div>
          
        )}

        {showPrompt === true && (
          <div>
            <div className="flexboxing">
              <div>
                <h2 className="promptStylesBD">{prompt}</h2>
                <p className="dateStleBD">{currentDate()}</p>
              </div>
              <button className="saveBtn" onClick={() => setOpenSave(true)}>
                Save
              </button>
            </div>
            <div>
              <input
                className="inputStyleBD"
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Show your creation here..."
              />
            </div>
            <SaveEntry
              open={openSave}
              inputType="CreativityBooster"
              title={prompt}
              userInput={userInput}
              BoosterPromptID={generatedID}
              onClose={() => setOpenSave(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
