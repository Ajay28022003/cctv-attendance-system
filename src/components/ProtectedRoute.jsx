import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute() {
  const { user } = useAuth();

  // If no user is found, redirect to Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user exists, allow them to see the child routes (Outlet)
  return <Outlet />;
}