import { SideBar } from "./components/SideBar";
import { UserAuth } from "../authentication/context/AuthContext";
import { GetUser } from "./components/functions/functions";
import { Outlet, useNavigate } from "react-router-dom";
import { EntryGroup } from "./components/EntryGroup";
import { currentDate } from "./components/EntryTypes";
import { useState, useEffect } from "react";
import "../styles/dropdown.css";
import "../styles/entry.css";
import "../styles/letterToMyself.css";
import { Streak } from "./components/Streak";
import imgLetterbox from "../styles/images/letterbox.png";
import { Link } from "@mui/material";

// coded by Aga



export default function Dashboard() {
  const currentDayAndDate = () => {
    var today = new Date();
    var options = { weekday: "long" };
    var day = String(today.getDate()).padStart(2);
    var month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(today);
    var year = today.getFullYear();
    var formattedDate =
      new Intl.DateTimeFormat("en-GB", options).format(today) +
      ", " +
      day +
      " " +
      month +
      " " +
      year;
    return formattedDate;
  };

  const { user } = UserAuth();
  const userName = GetUser(user.uid);
  const [selectedOption, setSelectedOption] = useState("BrainDump");
  const navigate = useNavigate();

  const changeDisplay = (event) => {
    setSelectedOption(event.target.value);
    navigate("/dashboard/" + event.target.value);
  };

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

  return (
    <>
      <div tabIndex={0} class="hidden-visibility" id="skipLink" onClick={handleSkipLinkClick} onKeyDown={handleSkipLinkKeyDown}>Skip Sidebar</div> 
      <SideBar />
      <div className="flex-col" >
        <div className="date">
          <p className="dashboardDate">{currentDayAndDate()}</p>
        </div>
        <section>
          <select
            id="focusAfterSidebar"
            className="dropdown shadow"
            value={selectedOption}
            onChange={changeDisplay}
          >
            <option value="BrainDump">Brain Dump</option>
            <option value="DailyChallenge">Daily Challenge</option>
            <option value="CreativityBooster">Creativity Booster</option>
          </select>

          <div className="flex-row">
            <Outlet />
            <div>
              <Streak />
              <div className="LetterToMyself shadow">
                {" "}
                <p className="titleLetter">A Letter To Myself</p>
                <img
                  className="letterImg"
                  src={imgLetterbox}
                  alt="A Letter To Myself"
                />
                <p className="subtitleLetter">
                  Start Writing a Letter to Yourself by Clicking This Box{" "}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 style={{marginTop: '2rem'}}>Today's Work:</h2>
          <EntryGroup date={currentDate()} />
        </section>
      </div>
    </>
  );
}
