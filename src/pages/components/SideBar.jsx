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
        <button className="closeBtn" onClick={toggleSideMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="84"
            height="85"
            viewBox="0 0 84 85"
            fill="none"
          >
            <g filter="url(#filter0_dd_763_7117)">
              <mask
                id="mask0_763_7117"
                style="mask-type:alpha"
                maskUnits="userSpaceOnUse"
                x="22"
                y="22"
                width="40"
                height="41"
              >
                <rect
                  x="22"
                  y="22.0273"
                  width="40"
                  height="40.045"
                  fill="#D9D9D9"
                />
              </mask>
              <g mask="url(#mask0_763_7117)">
                <rect
                  x="22"
                  y="22.0273"
                  width="40"
                  height="40.045"
                  rx="2"
                  fill="#FDFDFD"
                />
                <rect
                  x="22.5"
                  y="22.5273"
                  width="39"
                  height="39.045"
                  rx="1.5"
                  stroke="white"
                  stroke-opacity="0.2"
                />
                <path
                  d="M30.9231 55.0273L29 53.1043L39.5769 42.5273L29 31.9504L30.9231 30.0273L41.5 40.6043L52.0769 30.0273L54 31.9504L43.4231 42.5273L54 53.1043L52.0769 55.0273L41.5 44.4504L30.9231 55.0273Z"
                  fill="#1B1C25"
                />
              </g>
            </g>
            <defs>
              <filter
                id="filter0_dd_763_7117"
                x="0"
                y="0.0273438"
                width="84"
                height="84.0469"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="6" dy="6" />
                <feGaussianBlur stdDeviation="8" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.819608 0 0 0 0 0.803922 0 0 0 0 0.780392 0 0 0 0.5 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_763_7117"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="-6" dy="-6" />
                <feGaussianBlur stdDeviation="8" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
                />
                <feBlend
                  mode="normal"
                  in2="effect1_dropShadow_763_7117"
                  result="effect2_dropShadow_763_7117"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect2_dropShadow_763_7117"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </button>
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
