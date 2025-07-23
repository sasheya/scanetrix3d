import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./stylesheets/App.css";
// import Navbar from "./components/navBar";
import SideBar from "./components/sidebar";
import Landing from "./pages/landing";
import SignUp from "./pages/signUp"; 
import Login from "./pages/login";
import Home from "./pages/home";
import UploadScan from "./pages/uploadScan";
import About from "./pages/about";
import Viewer from "./pages/viewer";
import Reports from "./pages/reports";
import NotFound from "./pages/notFound";


function App() {
  const location = useLocation();
  // const hideNavbar =
  //   location.pathname === "/login" ||
  //   location.pathname === "/signup";

  return (
    <div className="main-container">
      {/* {!hideNavbar && <Navbar />} */}
      <SideBar />
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/uploadScan" element={<UploadScan />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/viewer" element={<Viewer />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
