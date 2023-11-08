import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../styles/sidebar.css";
import { UserAuth } from "../../authentication/context/AuthContext";
import { GetUser } from "./functions/functions";

export function SideBar() {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const { user } = UserAuth();
  const userName = GetUser(user.uid);

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
            width="25"
            height="26"
            viewBox="0 0 25 26"
            fill="none"
          >
            <path
              d="M1.92308 25.0273L0 23.1043L10.5769 12.5273L0 1.95042L1.92308 0.0273438L12.5 10.6043L23.0769 0.0273438L25 1.95042L14.4231 12.5273L25 23.1043L23.0769 25.0273L12.5 14.4504L1.92308 25.0273Z"
              fill="#1B1C25"
            />
          </svg>
        </button>
        <div className="sideBarLinks">
          <nav className="navContainer">
            <NavLink to="/dashboard/BrainDump">
              <div className="pageClick">
                <button className="houseIcon">
                  <svg
                    id="Warstwa_1"
                    data-name="Warstwa 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 27.97 24.61"
                  >
                    <defs></defs>
                    <path
                      class="cls-1"
                      d="m10.61,23.4v-8.53c0-.27.08-.48.25-.64s.38-.25.66-.25h4.97c.27,0,.48.08.64.25.16.16.25.38.25.64v8.53h-6.76Zm-4.58,1.21c-.84,0-1.49-.23-1.96-.68-.46-.45-.69-1.09-.69-1.91v-12.95l1.89-1.28v13.75c0,.38.1.68.29.88.2.2.49.3.87.3h15.06c.38,0,.66-.1.86-.3.2-.2.29-.5.29-.88V7.78l1.89,1.29v12.95c0,.82-.23,1.46-.69,1.91-.46.45-1.11.68-1.95.68H6.02ZM0,11.57c0-.3.12-.56.37-.76L12.59.55c.44-.37.91-.55,1.41-.55s.98.18,1.42.55l12.2,10.25c.24.2.36.47.36.8,0,.28-.1.5-.29.67-.2.16-.43.23-.7.23-.16,0-.32-.04-.46-.12-.13-.08-.26-.16-.38-.26L14.41,2.29c-.13-.12-.27-.18-.42-.18-.14,0-.28.06-.41.18L1.85,12.13c-.12.09-.26.18-.4.26-.13.08-.28.12-.45.12-.31,0-.56-.09-.74-.28-.18-.2-.27-.41-.27-.66Zm21.57-5.29v-2.93c0-.26.08-.46.23-.61.16-.16.36-.23.61-.23h1.25c.26,0,.46.08.61.23.16.15.23.35.23.61v5.41l-2.94-2.48Z"
                    />
                  </svg>
                </button>
                <p>Workspace</p>
              </div>
            </NavLink>
            <NavLink to="/library">
              <div className="pageClick">
                <button className="houseIcon">
                  <svg
                    id="Warstwa_1"
                    data-name="Warstwa 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 28.95 25.98"
                  >
                    <defs></defs>
                    <path
                      class="cls-1"
                      d="m0,23.24V5.95c0-.9.22-1.57.66-2.03.45-.45,1.12-.68,2.02-.68h1.48c.9,0,1.57.23,2,.68.44.45.66,1.13.66,2.03v1.41c.29-.07.59-.11.9-.11h5.11c.31,0,.61.04.89.11V2.71c0-.9.22-1.57.66-2.03.45-.45,1.12-.68,2.02-.68h2.3c.9,0,1.57.23,2,.68.45.45.67,1.13.67,2.03v20.53c0,.9-.22,1.57-.67,2.02-.44.45-1.11.68-2,.68H2.67c-.9,0-1.57-.23-2.02-.68-.44-.45-.66-1.12-.66-2.02Zm1.77-.14c0,.35.09.62.27.8.18.18.45.27.82.27h2.18V6.08c0-.34-.09-.61-.27-.79-.17-.19-.44-.28-.81-.28h-1.1c-.37,0-.64.09-.82.28-.18.18-.27.44-.27.79v17.02Zm5.04,1.07h6.9v-14.07c0-.34-.09-.61-.27-.79-.17-.19-.44-.28-.81-.28h-4.73c-.36,0-.63.09-.82.28-.18.18-.27.44-.27.79v14.07Zm8.67,0h3.01c.37,0,.64-.09.82-.27s.27-.45.27-.8V2.84c0-.34-.09-.61-.27-.79-.18-.19-.45-.28-.82-.28h-1.92c-.36,0-.63.09-.82.28-.18.18-.27.44-.27.79v21.33Zm-7.61-12.87c0-.2.07-.37.2-.5.14-.14.32-.21.54-.21h3.33c.21,0,.38.07.52.21.14.13.21.3.21.5s-.07.38-.21.52c-.13.14-.3.21-.52.21h-3.33c-.22,0-.4-.07-.54-.21-.13-.14-.2-.31-.2-.52Zm0,10.59c0-.2.07-.37.2-.5.14-.14.32-.21.54-.21h3.33c.21,0,.38.07.52.21.14.13.21.3.21.5s-.07.38-.21.52c-.13.14-.3.21-.52.21h-3.33c-.22,0-.4-.07-.54-.21-.13-.14-.2-.31-.2-.52Zm14.53,1.68l-2.03-17.52c-.11-.89.03-1.58.41-2.06.38-.48,1.03-.79,1.93-.91l1.22-.16c.9-.13,1.59,0,2.07.42.49.41.79,1.05.89,1.95l2.02,17.52c.1.89-.04,1.58-.42,2.06-.38.48-1.01.79-1.91.91l-1.22.16c-.9.12-1.59-.02-2.07-.42-.48-.41-.78-1.05-.89-1.95Zm1.73-.35c.04.35.16.61.35.77.2.16.48.22.84.16l.87-.12c.36-.05.62-.17.77-.36.16-.2.21-.47.18-.82l-1.98-17.24c-.04-.34-.16-.59-.36-.75-.2-.17-.48-.23-.84-.18l-.84.11c-.37.05-.63.18-.79.38-.16.2-.21.46-.18.81l1.98,17.24Z"
                    />
                  </svg>
                </button>
                <p>Library</p>
              </div>
            </NavLink>
            <NavLink to="/calendar">
              <div className="pageClick">
                <button className="houseIcon">
                  <svg
                    width="24"
                    height="22"
                    viewBox="0 0 24 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.99609 21.5977C2.76953 21.5977 1.84766 21.293 1.23047 20.6836C0.621094 20.082 0.316406 19.1758 0.316406 17.9648V3.65625C0.316406 2.44531 0.621094 1.53906 1.23047 0.9375C1.84766 0.328125 2.76953 0.0234375 3.99609 0.0234375H20.0039C21.2305 0.0234375 22.1484 0.328125 22.7578 0.9375C23.3672 1.53906 23.6719 2.44531 23.6719 3.65625V17.9648C23.6719 19.1758 23.3672 20.082 22.7578 20.6836C22.1484 21.293 21.2305 21.5977 20.0039 21.5977H3.99609ZM3.82031 19.7109H20.1562C20.6797 19.7109 21.082 19.5703 21.3633 19.2891C21.6445 19.0156 21.7852 18.6094 21.7852 18.0703V7.01953C21.7852 6.48047 21.6445 6.07422 21.3633 5.80078C21.082 5.51953 20.6797 5.37891 20.1562 5.37891H3.82031C3.30469 5.37891 2.90625 5.51953 2.625 5.80078C2.34375 6.07422 2.20312 6.48047 2.20312 7.01953V18.0703C2.20312 18.6094 2.34375 19.0156 2.625 19.2891C2.90625 19.5703 3.30469 19.7109 3.82031 19.7109ZM9.71484 9.59766C9.51172 9.59766 9.36719 9.55859 9.28125 9.48047C9.20312 9.40234 9.16406 9.26172 9.16406 9.05859V8.36719C9.16406 8.16406 9.20312 8.02734 9.28125 7.95703C9.36719 7.87891 9.51172 7.83984 9.71484 7.83984H10.4062C10.6094 7.83984 10.75 7.87891 10.8281 7.95703C10.9141 8.02734 10.957 8.16406 10.957 8.36719V9.05859C10.957 9.26172 10.9141 9.40234 10.8281 9.48047C10.75 9.55859 10.6094 9.59766 10.4062 9.59766H9.71484ZM13.6055 9.59766C13.4023 9.59766 13.2617 9.55859 13.1836 9.48047C13.1055 9.40234 13.0664 9.26172 13.0664 9.05859V8.36719C13.0664 8.16406 13.1055 8.02734 13.1836 7.95703C13.2617 7.87891 13.4023 7.83984 13.6055 7.83984H14.2969C14.5078 7.83984 14.6523 7.87891 14.7305 7.95703C14.8086 8.02734 14.8477 8.16406 14.8477 8.36719V9.05859C14.8477 9.26172 14.8086 9.40234 14.7305 9.48047C14.6523 9.55859 14.5078 9.59766 14.2969 9.59766H13.6055ZM17.5078 9.59766C17.2969 9.59766 17.1523 9.55859 17.0742 9.48047C16.9961 9.40234 16.957 9.26172 16.957 9.05859V8.36719C16.957 8.16406 16.9961 8.02734 17.0742 7.95703C17.1523 7.87891 17.2969 7.83984 17.5078 7.83984H18.1875C18.3984 7.83984 18.543 7.87891 18.6211 7.95703C18.6992 8.02734 18.7383 8.16406 18.7383 8.36719V9.05859C18.7383 9.26172 18.6992 9.40234 18.6211 9.48047C18.543 9.55859 18.3984 9.59766 18.1875 9.59766H17.5078ZM5.82422 13.4297C5.61328 13.4297 5.46875 13.3906 5.39062 13.3125C5.3125 13.2344 5.27344 13.0938 5.27344 12.8906V12.2109C5.27344 12 5.3125 11.8594 5.39062 11.7891C5.46875 11.7109 5.61328 11.6719 5.82422 11.6719H6.51562C6.71875 11.6719 6.85938 11.7109 6.9375 11.7891C7.01562 11.8594 7.05469 12 7.05469 12.2109V12.8906C7.05469 13.0938 7.01562 13.2344 6.9375 13.3125C6.85938 13.3906 6.71875 13.4297 6.51562 13.4297H5.82422ZM9.71484 13.4297C9.51172 13.4297 9.36719 13.3906 9.28125 13.3125C9.20312 13.2344 9.16406 13.0938 9.16406 12.8906V12.2109C9.16406 12 9.20312 11.8594 9.28125 11.7891C9.36719 11.7109 9.51172 11.6719 9.71484 11.6719H10.4062C10.6094 11.6719 10.75 11.7109 10.8281 11.7891C10.9141 11.8594 10.957 12 10.957 12.2109V12.8906C10.957 13.0938 10.9141 13.2344 10.8281 13.3125C10.75 13.3906 10.6094 13.4297 10.4062 13.4297H9.71484ZM13.6055 13.4297C13.4023 13.4297 13.2617 13.3906 13.1836 13.3125C13.1055 13.2344 13.0664 13.0938 13.0664 12.8906V12.2109C13.0664 12 13.1055 11.8594 13.1836 11.7891C13.2617 11.7109 13.4023 11.6719 13.6055 11.6719H14.2969C14.5078 11.6719 14.6523 11.7109 14.7305 11.7891C14.8086 11.8594 14.8477 12 14.8477 12.2109V12.8906C14.8477 13.0938 14.8086 13.2344 14.7305 13.3125C14.6523 13.3906 14.5078 13.4297 14.2969 13.4297H13.6055ZM17.5078 13.4297C17.2969 13.4297 17.1523 13.3906 17.0742 13.3125C16.9961 13.2344 16.957 13.0938 16.957 12.8906V12.2109C16.957 12 16.9961 11.8594 17.0742 11.7891C17.1523 11.7109 17.2969 11.6719 17.5078 11.6719H18.1875C18.3984 11.6719 18.543 11.7109 18.6211 11.7891C18.6992 11.8594 18.7383 12 18.7383 12.2109V12.8906C18.7383 13.0938 18.6992 13.2344 18.6211 13.3125C18.543 13.3906 18.3984 13.4297 18.1875 13.4297H17.5078ZM5.82422 17.2617C5.61328 17.2617 5.46875 17.2266 5.39062 17.1562C5.3125 17.0781 5.27344 16.9336 5.27344 16.7227V16.043C5.27344 15.832 5.3125 15.6914 5.39062 15.6211C5.46875 15.543 5.61328 15.5039 5.82422 15.5039H6.51562C6.71875 15.5039 6.85938 15.543 6.9375 15.6211C7.01562 15.6914 7.05469 15.832 7.05469 16.043V16.7227C7.05469 16.9336 7.01562 17.0781 6.9375 17.1562C6.85938 17.2266 6.71875 17.2617 6.51562 17.2617H5.82422ZM9.71484 17.2617C9.51172 17.2617 9.36719 17.2266 9.28125 17.1562C9.20312 17.0781 9.16406 16.9336 9.16406 16.7227V16.043C9.16406 15.832 9.20312 15.6914 9.28125 15.6211C9.36719 15.543 9.51172 15.5039 9.71484 15.5039H10.4062C10.6094 15.5039 10.75 15.543 10.8281 15.6211C10.9141 15.6914 10.957 15.832 10.957 16.043V16.7227C10.957 16.9336 10.9141 17.0781 10.8281 17.1562C10.75 17.2266 10.6094 17.2617 10.4062 17.2617H9.71484ZM13.6055 17.2617C13.4023 17.2617 13.2617 17.2266 13.1836 17.1562C13.1055 17.0781 13.0664 16.9336 13.0664 16.7227V16.043C13.0664 15.832 13.1055 15.6914 13.1836 15.6211C13.2617 15.543 13.4023 15.5039 13.6055 15.5039H14.2969C14.5078 15.5039 14.6523 15.543 14.7305 15.6211C14.8086 15.6914 14.8477 15.832 14.8477 16.043V16.7227C14.8477 16.9336 14.8086 17.0781 14.7305 17.1562C14.6523 17.2266 14.5078 17.2617 14.2969 17.2617H13.6055Z"
                      fill="#1B1C25"
                    />
                  </svg>
                </button>
                <p>Calendar</p>
              </div>
            </NavLink>
            <div></div>
          </nav>
          <div className="accountDown" style={{marginBottom: '-32px'}}>
            <NavLink to="/account">
              <div className="pageClick">
                <button className="houseIcon">
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.5 24.4922C10.8672 24.4922 9.32812 24.1797 7.88281 23.5547C6.44531 22.9297 5.17578 22.0664 4.07422 20.9648C2.97266 19.8633 2.10938 18.5938 1.48438 17.1562C0.859375 15.7109 0.546875 14.1719 0.546875 12.5391C0.546875 10.9062 0.859375 9.37109 1.48438 7.93359C2.10938 6.48828 2.96875 5.21484 4.0625 4.11328C5.16406 3.01172 6.43359 2.14844 7.87109 1.52344C9.31641 0.898438 10.8555 0.585938 12.4883 0.585938C14.1211 0.585938 15.6602 0.898438 17.1055 1.52344C18.5508 2.14844 19.8242 3.01172 20.9258 4.11328C22.0273 5.21484 22.8906 6.48828 23.5156 7.93359C24.1406 9.37109 24.4531 10.9062 24.4531 12.5391C24.4531 14.1719 24.1406 15.7109 23.5156 17.1562C22.8906 18.5938 22.0273 19.8633 20.9258 20.9648C19.8242 22.0664 18.5508 22.9297 17.1055 23.5547C15.668 24.1797 14.1328 24.4922 12.5 24.4922ZM12.5 22.5C13.8828 22.5 15.1758 22.2422 16.3789 21.7266C17.582 21.2109 18.6406 20.5 19.5547 19.5938C20.4688 18.6797 21.1797 17.6211 21.6875 16.418C22.2031 15.2148 22.4609 13.9219 22.4609 12.5391C22.4609 11.1562 22.2031 9.86328 21.6875 8.66016C21.1719 7.45703 20.457 6.39844 19.543 5.48438C18.6367 4.57031 17.5781 3.85937 16.3672 3.35156C15.1641 2.83594 13.8711 2.57812 12.4883 2.57812C11.1055 2.57812 9.8125 2.83594 8.60938 3.35156C7.40625 3.85937 6.35156 4.57031 5.44531 5.48438C4.53906 6.39844 3.82812 7.45703 3.3125 8.66016C2.80469 9.86328 2.55078 11.1562 2.55078 12.5391C2.55078 13.9219 2.80469 15.2148 3.3125 16.418C3.82812 17.6211 4.53906 18.6797 5.44531 19.5938C6.35938 20.5 7.41797 21.2109 8.62109 21.7266C9.82422 22.2422 11.1172 22.5 12.5 22.5ZM7.13281 18.4688C6.89844 18.4688 6.72266 18.4023 6.60547 18.2695C6.49609 18.1289 6.44141 17.9492 6.44141 17.7305C6.44141 17.4102 6.5625 16.9961 6.80469 16.4883C7.05469 15.9727 7.42578 15.4609 7.91797 14.9531C8.41797 14.4375 9.04688 14.0039 9.80469 13.6523C10.5625 13.3008 11.457 13.125 12.4883 13.125C13.5195 13.125 14.4141 13.3008 15.1719 13.6523C15.9297 14.0039 16.5547 14.4375 17.0469 14.9531C17.5469 15.4609 17.918 15.9727 18.1602 16.4883C18.4102 16.9961 18.5352 17.4102 18.5352 17.7305C18.5352 17.9492 18.4766 18.1289 18.3594 18.2695C18.25 18.4023 18.0781 18.4688 17.8438 18.4688H7.13281ZM12.4883 12.1641C11.9336 12.1641 11.4258 12.0195 10.9648 11.7305C10.5117 11.4414 10.1484 11.0508 9.875 10.5586C9.60938 10.0664 9.47656 9.50781 9.47656 8.88281C9.47656 8.29688 9.60938 7.76172 9.875 7.27734C10.1484 6.78516 10.5117 6.39453 10.9648 6.10547C11.4258 5.80859 11.9336 5.66016 12.4883 5.66016C13.043 5.66016 13.5469 5.80859 14 6.10547C14.4609 6.39453 14.8242 6.78516 15.0898 7.27734C15.3633 7.76172 15.5 8.29688 15.5 8.88281C15.5 9.50781 15.3633 10.0703 15.0898 10.5703C14.8242 11.0625 14.4609 11.4531 14 11.7422C13.5469 12.0312 13.043 12.1719 12.4883 12.1641Z"
                      fill="black"
                    />
                  </svg>
                </button>
                <p>{userName.username.length >0 ? userName.username : "Account" }</p>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
