import React, { useState } from "react";
import "../stylesheets/sidebar.css";
import { sideBarData } from "./sideBarData.jsx";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="top-side">
        <div className="sidebar-logo">Scanetrix</div>
        <div
          className="sidebar-icon"
          onClick={() => setCollapsed((curr) => !curr)}
        >
          <MenuOpenIcon />
        </div>
      </div>
      <ul className="sidebar-list">
        {sideBarData.map((val, key) => {
          return (
            <li
              key={key}
              className="sidebar-item"
              id={window.location.pathname === val.link ? "active" : ""}
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              <div id="item-icon"> {val.icon} </div>
              <div id="item-title"> {val.title} </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBar;
