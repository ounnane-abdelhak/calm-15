import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/images/logos/logo.png";
import "./style.css";

const NavBar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <nav className="navbar" aria-label="Main Navigation">
            <div className="logo-container">
                <a href="/" aria-label="Calm Home">
                    <img src={logo} alt="Calm Logo" className="logo-image" />
                </a>
            </div>
            <button className={`menu-icon${isSidebarOpen ? " open" : ""}`} onClick={toggleSidebar} aria-label="Toggle navigation menu" aria-expanded={isSidebarOpen} aria-controls="navbar-links">
                <span className="menu-icon-bar"></span>
                <span className="menu-icon-bar"></span>
                <span className="menu-icon-bar"></span>
            </button>

            {/* Navigation Links */}
            <div className={`links${isSidebarOpen ? " sidebar-open" : ""}`} id="navbar-links">
                <ul>
                    <li><Link className={location.pathname === "/" ? "nav-link active-link" : "nav-link"} to="/" onClick={closeSidebar}>Home</Link></li>
                    <li><Link className={location.pathname === "/learn" ? "nav-link active-link" : "nav-link"} to="/learn" onClick={closeSidebar}>Learn</Link></li>
                    <li><Link className={location.pathname === "/ide" ? "nav-link active-link" : "nav-link"} to="/ide" onClick={closeSidebar}>Emulate</Link></li>
                    <li><Link className={location.pathname === "/profile" ? "nav-link active-link" : "nav-link"} to="/profile" onClick={closeSidebar}>Profile</Link></li>
                </ul>
                <button className="sidebar-close" onClick={closeSidebar} aria-label="Close navigation menu">&times;</button>
            </div>
        </nav>
    );
}

export default NavBar;
