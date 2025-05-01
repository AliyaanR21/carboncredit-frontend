// src/routes/index.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import EmployeeDashboard from '../pages/EmployeeDashboard';
import EmployerDashboard from '../pages/EmployerDashboard';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/sign-in" />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route path="/employer/dashboard" element={<EmployerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
