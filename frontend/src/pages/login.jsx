import React from 'react';
import "../stylesheets/login.css";
import LoginForm from '../components/loginForm';

const Login = () => {

  return (
    <div className="login">
      <h1>
        <a href="Home">Scanetrix</a>
      </h1>
      <div className="login-container">
        <h2>Welcome Back!</h2>
        <p>Please enter your credentials to login.</p>
        <LoginForm />
        <div className="register-link">
          <p>
            Don't have an account?
            <a href="signup">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
