import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterLogin.css'

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://todo-iz7q.onrender.com/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      alert('Registration successful');
      navigate('/login');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input className='input' name="username" type='text' placeholder="Username" onChange={handleChange} required />
      <input className='input' name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input className='input' name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button className='btn' type="submit">Register</button>
    </form>
  );
}

export default Register;
