import React, { useState } from 'react';
import { CACCards } from '../components/admin/CACCards';
import { CampaignPanel } from '../components/admin/CampaignPanel';
import { ExpenseManager } from '../components/admin/ExpenseManager';
import { AdminNotes } from '../components/admin/AdminNotes';
import { PerformanceCharts } from '../components/admin/PerformanceCharts';
import Lottie from 'lottie-react';
import dashboardEmpty from '../Assets/dashboard-empty.json';
import { useAuth } from '../contexts/AuthContext';
import { Target, BarChart3, DollarSign, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('campaigns');
  // Simulate empty state for demo
  const [hasCampaigns] = useState(true); // set to false to see empty state
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const tabs = [
    { id: 'campaigns', label: 'ML Campaigns', icon: Target },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'expenses', label: 'Expense Reports', icon: DollarSign },
    { id: 'notes', label: 'Admin Notes', icon: Settings },
    { id: 'register-employee', label: 'Register Employee', icon: Settings },
  ];

  // State for employee registration
  const [empForm, setEmpForm] = useState({ name: '', email: '', password: '' });
  const [empLoading, setEmpLoading] = useState(false);
  const [empMsg, setEmpMsg] = useState('');

  const handleEmpChange = (e) => {
    setEmpForm({ ...empForm, [e.target.name]: e.target.value });
  };

  const handleEmpSubmit = async (e) => {
    e.preventDefault();
    setEmpLoading(true);
    setEmpMsg('');
    try {
      const res = await api.post('/auth/register-employee', empForm, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      setEmpLoading(false);
      setEmpMsg('Employee registered successfully!');
      setEmpForm({ name: '', email: '', password: '' });
    } catch (error) {
      setEmpLoading(false);
      setEmpMsg(error.response?.data?.message || error.message || 'Registration failed');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'campaigns':
        return (
          <div className="space-y-6">
            {!hasCampaigns ? (
              <div className="flex flex-col items-center justify-center py-16">
                <Lottie animationData={dashboardEmpty} className="w-64 h-64 mb-4" loop={true} />
                <h3 className="text-xl font-semibold mb-2 text-gray-700">No Campaigns Yet</h3>
                <p className="text-gray-500 mb-4">Start your first ML-powered campaign to see results here!</p>
              </div>
            ) : (
              <>
                <CampaignPanel />
                <CACCards />
              </>
            )}
          </div>
        );
      case 'analytics':
        return <PerformanceCharts />;
      case 'expenses':
        return <ExpenseManager />;
      case 'notes':
        return <AdminNotes />;
      case 'register-employee':
        return (
          <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Register New Employee</h2>
            <form onSubmit={handleEmpSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={empForm.name}
                  onChange={handleEmpChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={empForm.email}
                  onChange={handleEmpChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={empForm.password}
                  onChange={handleEmpChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                disabled={empLoading}
              >
                {empLoading ? 'Registering...' : 'Register Employee'}
              </button>
            </form>
            {empMsg && <div className="mt-4 text-center text-sm text-red-600">{empMsg}</div>}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Welcome Card (sticky at top) */}
      <div className="sticky top-0 z-30 flex items-center justify-between gap-4 px-8 py-6 bg-gradient-to-r from-blue-600 to-teal-500 shadow-md rounded-b-3xl mb-8" style={{ position: 'sticky', top: 0 }}>
        <div className="flex items-center gap-4">
          <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=admin`} alt="Admin Avatar" className="w-16 h-16 rounded-full border-4 border-white shadow" />
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Welcome back, {user?.name || 'Admin'}!</h1>
            <p className="text-blue-100">Here's your business at a glance.</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center bg-white text-blue-600 hover:bg-blue-50 font-medium px-4 py-2 rounded-lg shadow transition-colors"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </button>
      </div>
      {/* Spacer to prevent content from being hidden under sticky card */}
      <div className="h-32" />
      {/* Tab Navigation with Icons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex space-x-8 border-b">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;

