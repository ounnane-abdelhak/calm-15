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

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            updateCurrentUser(parsedUser); // Set currentUser from localStorage
            setPrograms(parsedUser.savedPrograms || []); // Initialize programs from localStorage

            // Fetch the latest programs from the backend
            const URL = `https://calm-back-1.onrender.com/api/v1/users/${parsedUser.id}/code/all`;
            axios.get(URL)
                .then((response) => {
                    setPrograms(response.data.data); // Update programs with the latest data
                })
                .catch((error) => {
                    console.error('Failed to fetch programs:', error);
                    alert('Failed to load programs. Please try again.');
                });
        } else {
            navigate('/login'); // Redirect to login if no user is found in localStorage
        }
    }, []);

    const handlePasswordResetRequest = (e) => {
        const URL = `https://calm-back-1.onrender.com/api/v1/users/forgotPassword`;
        console.log('Reset Password button clicked, sending request to:', URL);

        axios.post(URL, { email: currentUser.email })
            .then(response => {
                navigate('/reset-password/email-sent');
            })
            .catch(error => {
                console.error('Password reset request failed:', error);
                // Even if there's an error, we still navigate to the email sent page
                // to prevent email enumeration attacks
                navigate('/reset-password/email-sent');
            })
    }

    const logout = () => {
        const URL = 'https://calm-back-1.onrender.com/api/v1/users/logout'; // Updated to include /users prefix
        axios.get(URL) // Changed to GET request to match backend implementation
            .then(res => {
                updateCurrentUser(null);
                localStorage.removeItem('user');
                navigate('/');
            })
            .catch(err => {
                console.log(err);
                alert("Logout Failed, server isn't responding");
            })
    }

    const removeProgram = (targetProgram) => {
        setPrograms((prevPrograms) => prevPrograms.filter(program => program._id !== targetProgram._id));
    }

    return (
        <>
            <NavBar />
            <div className='profile-container'>
                {!currentUser
                    ?
                    <>
                        <h1 className='profile-title'>No user is logged in</h1>
                        <p>You can login <Link to="/login">here</Link></p>
                    </>
                    :
                    <>

                        <div className="profile-info-container">
                            <h1 className='profile-title'>Profile Information</h1>
                            <div style={{ padding: "1rem" }}>
                                <p>Email: {currentUser.email}</p>
                                <p>Score: {currentUser.score}</p>

                            </div>
                            <p>Saved Programs</p>
                            {programs === null
                                ? <p>Loading programs...</p>
                                : programs.length === 0
                                    ?
                                    <p>No programs saved for this profile!</p>
                                    :
                                    <div className="program-container">
                                        {
                                            programs.slice(0).reverse().map(program =>
                                                <ProgramContainer key={program.id} program={program}
                                                    removeProgram={removeProgram} userId={currentUser.id} />
                                            )
                                        }
                                    </div>
                            }
                        </div>


                        <div className='buttons-container'>
                            <motion.button className='profile-button'
                                onClick={handlePasswordResetRequest}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >Reset Password</motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                className='profile-button'
                                onClick={logout}>Logout</motion.button>
                        </div>
                    </>
                }


            </div>
            <Footer />
        </>
    )
}

export default Profile
