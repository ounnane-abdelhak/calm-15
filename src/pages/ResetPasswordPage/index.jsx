import React from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios';

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    //get the reset token
    const { token } = useParams();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [hasConfirmed, setHasConfirmed] = useState(false);

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formError = document.getElementById('form-error');
        formError.innerText = ''; // Clear previous errors

        if (newPassword !== confirmPassword) {
            formError.innerText = "Passwords do not match!";
            return;
        }

        if (newPassword.length < 8) {
            formError.innerText = "Password must be at least 8 characters long";
            return;
        }

        const URL = `https://calm-back-1.onrender.com/api/v1/users/resetPassword/${token}`;
        const button = document.querySelector('.auth-button');
        button.disabled = true;

        try {
            const response = await axios.patch(URL, {
                password: newPassword,
                passwordConfirm: confirmPassword
            });
            setHasConfirmed(true); // Indicate success
        } catch (err) {
            console.error('Password reset error:', err);
            const errorMessage = err.response?.data?.message || 'Failed to reset password. Please try again.';
            formError.innerText = errorMessage;
            // If token is invalid or expired, show a more helpful message
            if (err.response?.status === 400) {
                formError.innerText = 'The password reset link is invalid or has expired. Please request a new one.';
            }
        } finally {
            button.disabled = false;
        }
    };

    return (
        <>
            <div className='auth-form-container'>
                <h2>Password Reset Page</h2>
                {
                    hasConfirmed
                        ?
                        <>
                            <h2>Password has been reset successfully! You can go to the login page from <Link to="/login">here</Link>.</h2>
                        </>
                        :
                        <>
                            <h2 id='form-error'> </h2>

                            <form className='auth-form'>

                                <label className='auth-form-label' htmlFor="new-password">New password:</label>
                                <input className='auth-form-input' type='password' id='new-password' placeholder='***********************' name='password' value={newPassword} onChange={handleNewPasswordChange} />

                                <label className='auth-form-label' htmlFor="confirm-password">Confirm password:</label>
                                <input className='auth-form-input' type='password' id='confirm-password' placeholder='***********************' name='password' value={confirmPassword} onChange={handleConfirmPasswordChange} />

                                <button className='auth-button' type="submit" onClick={handleSubmit}>Reset Password</button>

                            </form>

                            <button className='auth-link-button' onClick={() => { return navigate('/login') }}>
                                Cancel? Go to the <Link to="/login">login</Link> page
                            </button>
                        </>
                }
            </div>
        </>
    )
}

export default ResetPasswordPage