import React, { useState } from 'react';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { EmployeeDashboard } from './pages/EmployeeDashboard';
import { setAuthToken, setCurrentUser, logout } from './utils/auth';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [userType, setUserType] = useState(null);

  const handleLoginClick = (type) => {
    setUserType(type);
    setCurrentPage('login');
  };

  const handleLogin = (type, credentials) => {
    // Mock authentication
    const mockUser = {
      id: '1',
      email: credentials.email,
      role: type,
      name: type === 'admin' ? 'Admin User' : 'Employee User'
    };
    
    setAuthToken('mock-token-123');
    setCurrentUser(mockUser);
    setCurrentPage(type === 'admin' ? 'admin-dashboard' : 'employee-dashboard');
  };

  const handleLogout = () => {
    logout();
    setCurrentPage('landing');
    setUserType(null);
  };

  const handleBack = () => {
    setCurrentPage('landing');
    setUserType(null);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onLoginClick={handleLoginClick} />;
      case 'login':
        return <LoginPage userType={userType} onLogin={handleLogin} onBack={handleBack} />;
      case 'admin-dashboard':
        return <AdminDashboard onLogout={handleLogout} />;
      case 'employee-dashboard':
        return <EmployeeDashboard onLogout={handleLogout} />;
      default:
        return <LandingPage onLoginClick={handleLoginClick} />;
    }
  };

  return <div className="App">{renderPage()}</div>;
}

export default App;