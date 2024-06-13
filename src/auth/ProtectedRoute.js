import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, role }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  const username = localStorage.getItem('user');

  if (!token) {
    return <Navigate to="/auth" />;
  }

  if (role.includes(userRole)) {
    return element;
  }

  return <Navigate to={`/${username}`} />;
};

export default ProtectedRoute;
