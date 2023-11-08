import { EntryGroup, LastThreeEntries } from "./components/EntryGroup";
import { SideBar } from "./components/SideBar";
import { AddProject, ProjectGroup } from "./components/Projects";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { SearchBar } from "./components/SearchBar";
import '../styles/library.css';

export default function Library(){
    const navigate = useNavigate('');
    const [openModal, setOpenModal] = useState(false);

    function handleClick(inputType){
        navigate(`/group/${inputType}`)
    }

    function handleProjectClick(inputType){
        navigate(`/projects`)
    }

    return(
        <>
        <SideBar/>

            <div className="searchBar">
                <SearchBar/>

            </div>

            <section className="allgroups">
                <div>
                    <h2>Pinned</h2>
                    <div style={{marginTop:'1rem', marginBottom:'4rem'}}><EntryGroup pinned={true}/></div>
                </div>

                <div>
                    <h2>BrainDump</h2>
                    <div style={{ marginBottom:'4rem'}}>
                        <div className='seeAll'><a className="seeAllText" onClick={() => handleClick("BrainDump")}>see all</a></div>
                        <LastThreeEntries inputType={"BrainDump"} />
                    </div>
                    <span className="seeAll">
                        <h2>BrainDump</h2>
                        <a className="seeAllText" onClick={() => handleClick("BrainDump")}>see all</a>
                    </span>
                        <LastThreeEntries inputType={"BrainDump"}/>
                </div>

                <div>
                    <span className="seeAll">
                    <h2>Projects</h2>
                        <a className="seeAllText" onClick={() => handleProjectClick()}>see all</a>
                    </span>
                            <ProjectGroup lastThree/>
                            {/* <button onClick={() => setOpenModal(true)}>+</button> */}
                        {/* <AddProject open={openModal} onClose={() => setOpenModal(false)}/> */}

                </div>
                
                <div>
                    <span className="seeAll">
                    <h2>Daily Challenge</h2>              
                    <a className="seeAllText" onClick={() => handleClick("DailyChallenge")}>see all</a>
                    </span>

                    <LastThreeEntries inputType={"DailyChallenge"}/>
                </div>

                <div>
                    <span className="seeAll">
                        <h2>Creativity Booster</h2>
                    <a className="seeAllText" onClick={() => handleClick("CreativityBooster")}>see all</a>
                    </span>

                    <LastThreeEntries inputType={"CreativityBooster"}/>
                </div>
            </section>
        </>
    )
}