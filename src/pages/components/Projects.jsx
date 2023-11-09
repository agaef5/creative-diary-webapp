import { UserAuth } from "../../authentication/context/AuthContext";
import { database } from "../../../firebase-config";
import { useState, useEffect } from "react";
import { push, ref, set, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom"
import "../../styles/project.css";
import "../../styles/entry.css";


export function GetProjects(userId) {
    const [projects, setProjects] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
      // path to find projects array in RealtimeDatabase
        const projectsRef = ref(database, `projects/${userId}`);
  
        onValue(projectsRef, (snapshot) => {
          const data = snapshot.val();
  
          if (data) {
          // our "data" is mapped into array, which allows us read keys (inputType, timestamp, title), and assigned to them values ("BrainDump", day when entry was created, entry) 
            const projectsArray = Object.entries(data).map(([key, project]) => ({
              id: key,
              name: project.name,
              goal: project.goal,
              timestamp: project.timestamp,
              description: project.description,
            }));
            setProjects(projectsArray);
          }
        });
      };
      fetchData();
    }, [userId]);
    
    return projects;    
  }


  export function SelectProject({ onProjectSelect, selectedProjects }) {
    const { user } = UserAuth();
    const projects = GetProjects(user.uid);

    const [internalSelectedProjects, setInternalSelectedProjects] = useState(selectedProjects || []);

    // It toggles the selection of a project by adding or removing its ID from the selectedProjects array.
    const handleProjectSelect = (projectId) => {
        const updatedSelectedProjects = internalSelectedProjects.includes(projectId)
            ? internalSelectedProjects.filter((id) => id !== projectId)
            : [...internalSelectedProjects, projectId];
    
        setInternalSelectedProjects(updatedSelectedProjects);
        onProjectSelect(updatedSelectedProjects);
    };
    
    return (
        <div className="flex-row">
            <p>Projects:</p>
            <div>
                {projects.map((project) => (
                    <button className="projectButton"
                        key={project.id}
                        onClick={() => handleProjectSelect(project.id)}
                        style={{
                            backgroundColor: internalSelectedProjects.includes(project.id) ? 'var(--background)' : 'var(--textInputLight)',
                            color: internalSelectedProjects.includes(project.id) ? 'var(--accCol)' : 'var(--lightElem)',
                            margin: '0.5rem',
                            padding: '0.5rem 1rem',
                            border: 'none',
                            borderRadius: '0.125rem',
                        }}
                    >
                        {project.name}
                    </button>
                ))}
            </div>
        </div>
    );
    
}


function filterProjects(projects, keywords) {

    if (!keywords) {
      return projects; // Return all projects if no keyword is provided
    }
    const filteredProjects = projects.filter((project) =>
      project.name.toLowerCase().includes(keywords.toLowerCase())
    );
    return filteredProjects;
  }


export function ProjectGroup(props){
    const {keywords, lastThree} = props;
    const { user } = UserAuth();
    const projects = GetProjects(user.uid);
  
    useEffect(()=> {
        let filtered = projects;
        if (keywords && keywords.length > 0){
            filtered = filterProjects(projects, keywords);
        }
        setFilteredProjects(filtered);
    }, [keywords, projects]);


    const [filteredProjects, setFilteredProjects] = useState(projects);
    const renderedProjects = (lastThree===true) ? filteredProjects.slice(-3) : filteredProjects;

    return (
      <div className="projectGroup">
            {renderedProjects.length > 0 ? (
                renderedProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))
            ) : (
                <p>No projects to display</p>
            )}
      </div>
    );
}


export function ProjectCard({project}){
    const navigate = useNavigate();
    function handleProjectClick(project) {
        if (project) {
            navigate(`/projects/${project.name}/${project.id}`);
        }
    }
    return(
        <div key={project.id} className="projectCard" onClick={() => handleProjectClick(project)}>
            <div className="firstCardBg shadow">
                <div className="secondCardBg shadow">
                    <div className="projectCardContent shadow">
                        <p className="projectCardTime">{project.timeperiod}</p>
                        <h2 className="projectCardTitle">{project.name}</h2>
                    </div>
                </div>
            </div>

        </div>

    )
}


export function AddProject({open, onClose}){
    if (!open) return null;
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [description, setDescription] = useState('')

    const {user} = UserAuth();
    const userID = user.uid;
    
    function SaveProject(){
        // getting new key ID for new BrainDump
        const newProject = push(ref(database, 'projects/' + userID));
    
        //uploading BrainDump data to database
        set(newProject, {
            name: name,
            goal: goal,
            description: description
        });
    
        // confirmation
        alert("Project saved!");
        onClose();
    }

    return(
        <> 
        <div className="overlay" onClick={onClose}>
        {/* stopPropagation function prevents affecting onClose function from 'overlay' div to its children div's, so pop-up itself */}
        <div className="moduleContainer flex-col" style={{backgroundColor: 'var(--background)'}} onClick={(e => {e.stopPropagation();})}>
        <div style={{alignItems: 'flex-start', marginBottom: '1rem'}}>
        <button className='closeBtn' style={{width: 'auto', height: ' 2.25rem', backgroundColor: 'var(--background)'}} onClick={onClose}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 25 25"
                        fill="none"
                    >
                    <path
                        d="M1.92308 25.0273L0 23.1043L10.5769 12.5273L0 1.95042L1.92308 0.0273438L12.5 10.6043L23.0769 0.0273438L25 1.95042L14.4231 12.5273L25 23.1043L23.0769 25.0273L12.5 14.4504L1.92308 25.0273Z"
                        fill="var(--text)"
                    />
                    </svg>
                </button>

            <h2>Add a Project</h2>
            <div className="flex-col">
                <label>Project Name<span>*</span></label>
                <input type="text" value={name} className='searchInputSmall' style={{width: '20rem'}} onChange={(e => setName(e.target.value))} placeholder="e.g. Photography Funsies" required/>
                <br></br>
                <label>Project Goal</label>
                <input type="text" value={goal} className='searchInputSmall' onChange={(e => setGoal(e.target.value))} placeholder="e.g. Creating a Portfolio"/>
                <br></br>
                <label>Project Description</label>
                <textarea value={description} className='searchInputSmall textareaSmall' onChange={(e => setDescription(e.target.value))} placeholder="e.g. In this project I would like to.."/>
        </div>
        </div>
        <button className='deleteButton' onClick={SaveProject}>Save</button>
        </div>
        </div>
        </>
    )
}