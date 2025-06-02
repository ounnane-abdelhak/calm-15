import React from 'react'
import {AuthForm} from '../../components/'
import { NavBar } from '../../components/';

const Register = ({updateCurrentUser}) => {
    return (
        <>
            <NavBar />
            <AuthForm currentRoute='/register' redirectRoute='/login' updateCurrentUser={updateCurrentUser}/>
        </>
    )
}

export default Register