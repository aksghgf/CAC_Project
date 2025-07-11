import React from 'react';
import { TrendingUp, Users, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const AdminHeader = ({ onLogout }) => (
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
); 