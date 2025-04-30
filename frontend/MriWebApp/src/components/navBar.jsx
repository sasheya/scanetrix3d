import {Link} from "react-router-dom"

function NavBar() {
    return (
        <nav className="navbar">
            <div className="navbar-title">MRIWebApp</div>
            <div className="navbar-links">
                <Link to= "/home">Home</Link>
                <Link to= "/login">Login</Link>
                <Link to= "/signUp">Sign Up</Link>
                <Link to= "/viewer">Viewer</Link>
                <Link to= "/about">About</Link> 
            </div>
        </nav>
    )
}

export default NavBar