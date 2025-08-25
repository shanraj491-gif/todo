import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {

  const isLoggedIn = true; 
  return isLoggedIn ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
