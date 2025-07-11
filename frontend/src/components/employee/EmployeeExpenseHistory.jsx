import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Plus } from 'lucide-react';

export const EmployeeExpenseHistory = ({ expenses, getStatusIcon, onShowExpenseForm }) => (
  <Card>
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-semibold text-gray-900">Expense History</h2>
      <Button onClick={onShowExpenseForm}>
        <Plus className="h-4 w-4 mr-2" />
        New Expense
      </Button>
    </div>
    <div className="space-y-4">
      {expenses.map((expense) => (
        <div key={expense.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-4">
            {getStatusIcon(expense.status)}
            <div>
              <p className="font-medium text-gray-900">{expense.description}</p>
              <p className="text-sm text-gray-500">
                {expense.category} • Submitted on {expense.submittedAt}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold text-gray-900">
              ₹{expense.amount.toLocaleString()}
            </span>
            <span
              className={`inline-block px-2 py-1 text-xs font-semibold rounded
                ${expense.status === 'approved' ? 'bg-green-100 text-green-800' : ''}
                ${expense.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                ${expense.status === 'rejected' ? 'bg-red-100 text-red-800' : ''}
              `}
            >
              {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
            </span>
          </div>
        </div>
      ))}
    </div>
  </Card>
); 