import React, { useState } from 'react';

const SignUp = () => {
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
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" value={userDetails.username} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={userDetails.email} onChange={handleChange} />
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
