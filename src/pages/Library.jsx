import { EntryGroup } from "./components/EntryGroup";
import { SideBar } from "./components/SideBar";
import { ProjectGroup } from "./components/Projects";
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { SearchBar } from "./components/SearchBar";
import '../styles/library.css';

// coded by Aga and Zuzanna
export default function Library(){
    const navigate = useNavigate('');
    const [openModal, setOpenModal] = useState(false);

    function handleClick(inputType){
        navigate(`/group/${inputType}`)
    }

    function handleProjectClick(){
        navigate(`/projects`)
    }

    const handleSkipLinkClick = () => {
        // Set focus to the target element after the sidebar
        const focusTarget = document.getElementById("focusAfterSidebar");
        focusTarget && focusTarget.focus();
      };
      
       const handleSkipLinkKeyDown = (event) => {
        // Trigger handleSkipLinkClick when the ENTER key is pressed
        if (event.key === "Enter") {
          handleSkipLinkClick();
        }
      };

    return(
        <>
        <div tabIndex={0} class="hidden-visibility" id="skipLink" onClick={handleSkipLinkClick} onKeyDown={handleSkipLinkKeyDown}>Skip Sidebar</div> 

        <SideBar/>

            <div className="searchBar" >
                <SearchBar tabIndex={0} id="focusAfterSidebar"/>
            </div>              

            <section className="allgroups">
                <div className="groupContainer">
                    <h2 tabIndex={0}>Pinned</h2>
                    <div style={{marginTop:'1rem', marginBottom:'4rem'}}><EntryGroup pinned={true}/></div>
                </div>

                <div className="groupContainer">
                    <span className="seeAll">
                        <h2 tabIndex={0} onClick={() => handleClick("BrainDump")}>BrainDump</h2>
                        <a  tabIndex={0} aria-label="see all Brain Dump entries" 
                            className="seeAllText" onClick={() => handleClick("BrainDump")}>see all</a>
                    </span>
                        <EntryGroup inputType={"BrainDump"} lastThree/>
                </div>

                <div className="groupContainer">
                    <span className="seeAll">
                    <h2 tabIndex={0} onClick={() => handleProjectClick()}>Projects</h2>
                        <a tabIndex={0} aria-label="see all Projects"
                            className="seeAllText" onClick={() => handleProjectClick()}>see all</a>
                    </span>
                            <ProjectGroup lastThree/>


                </div>
                
                <div className="groupContainer">
                    <span className="seeAll">
                        <h2 tabIndex={0} onClick={() => handleClick("DailyChallenge")}>Daily Challenge</h2>              
                    <a tabIndex={0} aria-label="see all Daily Challenge entires"
                        className="seeAllText" onClick={() => handleClick("DailyChallenge")}>see all</a>
                    </span>

                    <EntryGroup inputType={"DailyChallenge"} lastThree/>

                </div>

                <div className="groupContainer">
                    <span className="seeAll">
                        <h2 tabIndex={0} onClick={() => handleClick("CreativityBooster")}>Creativity Booster</h2>
                    <a tabIndex={0} aria-label="see all Creativity Booster entries" 
                    className="seeAllText" onClick={() => handleClick("CreativityBooster")}>see all</a>
                    </span>

                    <EntryGroup inputType={"CreativityBooster"} lastThree/>

                </div>
            </section>
        </>
    )
}