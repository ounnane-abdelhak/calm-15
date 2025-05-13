import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "./style.css";

const BASE_URL = 'https://calm-back-1.onrender.com/api/v1/users'; // Updated to include /users prefix

const AuthForm = ({ currentRoute, updateCurrentUser }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const navigate = useNavigate();
    const { token } = useParams();

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handlePasswordConfirmChange = (e) => {
        setPasswordConfirm(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formError = document.getElementById('form-error');
        let URL = `${BASE_URL}`;
        
        // Set the correct endpoint based on the current route
        if (currentRoute === '/register' || currentRoute === '/signup') {
            URL += '/signup';
        } else {
            URL += currentRoute;
        }

        document.querySelector('.auth-button').disabled = true;
        formError.innerText = ''; // Clear previous errors

        if (currentRoute === '/resetPassword') {
            // For reset password, we need to include the token from URL
            axios
                .patch(`${URL}/${token}`, { 
                    password, 
                    passwordConfirm 
                })
                .then((res) => {
                    navigate('/login');
                })
                .catch((err) => {
                    const errorMessage = err.response?.data?.message || 'Failed to reset password. Please try again.';
                    formError.innerText = errorMessage;
                    console.error('Reset password error:', err);
                })
                .finally(() => {
                    document.querySelector('.auth-button').disabled = false;
                });
        } else if (currentRoute === '/login') {
            // Handle login
            axios
                .post(URL, { email, password })
                .then((res) => {
                    const user = res.data.data.user;
                    console.log('User logged in:', user);
                    updateCurrentUser(user);
                    localStorage.setItem('user', JSON.stringify(user));
                    navigate('/learn');
                })
                .catch((err) => {
                    const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
                    formError.innerText = errorMessage;
                    console.error('Login error:', err);
                })
                .finally(() => {
                    document.querySelector('.auth-button').disabled = false;
                });
        } else if (currentRoute === '/signup' || currentRoute === '/register') {
            // Handle signup
            if (password !== passwordConfirm) {
                formError.innerText = 'Passwords do not match';
                document.querySelector('.auth-button').disabled = false;
                return;
            }

            // Make sure we're using the correct endpoint
            const signupURL = `${BASE_URL}/signup`;
            
            axios
                .post(signupURL, { 
                    name,
                    email, 
                    password, 
                    passwordConfirm 
                })
                .then((res) => {
                    const user = res.data.data.user;
                    console.log('User registered:', user);
                    updateCurrentUser(user);
                    localStorage.setItem('user', JSON.stringify(user));
                    navigate('/learn');
                })
                .catch((err) => {
                    const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
                    formError.innerText = errorMessage;
                    console.error('Registration error:', err);
                    console.error('Response data:', err.response?.data);
                })
                .finally(() => {
                    document.querySelector('.auth-button').disabled = false;
                });
        }
    };

    return (
        <div className="auth-form-container">
            <h2>{currentRoute === '/login' ? 'Welcome to Calm Platform!' : currentRoute === '/resetPassword' ? 'Reset Your Password' : 'Create your account'}</h2>
            <h2 id="form-error"> </h2>
            <form className="auth-form">
                {(currentRoute === '/signup' || currentRoute === '/register') && (
                    <>
                        <label className="auth-form-label" htmlFor="name">
                            Full Name
                        </label>
                        <input
                            className="auth-form-input"
                            type="text"
                            id="name"
                            placeholder="Your name"
                            name="name"
                            value={name}
                            onChange={handleNameChange}
                            required
                        />
                    </>
                )}
                <label className="auth-form-label" htmlFor="email">
                    Email
                </label>
                <input
                    className="auth-form-input"
                    type="email"
                    id="email"
                    placeholder="example@host.com"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />

                <label className="auth-form-label" htmlFor="password">
                    Password
                </label>
                <input
                    className="auth-form-input"
                    type="password"
                    id="password"
                    placeholder="***********************"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                />

                {(currentRoute === '/resetPassword' || currentRoute === '/signup' || currentRoute === '/register') && (
                    <>
                        <label className="auth-form-label" htmlFor="passwordConfirm">
                            Confirm Password
                        </label>
                        <input
                            className="auth-form-input"
                            type="password"
                            id="passwordConfirm"
                            placeholder="Confirm password"
                            name="passwordConfirm"
                            value={passwordConfirm}
                            onChange={handlePasswordConfirmChange}
                        />
                    </>
                )}

                <button className="auth-button" type="submit" onClick={handleSubmit}>
                    {currentRoute === '/login' ? 'Login' : currentRoute === '/resetPassword' ? 'Reset Password' : 'Register'}
                </button>
            </form>
            {currentRoute !== '/resetPassword' && (
                <button className="auth-link-button" onClick={() => navigate(currentRoute === '/login' ? '/register' : '/login')}>
                    {currentRoute === '/login' ? "Don't have an account? Register" : 'Already have an account? Login'}
                </button>
            )}
            {currentRoute === '/login' && (
                <button className="auth-link-button" onClick={() => navigate('/password-forgot')}>
                    Forgot password?
                </button>
            )}
        </div>
    );
};

export default AuthForm;
