import { Link } from "react-router-dom";
import { useState } from "react"; // Import useState
import logo from "../../assets/images/logos/logo.png";
import "./style.css"; // Assuming style_updated_v2.css will be renamed to style.css or imported directly

const NavBar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <nav className="navbar">
            <a href="/">
                <img src={logo} alt="Calm Logo" style={{
                    width: "4rem" // Consider moving this to CSS
                }} />
            </a>

            {/* Hamburger Menu Icon - visible only on small screens via CSS */}
            <button className="menu-icon" onClick={toggleSidebar}>
                {/* Simple hamburger icon, can be replaced with an SVG or more complex spans */}
                <div className="menu-icon-bar"></div>
                <div className="menu-icon-bar"></div>
                <div className="menu-icon-bar"></div>
            </button>

            {/* Navigation Links - class will be dynamically set for sidebar behavior */}
            {/* The 'links' div will be styled as a sidebar on mobile and inline on desktop */}
            <div className={`links ${isSidebarOpen ? "sidebar-open" : ""}`}>
                <ul>
                    <Link className="a" to="/" onClick={isSidebarOpen ? toggleSidebar : undefined}><li>Home</li></Link>
                    <Link className="a" to="/learn" onClick={isSidebarOpen ? toggleSidebar : undefined}><li>Learn</li></Link>
                    <Link className="a" to="/ide" onClick={isSidebarOpen ? toggleSidebar : undefined}><li>Emulate</li></Link>
                    <Link className="a" to="/profile" onClick={isSidebarOpen ? toggleSidebar : undefined}><li>Profile</li></Link>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;

