import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ref, update, onValue } from "firebase/database";
import { database } from "../../firebase-config";
import { UserAuth } from "../authentication/context/AuthContext";
import { SelectProject } from "./components/Projects";
import { SelectTag } from "./components/Tags";


export function GetOneEntry(userID, entryID) {
    const [entry, setEntry] = useState(null);
  
    useEffect(() => {
      const entryRef = ref(database, `entries/${userID}/${entryID}`);

      console.log(entryRef);
  
      onValue(entryRef, (snapshot) => {
        const data = snapshot.val();
  
        if (data) {
          setEntry({
            ...data,
          });
        }
      });
    }, [userID, entryID]);
  
    return entry;
  }


export function EntryEdit() {
  const { entryID } = useParams();
  const { user } = UserAuth();
  const userID = user.uid;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const entry = GetOneEntry(userID, entryID);

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    if (entry) {
      setDate(entry.timestamp);
      setTitle(entry.title);
      setText(entry.text);
      setSelectedProjects(entry.projects || []);
      setSelectedTags(entry.tags || []);
      setLoading(false); // Set loading to false once data has been fetched
    }
  }, [entry]);

  const handleEntryUpdate = () => {
    const entryRef = ref(database, `entries/${userID}/${entryID}`);
    update(entryRef, {
      title: title,
      text: text,
      projects: selectedProjects,
      tags: selectedTags,
    });
    alert("Entry updated!");
    navigate("/dashboard/BrainDump"); // Adjust the route as needed
  };

  return (
    <div className="entryEdit entryDisplay">
      <div className="titleButtonRow">
        <div className="titleAndDate">
            <input autoFocus
            className="editTitle" 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <p className="dateStleBD">{new Date(date).toLocaleDateString('en-GB')}</p>
        </div>
      
      <button className="updateButton" onClick={handleEntryUpdate}>Update</button>
      </div>
      <div className="nondashedLine"/>
      
    {!loading && (
            <div>
            <SelectTag
                onTagSelect={setSelectedTags}
                selectedTags={selectedTags}
            />

            <SelectProject
                onProjectSelect={setSelectedProjects}
                selectedProjects={selectedProjects}
            />
            </div>
        )}

<div id="dashedLine"/>

      <textarea className="editContent"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here"
      />


    </div>
  );
}