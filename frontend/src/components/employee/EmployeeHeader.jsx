import React from 'react';
import { TrendingUp, LogOut, Plus } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const EmployeeHeader = ({ name, onShowExpenseForm, onLogout }) => (
  <header className="bg-white shadow-sm border-b">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center min-h-[4rem] py-2 gap-2 sm:gap-0">
        <div className="flex items-center mb-2 sm:mb-0">
          <TrendingUp className="h-8 w-8 text-blue-600 mr-2" />
          <span className="text-lg sm:text-xl font-bold text-gray-900">CAC Optimizer Pro</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:space-x-4 w-full sm:w-auto">
          <Button className="w-full sm:w-auto" onClick={onShowExpenseForm}>
            <Plus className="h-4 w-4 mr-2" />
            Submit Expense
          </Button>
          <Button variant="ghost" size="sm" className="w-full sm:w-auto" onClick={onLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  </header>
); 