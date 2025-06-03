import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './stylesheets/App.css';
import Navbar from './components/navBar';
import Home from './pages/home';
import About from './pages/about';
import Login from './pages/login';
import SignUp from './pages/signUp';
import Viewer from './pages/viewer';
import Dashboard from './components/dashboard';

function App() {
  return (
    
    <div className='main-container'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/viewer" element={<Viewer />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
export default App;
