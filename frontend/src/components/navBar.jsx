import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/navBar.css';

const Navbar = () => {
  return (
    <nav >
      <h1>Scanetrix</h1>
      <div className='navbar-links'>
        <Link className="home-link" to="/">Home</Link>
        <Link className="about-link" to="/about">About</Link>
        <Link className="login-link" to="/login">Login</Link>
        <Link className="signup-link" to="/signup">Sign Up</Link>
        <Link className="dashboard-link" to="/dashboard">Dashboard</Link>
      </div>
    </nav>
  );
};

export default Navbar;
