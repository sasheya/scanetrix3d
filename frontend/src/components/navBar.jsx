import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/navBar.css";

const Navbar = () => {
  return (
    <nav>
      <p>Scanetrix</p>
      <div className="navbar-links">
        <Link className="link-item" to="/">
          Home
        </Link>
        <Link className="link-item" to="/about">
          About
        </Link>
        <Link className="link-item" to="/dashboard">
          Dashboard
        </Link>
      </div>
      <div className="user-auth-links">
        <Link className="link-item" id="login-link" to="/login">
          Login
        </Link>
        <Link className="link-item" id="signup-link" to="/signup">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
