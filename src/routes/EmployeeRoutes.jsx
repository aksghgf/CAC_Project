import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { AppLayout } from '../components/layout/AppLayout';
import { EmployeeDashboard } from '../pages/EmployeeDashboard';

export const EmployeeRoutes = () => {
  return (
    <ProtectedRoute>
      <AppLayout>
        <Routes>
          <Route path="/dashboard" element={<EmployeeDashboard />} />
          <Route path="*" element={<Navigate to="/employee/dashboard" replace />} />
        </Routes>
      </AppLayout>
    </ProtectedRoute>
  );
};
