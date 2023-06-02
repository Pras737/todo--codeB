import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the user exists in local storage
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      alert('User not found.');
      return;
    }
         //"name:prashant,password=12345"  =>  {"name" : "prashant", "password" :"123456"}
    // Parse the stored user object
    const user = JSON.parse(storedUser);

    // Check if the email and password match
    if (user.email === email && user.password === password) {
      alert('Login successful!');
      // Reset the form fields
      setEmail('');
      setPassword('');

      // Redirect to Todo page
      navigate('/todo');
    } else {
      alert('Invalid email or password.');
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        <button onClick={handleRegister}>Register</button>
      </form>
    </div>
  );
};

export default Login;
