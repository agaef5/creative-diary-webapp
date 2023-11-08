import { SideBar } from "./components/SideBar";
import { UserAuth } from "../authentication/context/AuthContext";
import { signOut } from "firebase/auth";
import { Outlet, useNavigate } from "react-router-dom";
import { auth, database } from "../../firebase-config";
import { GetUser } from "./components/functions/functions";
import { useState, useEffect } from "react";
import { onValue, ref, update } from "firebase/database";
import "../styles/account.css";

export default function Account() {
  const navigate = useNavigate();
  const [openSide, setOpenSide] = useState(false);
  const [section, setSection] = useState("settings");

  const { user } = UserAuth();
  const userName = GetUser(user.uid);

  function LogOut() {
    signOut(auth);
    navigate("/");
    alert("You're logged out!");
  }

  useEffect(() => {
    if (openSide) {
      navigate(`/account/${section}`);
    }
  }, [openSide, section, navigate]);

  function handleAccountSection(accountSection) {
    setSection(accountSection);
    setOpenSide(true);
  }



  return (
    <div class="accountPage">
      <SideBar />
      <div className="accountContainer">
        <div className="mainAccount">
          <h2>{userName.username}</h2>
          <p>{user.email}</p>

          <p id="CreativeFieldsTitle">Creative Fields</p>

          <div className="manageAccountContainer">
            <h3>Manage Your Account</h3>
  
            <div className="manageAccountOptions">
                <button className="flex-row"
                    id="settings"
                    onClick={() => handleAccountSection("settings")}
                  >
                    <p>Settings</p>
                    <svg
                        width="13"
                        height="21"
                        viewBox="0 0 13 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12.2305 10.5928C12.2305 10.7412 12.1992 10.8818 12.1367 11.0146C12.082 11.1396 12 11.2568 11.8906 11.3662L2.60938 20.4482C2.39844 20.6592 2.14062 20.7646 1.83594 20.7646C1.64062 20.7646 1.46094 20.7178 1.29688 20.624C1.13281 20.5303 1.00391 20.4014 0.910156 20.2373C0.816406 20.0811 0.769531 19.9014 0.769531 19.6982C0.769531 19.4092 0.871094 19.1553 1.07422 18.9365L9.60547 10.5928L1.07422 2.24902C0.871094 2.03027 0.769531 1.77637 0.769531 1.4873C0.769531 1.28418 0.816406 1.10449 0.910156 0.948242C1.00391 0.78418 1.13281 0.655273 1.29688 0.561523C1.46094 0.467773 1.64062 0.420898 1.83594 0.420898C2.14062 0.420898 2.39844 0.522461 2.60938 0.725586L11.8906 9.81934C12 9.92871 12.082 10.0498 12.1367 10.1826C12.1992 10.3076 12.2305 10.4443 12.2305 10.5928Z"
                          fill="var(--text)"
                        />
                      </svg>
                  </button>
                  <button className="flex-row"
                    id="sub"
                    onClick={() => handleAccountSection("subscription")}
                  >
                    <p>Subscription</p>
                      <svg
                        width="13"
                        height="21"
                        viewBox="0 0 13 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.2305 10.5928C12.2305 10.7412 12.1992 10.8818 12.1367 11.0146C12.082 11.1396 12 11.2568 11.8906 11.3662L2.60938 20.4482C2.39844 20.6592 2.14062 20.7646 1.83594 20.7646C1.64062 20.7646 1.46094 20.7178 1.29688 20.624C1.13281 20.5303 1.00391 20.4014 0.910156 20.2373C0.816406 20.0811 0.769531 19.9014 0.769531 19.6982C0.769531 19.4092 0.871094 19.1553 1.07422 18.9365L9.60547 10.5928L1.07422 2.24902C0.871094 2.03027 0.769531 1.77637 0.769531 1.4873C0.769531 1.28418 0.816406 1.10449 0.910156 0.948242C1.00391 0.78418 1.13281 0.655273 1.29688 0.561523C1.46094 0.467773 1.64062 0.420898 1.83594 0.420898C2.14062 0.420898 2.39844 0.522461 2.60938 0.725586L11.8906 9.81934C12 9.92871 12.082 10.0498 12.1367 10.1826C12.1992 10.3076 12.2305 10.4443 12.2305 10.5928Z"
                          fill="var(--text)"
                        />
                      </svg>
                  </button>
                  <button className="flex-row"
                    id="security"
                    onClick={() => handleAccountSection("security")}
                  >
                    <p>Security & Privacy</p>
                    <svg
                        width="13"
                        height="21"
                        viewBox="0 0 13 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.2305 10.5928C12.2305 10.7412 12.1992 10.8818 12.1367 11.0146C12.082 11.1396 12 11.2568 11.8906 11.3662L2.60938 20.4482C2.39844 20.6592 2.14062 20.7646 1.83594 20.7646C1.64062 20.7646 1.46094 20.7178 1.29688 20.624C1.13281 20.5303 1.00391 20.4014 0.910156 20.2373C0.816406 20.0811 0.769531 19.9014 0.769531 19.6982C0.769531 19.4092 0.871094 19.1553 1.07422 18.9365L9.60547 10.5928L1.07422 2.24902C0.871094 2.03027 0.769531 1.77637 0.769531 1.4873C0.769531 1.28418 0.816406 1.10449 0.910156 0.948242C1.00391 0.78418 1.13281 0.655273 1.29688 0.561523C1.46094 0.467773 1.64062 0.420898 1.83594 0.420898C2.14062 0.420898 2.39844 0.522461 2.60938 0.725586L11.8906 9.81934C12 9.92871 12.082 10.0498 12.1367 10.1826C12.1992 10.3076 12.2305 10.4443 12.2305 10.5928Z"
                          fill="var(--text)"
                        />
                      </svg>
                  </button>
              </div>
            

            <button id="logout" onClick={LogOut}>
              Log Out
            </button>
          </div>
        </div>
        <div
          className="sideAccount"
          style={{
            display: openSide ? "block" : "none",

            transition: "right 0.3s ease-in-out",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export function Settings({ setTheme, setAccColor }) {
  const { user } = UserAuth();
  const userID = user.uid;

  useEffect(() => {
    const themeRef = ref(database, `users/${userID}/theme`);

    onValue(themeRef, (snapshot) => {
      const theme = snapshot.val();
      if (theme) {
        setTheme(theme);
      }
    });
  }, [userID, setTheme]);

  const switchTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    update(ref(database, `users/${userID}`), { theme: selectedTheme }); // Update the theme in the database
  };

  const setLightTheme = () => {
    switchTheme("light");
  };

  const setDarkTheme = () => {
    switchTheme("dark");
  };

  useEffect(() => {
    const accColorRef = ref(database, `users/${userID}/color`);
    onValue(accColorRef, (snapshot) => {
      const color = snapshot.val();
      if (color) {
        setAccColor(color);
      }
    });
  }, [userID, setAccColor]);

  const setAccentColor = (selectedColor) => {
    setAccColor(selectedColor);
    update(ref(database, `users/${userID}`), { color: selectedColor });
  };

  return (
    <>
      <h2>
        Account<span>/Settings</span>
      </h2>
      <h3>Mail Notifications</h3>
      {/* (if notifications == true ? <p>I want to receive mail notifications</p> : <p>I don't want to receive mail notifications</p>) */}
      <p>I don't want to receive mail notifications</p>
      <h3>Customization</h3>
      <p>Themes</p>
      <div className="lightdark">
        <button class="lightcolor" onClick={setLightTheme}>
          <p class="lighttext">Light</p>
        </button>
        <button class="darkcolor" onClick={setDarkTheme}>
          <p class="darktext">Dark</p>
        </button>
      </div>
      <p>Accent Colour</p>
      <div className="colors">
        <button
          id="green"
          onClick={() => {
            setAccentColor("green");
          }}
        ></button>
        <button
          id="red"
          onClick={() => {
            setAccentColor("red");
          }}
        ></button>
        <button
          id="purple"
          onClick={() => {
            setAccentColor("purple");
          }}
        ></button>
        <button
          id="yellow"
          onClick={() => {
            setAccentColor("yellow");
          }}
        ></button>
        <button
          id="orange"
          onClick={() => {
            setAccentColor("orange");
          }}
        ></button>
        <button
          id="blue"
          onClick={() => {
            setAccentColor("blue");
          }}
        ></button>
        <button
          id="pink"
          onClick={() => {
            setAccentColor("pink");
          }}
        ></button>
      </div>
      <p>Custom Toolbar</p>
      <p>Custom Week Display</p>
      <p>Custom Date Format</p>
    </>
  );
}

export function Subscription() {
  const { user } = UserAuth();
  const userName = GetUser(user.uid);
  return (
    <>
      <h2>
        Account<span>/Subscription</span>
      </h2>
      <h3>Current Plans</h3>
      <fieldset>
        <div>
          <input type="radio" id="premium" value="premium" />
          <label>Premium</label>
          <p>Renew The Streak</p>
          <p>Generate New Prompt</p>
          <p>More Creativity Boosters</p>
          <p>SoMe Integration</p>
        </div>
        <div>
          <input type="radio" id="standard" value="standard" />
          <label>Standard</label>
        </div>
      </fieldset>
      <h3>Payment Method</h3>
      <div class="plan">
        <button>Manage Your Plan</button>
        <button>Cancel Your Plan</button>
      </div>
    </>
  );
}

export function SecurityPrivacy() {
  const { user } = UserAuth();
  const userName = GetUser(user.uid);

  console.log(userName);

  return (
    <>
      <h2>
        Account<span>/Security & Privacy</span>
      </h2>

      <h3>General Info</h3>
      <p>name: {userName.username}</p>
      <p>email: {user.email}</p>
      <p>password: ********</p>
      <button>View info</button>
      <button>Edit</button>

      <h3>PIN Code</h3>
      <button>View</button>
      <button>Edit</button>

      <h3>Danger Zone</h3>
      <button>Delete Account</button>
    </>
  );
}
