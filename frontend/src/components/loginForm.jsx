import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        // Handle successful login: store token and redirect
        localStorage.setItem('token', data.access_token); // Store the JWT
        navigate('/viewer'); // Redirect to the viewer page
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during login.');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label className="login-label" for="username">
        Username
      </label>
      <input
        className="login-input"
        type="text"
        placeholder="Enter username"
        name="username"
        value={credentials.username}
        onChange={handleChange}
      />
     
      <label className="login-label" for="password">
        Password
      </label>
      <input
        className="login-input"
        type="password"
        placeholder="Enter password"
        name="password"
        value={credentials.password}
        onChange={handleChange}
      />
      
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
