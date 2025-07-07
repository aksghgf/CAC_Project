import React, { useState } from 'react';
import { 
  TrendingUp, 
  Upload, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  LogOut,
  Plus
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { ExpenseForm } from '../components/forms/ExpenseForm';

export const EmployeeDashboard = ({ onLogout }) => {
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      description: 'Billboard advertising campaign',
      amount: 25000,
      category: 'billboard',
      status: 'approved',
      submittedAt: '2024-01-15',
      receipt: 'receipt1.pdf'
    },
    {
      id: 2,
      description: 'Influencer collaboration payment',
      amount: 15000,
      category: 'influencer',
      status: 'pending',
      submittedAt: '2024-01-14',
      receipt: 'receipt2.pdf'
    },
    {
      id: 3,
      description: 'Email marketing tools subscription',
      amount: 5000,
      category: 'email',
      status: 'rejected',
      submittedAt: '2024-01-13',
      receipt: 'receipt3.pdf'
    }
  ]);

  const handleSubmitExpense = (expenseData) => {
    const newExpense = {
      id: expenses.length + 1,
      ...expenseData,
      status: 'pending',
      submittedAt: new Date().toISOString().split('T')[0]
    };
    setExpenses([newExpense, ...expenses]);
    setShowExpenseForm(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <Badge variant="success">Approved</Badge>;
      case 'rejected':
        return <Badge variant="error">Rejected</Badge>;
      default:
        return <Badge variant="warning">Pending</Badge>;
    }
  };

  const totalSpent = expenses
    .filter(exp => exp.status === 'approved')
    .reduce((sum, exp) => sum + exp.amount, 0);

  const pendingAmount = expenses
    .filter(exp => exp.status === 'pending')
    .reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">CAC Optimizer Pro</span>
              <Badge variant="secondary" className="ml-3">Employee</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={() => setShowExpenseForm(true)}>
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Approved</p>
                <p className="text-2xl font-bold text-gray-900">₹{totalSpent.toLocaleString()}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Pending Approval</p>
                <p className="text-2xl font-bold text-gray-900">₹{pendingAmount.toLocaleString()}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Submissions</p>
                <p className="text-2xl font-bold text-gray-900">{expenses.length}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Expense History */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Expense History</h2>
            <Button onClick={() => setShowExpenseForm(true)}>
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
                  {getStatusBadge(expense.status)}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>

      {/* Expense Form Modal */}
      <Modal
        isOpen={showExpenseForm}
        onClose={() => setShowExpenseForm(false)}
        title="Submit New Expense"
        size="lg"
      >
        <ExpenseForm
          onSubmit={handleSubmitExpense}
          onCancel={() => setShowExpenseForm(false)}
        />
      </Modal>
    </div>
  );
};