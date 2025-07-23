import React, { useState } from 'react';

const SignUpForm = () => {
const [userDetails, setUserDetails] = useState({ username: '', password: '', email: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        // Optionally redirect to login page
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during signup.');
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <label for="email" className="signup-label">
        Email:
      </label>
      <input
        className="signup-input"
        type="email"
        name="email"
        placeholder="Enter email address"
        value={userDetails.email}
        onChange={handleChange}
      />

      <label for="username" className="signup-label">
        Username:
      </label>
      <input
        className="signup-input"
        type="text"
        name="username"
        placeholder="Create username"
        value={userDetails.username}
        onChange={handleChange}
      />

      <label for="password" className="signup-label">
        Password:{" "}
      </label>
      <input
        className="signup-input"
        type="password"
        name="password"
        placeholder="Create password"
        value={userDetails.password}
        onChange={handleChange}
      />

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;