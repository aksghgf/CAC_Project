import React from 'react';
import { TrendingUp, LogOut, Plus } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const EmployeeHeader = ({ onShowExpenseForm, onLogout }) => (
  <header className="bg-white shadow-sm border-b">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
          <TrendingUp className="h-8 w-8 text-blue-600 mr-2" />
          <span className="text-xl font-bold text-gray-900">CAC Optimizer Pro</span>
          <Badge variant="secondary" className="ml-3">Employee</Badge>
        </div>
        <div className="flex items-center space-x-4">
          <Button onClick={onShowExpenseForm}>
            <Plus className="h-4 w-4 mr-2" />
            Submit Expense
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