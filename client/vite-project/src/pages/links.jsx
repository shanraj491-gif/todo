import React from 'react';
import { useNavigate } from 'react-router-dom';

const Links = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate('/register')}>Register</button>
  );
};

export default Links;
