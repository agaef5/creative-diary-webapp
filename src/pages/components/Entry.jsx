import { Link, useNavigate } from "react-router-dom"
import { useRef, useState, useEffect } from "react";
import { UserAuth } from "../../authentication/context/AuthContext";
import { GetProjects } from "./Projects";
import { GetTags } from "./Tags";
import { database } from "../../../firebase-config";
import { ref, update } from "firebase/database";
import "../../styles/entry.css"


export function EntryCard({entry}){
    const { user } = UserAuth();
    const projects = GetProjects(user.uid);
    const tags = GetTags(user.uid);
    const navigate = useNavigate();
    const [projectNames, setProjectNames] = useState([]);
    const [tagNames, setTagNames] = useState([]);
    const [openMoreOptions, setOpenMoreOptions] = useState(false);
    const [openEntryDisplay, setOpenEntryDisplay] = useState(false);
    const moreContainerRef = useRef(null);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (entry.projects && entry.projects.length > 0) { 
            const mappedProjects = entry.projects.map((projectId) => { 
                const project = projects.find((e) => e.id === projectId); // (e) is a single project, e.id is an ID of this single project
                return project ? { id: projectId, name: project.name } : ""; // returning the name of the project if it exists, otherwise returning an empty string
            });
            setProjectNames(mappedProjects);
        }
    }, [entry.projects, projects]); 
    

    useEffect(() => {
        if (entry.tags && entry.tags.length > 0) {
            const mappedTags = entry.tags.map((tagId) => { 
                const tag = tags.find((a) => a.id === tagId); 
                return tag ? { id: tagId, name: tag.name } : ""; 
            });
            setTagNames(mappedTags);
        }
    }, [entry.tags, tags]);// dependencies array that triggers the effect every time when 'entry.projects' or 'projects' change
    
    const handleClickOutside = (event) => {
        if (moreContainerRef.current && !moreContainerRef.current.contains(event.target)) {
            setOpenMoreOptions(false);
        }
    };
    
    function handleTagClick(tag) {
        if (tag) {
            navigate(`/tags/${tag.id}/${tag.name}`);
        }
    }

    function handleProjectClick(project) {
        if (project) {
            navigate(`/projects/${project.name}/${project.id}`);
        }
    }

    function pinEntry() {
        const entryRef = ref(database, `entries/${user.uid}/${entry.id}`);
      
        if (entry.pinned === true) {
          update(entryRef, {
            pinned: null
          });
          alert("Entry unpinned!");
        } else {
          update(entryRef, {
            pinned: true
          });
          alert("Entry pinned!");
        }
      }
    
    return(
              <div className="entryCard" key={entry.id}  >
                {entry.pinned ? <div className="entryPinned"></div> : <div className="entryUnpinned"></div>}
                <div className="entryCardContent" onClick={() => setOpenEntryDisplay(true)}>
                    
                    <p className="inputType"><span className={`${entry.inputType}Dot`}></span>{entry.inputType}</p>
                    
                    <div className="entryMiddle">
                        <p className="entryDate">{new Date(entry.timestamp).toLocaleDateString('en-GB')}</p>
                        <p className="entryTitle">{entry.title && (entry.title.length > 15 ? `${entry.title.substring(0, 15)}...` : entry.title)}</p>
                        <p className="entryText">{entry.text && (entry.text.length > 30 ? `${entry.text.substring(0, 30)}...` : entry.text)}</p>
                    </div>

                    <div className="buttons-row">
                        <div>
                            {/* Render projects as buttons */}
                            {entry.projects && (
                            <div onClick={(e) => { e.stopPropagation(); }}>
                                {projectNames.slice(0, 2).map((project, index) => (
                                <button className="projectButton" key={index} onClick={() => handleProjectClick(project)}>
                                    {project.name} {/* Render the 'name' property of the project */}
                                </button>
                                ))}
                            </div>
                            )}

                            {/* Render tags as buttons */}
                            {entry.tags && (
                            <div onClick={(e) => { e.stopPropagation(); }}>
                                {tagNames.slice(0, 2).map((tag, index) => (
                                <button className="tagButton" key={index} onClick={() => handleTagClick(tag)}>
                                    #{tag.name}
                                </button>
                                ))}
                            </div>
                            )}
                        </div>
                        

                        
                    </div>
                </div>
                <div className="moreContainer" >
                            <div className="moreButton" onClick={(e) => {e.stopPropagation(), setOpenMoreOptions(prevState => !prevState)}}>
                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <mask id="mask0_174_27716" maskUnits="userSpaceOnUse" x="0" y="0" width="30" height="30">
                                            <rect width="30" height="30" fill="#D9D9D9"/>
                                    </mask>
                                    <g mask="url(#mask0_174_27716)">
                                        <path d="M15 24.0865C14.4844 24.0865 14.043 23.9029 13.6758 23.5358C13.3086 23.1686 13.125 22.7272 13.125 22.2116C13.125 21.696 13.3086 21.2546 13.6758 20.8874C14.043 20.5202 14.4844 20.3366 15 20.3366C15.5156 20.3366 15.957 20.5202 16.3242 20.8874C16.6913 21.2546 16.8749 21.696 16.8749 22.2116C16.8749 22.7272 16.6913 23.1686 16.3242 23.5358C15.957 23.9029 15.5156 24.0865 15 24.0865ZM15 16.875C14.4844 16.875 14.043 16.6914 13.6758 16.3242C13.3086 15.957 13.125 15.5156 13.125 15C13.125 14.4844 13.3086 14.043 13.6758 13.6759C14.043 13.3087 14.4844 13.1251 15 13.1251C15.5156 13.1251 15.957 13.3087 16.3242 13.6759C16.6913 14.043 16.8749 14.4844 16.8749 15C16.8749 15.5156 16.6913 15.957 16.3242 16.3242C15.957 16.6914 15.5156 16.875 15 16.875ZM15 9.66348C14.4844 9.66348 14.043 9.47989 13.6758 9.1127C13.3086 8.74553 13.125 8.30414 13.125 7.78851C13.125 7.27291 13.3086 6.83151 13.6758 6.46432C14.043 6.09716 14.4844 5.91357 15 5.91357C15.5156 5.91357 15.957 6.09716 16.3242 6.46432C16.6913 6.83151 16.8749 7.27291 16.8749 7.78851C16.8749 8.30414 16.6913 8.74553 16.3242 9.1127C15.957 9.47989 15.5156 9.66348 15 9.66348Z" fill="#1C1B1F"/>
                                    </g>
                                </svg>
                            </div>
                                {openMoreOptions === true && (
                                    <div className="moreOptions" ref={moreContainerRef} onClick={(e) => e.stopPropagation()}>
                                            <div onClick={(e) => { e.stopPropagation(); pinEntry(entry, user); }}>
                                            {entry.pinned ? 'Unpin entry' : 'Pin entry'}
                                            </div>
                                            <hr className="horizontal"></hr>
                                            <div><Link to={`/${entry.id}`}>Edit entry</Link></div>
                                            <hr className="horizontal"></hr>
                                            <div>Delete entry</div>
                                    </div>
                                )}
                        </div>
                <EntryDisplay open={openEntryDisplay} onCloseDisplay={() => setOpenEntryDisplay(false)} entry={entry} projectNames={projectNames} tagNames={tagNames} />
              </div>
            );
}


