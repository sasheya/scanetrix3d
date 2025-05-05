import React, { useState } from 'react';

const LoginForm = () => {
const [credentials, setCredentials] = useState({ username: '', password: '' });

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
        // In a real application, handle successful login (e.g., store token, redirect)
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during login.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" value={credentials.username} onChange={handleChange} />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={credentials.password} onChange={handleChange} />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
