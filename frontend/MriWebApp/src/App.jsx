import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navBar';
import Home from './pages/home';
import About from './pages/about';
import Login from './pages/login';
import SignUp from './pages/signUp';
import Viewer from './pages/viewer';
import Dashboard from './components/dashboard';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/viewer" element={<Viewer />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
