import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { AppLayout } from '../components/layout/AppLayout';
import { AdminDashboard } from '../pages/AdminDashboard';
import InfluencerAnalyticsPage from '../pages/InfluencerAnalyticsPage';

export const AdminRoutes = () => {
  return (
    <ProtectedRoute requiredRole="admin">
      <AppLayout>
        <Routes>
          {/* Always show AdminDashboard for /admin/dashboard */}
          <Route path="/dashboard" element={<AdminDashboard />} />
          {/* Influencer Analytics Page */}
          <Route path="/influencer-analytics" element={<InfluencerAnalyticsPage />} />
          {/* Redirect all other admin routes to dashboard for now, to ensure welcome card is always visible */}
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </AppLayout>
    </ProtectedRoute>
  );
};
