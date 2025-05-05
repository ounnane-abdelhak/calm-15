import React from 'react';
import { AuthForm } from '../../components/';  // Make sure the import path is correct

const Login = ({ updateCurrentUser }) => {
    return (
        <AuthForm currentRoute='/login' updateCurrentUser={updateCurrentUser} />
    );
};

export default Login;
