import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Target, 
  BarChart3, 
  DollarSign, 
  Settings,
  Upload,
  FileText
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const Navigation = () => {
  const { isAdmin } = useAuth();

  const adminTabs = [
    { id: 'campaigns', label: 'ML Campaigns', icon: Target, path: '/admin/campaigns' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
    { id: 'expenses', label: 'Expense Reports', icon: DollarSign, path: '/admin/expenses' },
    { id: 'notes', label: 'Admin Notes', icon: Settings, path: '/admin/notes' },
  ];

  const employeeTabs = [
    { id: 'expenses', label: 'My Expenses', icon: FileText, path: '/employee/expenses' },
    { id: 'submit', label: 'Submit Expense', icon: Upload, path: '/employee/submit' },
  ];

  const tabs = isAdmin() ? adminTabs : employeeTabs;

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <NavLink
                key={tab.id}
                to={tab.path}
                className={({ isActive }) =>
                  `flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    isActive
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`
                }
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.label}
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
}; 