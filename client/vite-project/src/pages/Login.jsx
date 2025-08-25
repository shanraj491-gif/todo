import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterLogin.css'
function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      alert('Login successful');
      navigate('/todo');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input className='input email' name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input className='input password' name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button className='btn' type="submit">Login</button>
    </form>
  );
}

export default Login;
