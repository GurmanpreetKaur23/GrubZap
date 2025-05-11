import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const isAuthenticated = () => {
  return !!(localStorage.getItem('token') || sessionStorage.getItem('token'));
};

const ProtectedRoute = () => {
  if (!isAuthenticated()) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }
  // If authenticated, render child routes
  return <Outlet />;
};

export default ProtectedRoute;
