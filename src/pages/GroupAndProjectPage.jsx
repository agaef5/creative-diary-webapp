import { UserAuth } from "../authentication/context/AuthContext";
import { EntryGroup } from "./components/EntryGroup";
import { GetProjects, ProjectGroup } from "./components/Projects";
import { SearchBar } from "./components/SearchBar";
import { SideBar } from "./components/SideBar";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export function GroupPage() {
    const {inputType} = useParams();
    return (
        <>
        <SideBar/>
        
        <SearchBar inputType={inputType}/>
        <div className="projectInfo">
            <h2>
            <Link to='/library'>
                <span className="grey">Library/</span>
            </Link>{inputType}
            </h2>
        </div>
        <EntryGroup inputType={inputType}/>
        </>
    )
}

export function ProjectsGroupPage(){
    return (
        <>
        <SideBar/>
        
        <SearchBar/> 
        <div className="projectInfo">
            <h2>
            <Link to='/library'>
                <span className="grey">Library/</span>
            </Link>Projects
            </h2>
        </div>
        <ProjectGroup/>
        </>
    )
}


export function ProjectPage(){
    const {user} = UserAuth();
    const projects = GetProjects(user.uid);
    const {projectName, projectID} = useParams(); 

    const project = projects.find((p) => p.id === projectID);

    if (!project) {
        return <div>Loading...</div>; // Add a loading indicator if the project is not found cuz it takes some time to load everything
      }


    return(
        <>
            <SideBar/>
            <SearchBar project={projectID}/>
            {/* <SearchBar project={projectID}/> */}
            <div className="projectInfo">
            <h2>
                <Link to='/projects'>
                    <span className="grey">Library/Projects/</span>
                </Link>{projectName}
            </h2>
            {project.goal && (<p id='goal'>{project.goal}</p>)}
            {project.description && (<p>{project.description}</p>)}
            </div>

            <EntryGroup projects={projectID}/>
        </>
    )
}


export function TagsPage() {
    const {tagID, tagName} = useParams();
    console.log(tagName,tagID);
    return (
        <>
        <SideBar/>

        <SearchBar tag={tagID}/>
        <div className="projectInfo">
            <h2>
                <Link to='/library'>
                    <span className="grey">Library/Tags/</span>
                </Link>{tagName}
            </h2>
        </div>
        <EntryGroup tags={tagID}/>
        </>
    )
}