import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-code">
          <span className="four">4</span>
          <div className="zero-container">
            <span className="zero">0</span>
            <div className="zero-overlay"></div>
          </div>
          <span className="four">4</span>
        </div>
        
        <h1 className="error-title">Page Not Found</h1>
        
        <p className="error-message">
          The page you are looking for might have been removed, 
          had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-buttons">
              <span className="terminal-button red"></span>
              <span className="terminal-button yellow"></span>
              <span className="terminal-button green"></span>
            </div>
          </div>
          <div className="terminal-body">
            <p className="terminal-text">
              <span className="terminal-prompt">$</span> 
              <span className="terminal-command">find /path -name "<span className="terminal-highlight">page</span>"</span>
            </p>
            <p className="terminal-text">
              <span className="terminal-error">Error:</span> Path not found
            </p>
            <p className="terminal-text">
              <span className="terminal-prompt">$</span> 
              <span className="terminal-cursor">_</span>
            </p>
          </div>
        </div>
        
        <div className="navigation-links">
          <Link to="/" className="nav-link home-link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Home
          </Link>
          <Link to="/register" className="nav-link register-link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
            Register
          </Link>
          <Link to="/login" className="nav-link login-link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
              <polyline points="10 17 15 12 10 7"></polyline>
              <line x1="15" y1="12" x2="3" y2="12"></line>
            </svg>
            Login
          </Link>
        </div>
      </div>
      
      <div className="background-decoration">
        <div className="zigzag left"></div>
        <div className="zigzag right"></div>
      </div>
    </div>
  );
};

export default NotFound;