import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext.jsx';
import { useAuth } from './context/AuthContext.jsx';
import { DashboardLayout } from './components/layout/DashboardLayout.jsx';
import { DashboardWorkspace } from './features/dashboard/DashboardWorkspace.jsx';
import { ProjectArchive } from './features/projects/ProjectArchive.jsx';
import { LandingPage } from './features/landing/LandingPage.jsx';
import { LoginPage } from './features/auth/LoginPage.jsx';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <DashboardLayout><DashboardWorkspace /></DashboardLayout>
            </PrivateRoute>
          } />
          <Route path="/projects" element={
            <PrivateRoute>
              <DashboardLayout><ProjectArchive /></DashboardLayout>
            </PrivateRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}