export function EntryDisplay({open, onCloseDisplay, entry, projectNames, tagNames}){
    if (!open) return null;
    const navigate = useNavigate();


    function handleTagClick(tag) {
        if (tag) {
            navigate(`/tags/${tag.id}/${tag.name}`);
        }
    }

    function handleProjectClick(project) {
        if (project) {
            navigate(`/projects/${project.name}/${project.id}`);
        }
    }

    function handleEditClick(){
        navigate(`/${entry.id}`)
    }

    return(
        <div className="overlay" onClick={onCloseDisplay}>
            <div key={entry.id} className="entryDisplay" onClick={(e => {e.stopPropagation();})}>
                <button onClick={onCloseDisplay}>x</button>
                <button onClick={handleEditClick}>Edit</button>

                <h3>{entry.inputType}</h3>
                <p>{entry.title}</p>
                <p>{new Date(entry.timestamp).toLocaleDateString('en-GB')}</p>


                {/* embed for spootify, musze wykombinowac modal do dodawania linkow do piosenek */}
                {/* <iframe
                style={{ borderRadius: "12px", width: "100%", height: "152px"}}
                src="https://open.spotify.com/embed/track/3fpVWegR6YOS1Yk5HSMYIq?utm_source=generator&theme=0"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                ></iframe> */}

                <p>{entry.text}</p>

                {/* Render tags as buttons */}
                {entry.tags && (
                <div>
                    {tagNames.map((tag, index) => (
                    <button key={index} onClick={() => handleTagClick(tag)}>
                        {tag.name}
                    </button>
                    ))}
                </div>
                )}

                {/* Render projects as buttons */}
                {entry.projects &&(
                <div>
                    {projectNames.map((project, index) => (
                    <button key={index} onClick={() => handleProjectClick(project)}>
                        {project.name} {/* Render the 'name' property of the project */}
                    </button>
                    ))}
                </div>
                )}
            </div>
        </div>
    )
}

