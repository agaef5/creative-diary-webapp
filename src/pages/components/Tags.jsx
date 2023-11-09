import { useState, useEffect } from "react";
import { UserAuth } from "../../authentication/context/AuthContext";
import { database } from "../../../firebase-config";
import { push, ref, set, onValue } from "firebase/database";

export function GetTags(userId){
    const [tags, setTags] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
      // path to find projects array in RealtimeDatabase
        const tagsRef = ref(database, `tags/${userId}`);
         
        onValue(tagsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
          // our "data" is mapped into array, which allows us read keys (inputType, timestamp, title), and assigned to them values ("BrainDump", day when entry was created, entry) 
            const tagsArray = Object.entries(data).map(([key, tag]) => ({
              id: key,
              name: tag.name,
            }));
            setTags(tagsArray);
          }
        });
      };
      fetchData();
    }, [userId]);
  
    return tags;
}

export function SelectTag({ onTagSelect, selectedTags }) {
    const { user } = UserAuth();
    const tags = GetTags(user.uid);
    const [internalSelectedTags, setInternalSelectedTags] = useState(selectedTags || []);

    // It toggles the selection of a tag by adding or removing its ID from the selectedTags array.
    const handleTagSelect = (tagId) => {
        const updatedSelectedTags = internalSelectedTags.includes(tagId)
            ? internalSelectedTags.filter((id) => id !== tagId)
            : [...internalSelectedTags, tagId];

        setInternalSelectedTags(updatedSelectedTags);
        onTagSelect(updatedSelectedTags);
    };

    return (
        <div className="flex-row">
            <p>Tags:</p>
            <div>
                {tags.map((tag) => (
                    <button className="selectTags"
                        key={tag.id}
                        onClick={() => handleTagSelect(tag.id)}
                        style={{
                            backgroundColor: internalSelectedTags.includes(tag.id) ? 'var(--accCol)'  : 'var(--textInputLight)',
                            margin: '0.5rem',
                            padding: '0.5rem 1rem',
                            border: 'none',
                            borderRadius: '0.125rem',
                        }}
                    >
                        #{tag.name}
                    </button>
                ))}
            </div> 
        </div>
    );
}


export function AddTag(){
    const [name, setName] = useState('');
    const {user} = UserAuth();
    const userID = user.uid;

    function handleSaveTag() {
        const newTag = push(ref(database, 'tags/' + userID));

    //uploading BrainDump data to database
    set(newTag, {
        name: name,
    });

    // confirmation
    alert("Tag saved!");
    };

    return(
        <> 
        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row', marginLeft: '2.75rem'}}>
            <input className='searchInputSmall' type="text" value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Add a tag..."/>

            <button className='plusButton' onClick={handleSaveTag}>+</button>
                
        </div>
        </>
    )
}

