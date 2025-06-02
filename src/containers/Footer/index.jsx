import React from 'react';
import './style.css';

// Import icons
import discordIcon from '../../assets/images/icons/discord-icon.png';
import emailIcon from '../../assets/images/icons/email-icon.png';
import githubIcon from '../../assets/images/icons/github-icon.png';
import linkedinIcon from '../../assets/images/icons/linkedin-icon.png';

function Footer() {
  return (
    <div className="footer-wrapper">
      <div className="footer-content">
        <section className="collaboration-section">
          <div className="collaboration-content">
            <h2 className="section-title">
              Thanks for everyone who contributed to this project
              <span className="heart-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </span>
            </h2>
            <p className="contribution-text">
              You can always contribute from
              <a 
                href="https://github.com/Calm-ESI" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="github-link"
              >
                here
              </a>
            </p>
          </div>
        </section>

        <div className="footer-main">
          <div className="contact-container">
            <h2 className="contact-title">You can reach us out anytime</h2>
            <a 
              href="mailto:calmesiproject@gmail.com" 
              className="email-button"
            >
              <span>Email us</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>

          <div className="social-container">
            <h2 className="social-title">Follow us for updates</h2>
            <div className="social-icons">
              <a 
                href="https://github.com/Calm-ESI/Calm" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon github"
                aria-label="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a 
                href="https://discord.gg/DNTfnHQFDm" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon discord"
                aria-label="Discord"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 9a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v5a5 5 0 0 0 5 5h4"></path>
                  <circle cx="15" cy="12" r="1"></circle>
                  <circle cx="9" cy="12" r="1"></circle>
                  <path d="M9 15c.83.67 1.83 1 3 1s2.17-.33 3-1"></path>
                  <path d="M19 15v-3a2 2 0 0 0-2-2h-1.8"></path>
                  <path d="M21 15v-3a2 2 0 0 0-2-2h-1.8"></path>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/company/calm-esi/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon linkedin"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-logo">
            <div className="logo-text">
              <span className="logo-ca">ca</span>
              <span className="logo-lm">lM</span>
            </div>
          </div>
          <p className="copyright">© {new Date().getFullYear()} CALM. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
