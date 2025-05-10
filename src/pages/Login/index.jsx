import React from "react";
import { AuthForm } from "../../components/"; // Make sure the import path is correct
import { NavBar } from "../../components/";
const Login = ({ updateCurrentUser }) => {
  return (
    <>
      <NavBar />
      <AuthForm currentRoute="/login" updateCurrentUser={updateCurrentUser} />
    </>
  );
};

export default Login;
