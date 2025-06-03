import React from 'react';
import "../stylesheets/login.css";
import LoginForm from '../components/loginForm';

const Login = () => {
  return (
    <div className="login-background">
      <h1>Scanetrix</h1>
      <div className="login-container">
        <h2>Welcome Back!</h2>
        <p>Please enter your credentials to login!</p>
        <LoginForm />
        <div className="register-link">
          <p>Don't have an account?
          <a href='signUp'>Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
