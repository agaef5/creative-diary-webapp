import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../styles/sidebar.css";

export function SideBar() {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const toggleSideMenu = () => {
    setOpenSideMenu(!openSideMenu);
  };

  return (
    <>
      <button className="burgerMenuIcon" onClick={toggleSideMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="29"
          height="19"
          viewBox="0 0 29 19"
          fill="none"
        >
          <path
            d="M0 19V15.8333H28.5V19H0ZM0 11.0833V7.91667H28.5V11.0833H0ZM0 3.16667V0H28.5V3.16667H0Z"
            fill="#1B1C25"
          />
        </svg>
      </button>

      <div className={`sidebar ${openSideMenu ? "open" : ""}`}>
        <button className="closeBtn" onClick={toggleSideMenu}></button>
        <nav>
          <NavLink to="/dashboard/BrainDump">Dashboard</NavLink>
          <NavLink to="/library">Library</NavLink>
          <NavLink to="/calendar">Calendar</NavLink>
          <NavLink to="/account">Account</NavLink>
        </nav>
      </div>
    </>
  );
}
