import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import Employees from './pages/Employees/Employees';
import Settings from './pages/Settings/Settings';
import Reports from './pages/Reports/Reports';
import LiveMonitoring from './pages/LiveMonitoring/LiveMonitoring';
import Profile from './pages/Profile/Profile';
import EmployeesInDetail from './pages/Employees/EmployeesInDetail';
import ProtectedRoute from './components/ProtectedRoute'; 
import Login from './pages/Login/Login';

export default function App() {
  return (
    <Routes>
      
      {/* 1. PUBLIC ROUTE (Login) */}
      <Route path="/login" element={<Login />} />

      {/* 2. PROTECTED ROUTES (Wrapped in Guard) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/live" element={<LiveMonitoring />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/:id" element={<EmployeesInDetail />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Catch-all: Redirect unknown pages to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}