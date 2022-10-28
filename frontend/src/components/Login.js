import React from "react";
import Header from "./Header";
import SignUp from "./SignUp";

const Login = ({ onLogIn, loggedIn }) => {
  return (
    <>
      <Header linkTitle="Регистрация" link="/sign-up" loggedIn={loggedIn} />
      <SignUp title="Вход" titleBtn="Войти" isLogin={true} onSubmit={onLogIn} />
    </>
  )
}

export default Login;