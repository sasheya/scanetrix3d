import React, { useState } from 'react';

const SignUp = () => {
  const [userDetails, setUserDetails] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle user registration logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" value={userDetails.username} onChange={handleChange} />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={userDetails.password} onChange={handleChange} />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
