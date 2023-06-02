import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if a user with the same email already exists in local storage
    const existingUser = localStorage.getItem('user');
    if (existingUser) {
      const parsedUser = JSON.parse(existingUser);
      if (parsedUser.email === email && parsedUser.password === password) {
        alert('User with the same email and password already exists.');
        return;
      }
      // Delete the existing user
      localStorage.removeItem('user');
    }

    // Create a new user object
    const user = {
      name,
      email,
      password,
    };

    // Save the user object to local storage
    localStorage.setItem('user', JSON.stringify(user));

    // Reset the form fields
    setName('');
    setEmail('');
    setPassword('');

    alert('Sign up successful!');
    navigate('/todo');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="card">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={handleNameChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} required />
        </div>
        <button type="submit">Register</button>
      <button onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default Register;
