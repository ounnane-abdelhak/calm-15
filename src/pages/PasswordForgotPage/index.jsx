import axios from 'axios';
import React from 'react'
import { useState } from 'react'

const PasswordForgotPage = () => {

    const [hasValidated, setHasValidated] = useState(false);
    const [email, setEmail] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formError = document.getElementById('form-error');
        const button = document.querySelector('.auth-button');
        
        // Basic email validation
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            formError.innerText = 'Please enter a valid email address';
            return;
        }

        button.disabled = true;
        formError.innerText = '';

        try {
            const response = await axios.post('https://calm-back-1.onrender.com/api/v1/users/forgotPassword', { email });
            console.log('Password reset email sent:', response);
            setHasValidated(true);
        } catch (err) {
            console.error('Password reset request failed:', err);
            const errorMessage = err.response?.data?.message || 'Failed to send reset email. Please try again.';
            formError.innerText = errorMessage;
            
            // If the error is a 404 (user not found), we still show success to prevent email enumeration
            if (err.response?.status === 404) {
                setHasValidated(true);
                return;
            }
        } finally {
            button.disabled = false;
        }
    }

    return (
        <>
            <div className='auth-form-container'>
                <h2>Password Reset Page</h2>
                {
                    hasValidated
                        ?
                        <>
                            <h2>Password reset link has been sent to your email!</h2>
                            <p>Check your inbox and follow the the link</p>
                        </>
                        :
                        <>
                            <h2 id='form-error'> </h2>

                            <form className='auth-form'>


                                <label className='auth-form-label' htmlFor="email">email</label>
                                <input className='auth-form-input' type='email' id='email' placeholder='example@host.com' name='email' value={email} onChange={handleEmailChange} />

                                <button className='auth-button' type="submit" onClick={handleSubmit}>Reset Password</button>

                            </form>
                        </>
                }
            </div>
        </>
    )
}

export default PasswordForgotPage