import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  //By default, the Home page will now be the active page.
  const [activeTab, setActiveTab] = useState("Home");

  /* If a user manually navigates to a page, the selected tab on the 
  header panel should be highlighted hence the use of useEffect. */
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Home");
    } else if (location.pathname === "/add") {
      setActiveTab("AddUser");
    } else if (location.pathname === "/about") {
      setActiveTab("About");
    }
  }, [location]);

  return (
    <div className="header">
      <p className="logo">Web Projects</p>
      <div className="header-right">
        <Link to="/">
          <p
            className={`${activeTab === "Home" ? "active" : ""}`}
            onClick={() => setActiveTab("Home")}
          >
            Home
          </p>
        </Link>
        <Link to="/add">
          <p
            className={`${activeTab === "AddUser" ? "active" : ""}`}
            onClick={() => setActiveTab("AddUser")}
          >
            Add Web Project
          </p>
        </Link>
        <Link to="/about">
          <p
            className={`${activeTab === "About" ? "active" : ""}`}
            onClick={() => setActiveTab("About")}
          >
            About
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
