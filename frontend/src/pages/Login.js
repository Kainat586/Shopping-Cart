// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../pages/AuthContext'; // adjust path if needed
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // optional: add your styles
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // 👈 this handles storing user in context/localStorage
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      if (res.data.token) {
        login({
          _id: res.data.user.id,
          name: res.data.user.name,
          email: res.data.user.email,
          token: res.data.token
        });

        alert('Login successful');
        navigate('/home');
      } else {
        alert('Login failed');
      }

    } catch (err) {
      console.error(err);
      alert('An error occurred during login');
    }
  };


  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Login</button>
        <p className="signup-link">
          No Account? <span onClick={() => navigate('/signup')}>signup</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
