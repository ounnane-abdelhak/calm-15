import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { NavBar } from '../../components'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ProgramContainer } from '../../components';
import { motion } from 'framer-motion';
import { Footer } from "../../containers";

const Profile = ({ currentUser, updateCurrentUser }) => {
    const navigate = useNavigate();
    const [programs, setPrograms] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            updateCurrentUser(parsedUser);
            setPrograms(parsedUser.savedPrograms || []);

            // Fetch the latest programs from the backend
            const URL = `https://calm-back-1.onrender.com/api/v1/users/${parsedUser.id}/code/all`;
            setIsLoading(true);
            axios.get(URL)
                .then((response) => {
                    setPrograms(response.data.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('Failed to fetch programs:', error);
                    setIsLoading(false);
                });
        } else {
            navigate('/login');
        }
    }, []);

    const handlePasswordResetRequest = (e) => {
        const URL = `https://calm-back-1.onrender.com/api/v1/users/forgotPassword`;
        
        setIsLoading(true);
        axios.post(URL, { email: currentUser.email })
            .then(response => {
                setIsLoading(false);
                navigate('/reset-password/email-sent');
            })
            .catch(error => {
                console.error('Password reset request failed:', error);
                setIsLoading(false);
                navigate('/reset-password/email-sent');
            })
    }

    const logout = () => {
        const URL = 'https://calm-back-1.onrender.com/api/v1/users/logout';
        setIsLoading(true);
        axios.get(URL)
            .then(res => {
                updateCurrentUser(null);
                localStorage.removeItem('user');
                setIsLoading(false);
                navigate('/');
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
                alert("Logout Failed, server isn't responding");
            })
    }

    const removeProgram = (targetProgram) => {
        setPrograms((prevPrograms) => prevPrograms.filter(program => program._id !== targetProgram._id));
    }

    return (
        <div className="profile-page">
            <NavBar />
            <div className='profile-main-container'>
                {!currentUser ? (
                    <div className="profile-not-logged-in">
                        <div className="terminal-window">
                            <div className="terminal-header">
                                <div className="terminal-buttons">
                                    <span className="terminal-button red"></span>
                                    <span className="terminal-button yellow"></span>
                                    <span className="terminal-button green"></span>
                                </div>
                                <div className="terminal-title">Authentication Required</div>
                            </div>
                            <div className="terminal-body">
                                <p className="terminal-text">
                                    <span className="terminal-prompt">$</span> 
                                    <span className="terminal-command">access --profile</span>
                                </p>
                                <p className="terminal-text">
                                    <span className="terminal-error">Error:</span> No user session found
                                </p>
                                <p className="terminal-text">
                                    <span className="terminal-prompt">$</span> 
                                    <span className="terminal-command">login --redirect</span>
                                </p>
                                <p className="terminal-text">
                                    <span className="terminal-success">Success:</span> Redirecting to login page...
                                </p>
                            </div>
                        </div>
                        <Link to="/login" className="profile-login-button">
                            <span>Login</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                                <polyline points="10 17 15 12 10 7"></polyline>
                                <line x1="15" y1="12" x2="3" y2="12"></line>
                            </svg>
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="profile-header">
                            <div className="profile-avatar">
                                <div className="avatar-initial">{currentUser.email[0].toUpperCase()}</div>
                            </div>
                            <div className="profile-header-info">
                                <h1>{currentUser.email.split('@')[0]}</h1>
                                <div className="profile-stats">
                                    <div className="stat-item">
                                        <span className="stat-value">{currentUser.score}</span>
                                        <span className="stat-label">Score</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-value">{programs ? programs.length : 0}</span>
                                        <span className="stat-label">Programs</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="profile-info-container">
                            <h2 className='profile-title'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                Profile Information
                            </h2>
                            
                            <div className="profile-details">
                                <div className="profile-detail-item">
                                    <span className="detail-label">Email</span>
                                    <span className="detail-value">{currentUser.email}</span>
                                </div>
                                <div className="profile-detail-item">
                                    <span className="detail-label">Score</span>
                                    <span className="detail-value">{currentUser.score}</span>
                                </div>
                            </div>
                            
                            <div className="profile-actions">
                                <motion.button 
                                    className='profile-button reset-button'
                                    onClick={handlePasswordResetRequest}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    disabled={isLoading}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                    </svg>
                                    Reset Password
                                </motion.button>
                                
                                <motion.button
                                    className='profile-button logout-button'
                                    onClick={logout}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    disabled={isLoading}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                        <polyline points="16 17 21 12 16 7"></polyline>
                                        <line x1="21" y1="12" x2="9" y2="12"></line>
                                    </svg>
                                    Logout
                                </motion.button>
                            </div>
                        </div>

                        <div className="programs-section">
                            <h2 className='programs-title'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="16 18 22 12 16 6"></polyline>
                                    <polyline points="8 6 2 12 8 18"></polyline>
                                </svg>
                                Saved Programs
                            </h2>
                            
                            {isLoading ? (
                                <div className="loading-container">
                                    <div className="loading-spinner"></div>
                                    <p>Loading programs...</p>
                                </div>
                            ) : programs && programs.length === 0 ? (
                                <div className="empty-programs">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="8" x2="12" y2="12"></line>
                                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                    </svg>
                                    <p>No programs saved for this profile!</p>
                                    <Link to="/emulate" className="create-program-link">Create a program</Link>
                                </div>
                            ) : (
                                <div className="program-container">
                                    {programs && programs.slice(0).reverse().map(program => (
                                        <ProgramContainer 
                                            key={program.id || program._id} 
                                            program={program}
                                            removeProgram={removeProgram} 
                                            userId={currentUser.id} 
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </div>
    )
}

export default Profile