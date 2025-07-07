import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  BarChart3, 
  Settings, 
  LogOut,
  Plus,
  Target,
  Globe,
  PieChart
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { CACCards } from '../components/dashboard/CACCards';
import { CampaignPanel } from '../components/dashboard/CampaignPanel';
import { ExpenseManager } from '../components/dashboard/ExpenseManager';
import { AdminNotes } from '../components/dashboard/AdminNotes';
import { PerformanceCharts } from '../components/charts/PerformanceCharts';

export const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('campaigns');

  const tabs = [
    { id: 'campaigns', label: 'ML Campaigns', icon: Target },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'expenses', label: 'Expense Reports', icon: DollarSign },
    { id: 'notes', label: 'Admin Notes', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'campaigns':
        return (
          <div className="space-y-6">
            <CampaignPanel />
            <CACCards />
          </div>
        );
      case 'analytics':
        return <PerformanceCharts />;
      case 'expenses':
        return <ExpenseManager />;
      case 'notes':
        return <AdminNotes />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">CAC Optimizer Pro</span>
              <Badge variant="success" className="ml-3">Admin</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Users className="h-4 w-4 mr-2" />
                User Management
              </Button>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
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
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};