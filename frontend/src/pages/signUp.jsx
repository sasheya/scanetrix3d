import React from "react";
import "../stylesheets/signUp.css";
import SignUpForm from "../components/signUpForm";

const SignUp = () => {
  return (
    <div className="signup">
      <h1>
        <h1>
          <a href="Home">Scanetrix</a>
        </h1>
      </h1>
      <div className="signup-container">
        <h2>Create your account.</h2>
        {/* <p>Please enter your credentials to login.</p> */}
        <SignUpForm />
        <div className="login-link">
          <p>
            Already have an account?
            <a href="login">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
