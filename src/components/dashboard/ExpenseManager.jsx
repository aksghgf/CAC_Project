import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { CheckCircle, XCircle, Eye, Clock, DollarSign } from 'lucide-react';

export const ExpenseManager = () => {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      employeeId: 'EMP001',
      employeeName: 'John Doe',
      amount: 25000,
      description: 'Billboard advertising campaign in Mumbai',
      category: 'billboard',
      receipt: 'receipt1.pdf',
      status: 'pending',
      submittedAt: '2024-01-15',
    },
    {
      id: 2,
      employeeId: 'EMP002',
      employeeName: 'Jane Smith',
      amount: 15000,
      description: 'Influencer collaboration payment',
      category: 'influencer',
      receipt: 'receipt2.pdf',
      status: 'pending',
      submittedAt: '2024-01-14',
    },
    {
      id: 3,
      employeeId: 'EMP003',
      employeeName: 'Mike Johnson',
      amount: 8000,
      description: 'Email marketing tools subscription',
      category: 'email',
      receipt: 'receipt3.pdf',
      status: 'approved',
      submittedAt: '2024-01-13',
      reviewedAt: '2024-01-14',
    },
    {
      id: 4,
      employeeId: 'EMP001',
      employeeName: 'John Doe',
      amount: 12000,
      description: 'Conference booth setup',
      category: 'other',
      receipt: 'receipt4.pdf',
      status: 'rejected',
      submittedAt: '2024-01-12',
      reviewedAt: '2024-01-13',
    }
  ]);

  const handleApprove = (id) => {
    setExpenses(expenses.map(expense => 
      expense.id === id 
        ? { ...expense, status: 'approved', reviewedAt: new Date().toISOString().split('T')[0] }
        : expense
    ));
  };

  const handleReject = (id) => {
    setExpenses(expenses.map(expense => 
      expense.id === id 
        ? { ...expense, status: 'rejected', reviewedAt: new Date().toISOString().split('T')[0] }
        : expense
    ));
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

  const getCategoryBadge = (category) => {
    const variants = {
      billboard: 'primary',
      influencer: 'secondary',
      email: 'success',
      other: 'warning'
    };
    return <Badge variant={variants[category] || 'secondary'}>{category}</Badge>;
  };

  const totalPending = expenses
    .filter(exp => exp.status === 'pending')
    .reduce((sum, exp) => sum + exp.amount, 0);

  const totalApproved = expenses
    .filter(exp => exp.status === 'approved')
    .reduce((sum, exp) => sum + exp.amount, 0);

  const pendingCount = expenses.filter(exp => exp.status === 'pending').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Expense Reports</h2>
        <Badge variant="warning">{pendingCount} Pending</Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Pending Approval</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalPending.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Approved</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalApproved.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Submissions</p>
              <p className="text-2xl font-bold text-gray-900">{expenses.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Expense List */}
      <Card>
        <h3 className="text-lg font-semibold mb-4">Recent Submissions</h3>
        <div className="space-y-4">
          {expenses.map((expense) => (
            <div key={expense.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div>
                    <p className="font-medium text-gray-900">{expense.employeeName}</p>
                    <p className="text-sm text-gray-500">{expense.employeeId}</p>
                  </div>
                  {getCategoryBadge(expense.category)}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-semibold text-gray-900">
                    ₹{expense.amount.toLocaleString()}
                  </span>
                  {getStatusBadge(expense.status)}
                </div>
              </div>

              <p className="text-gray-700 mb-3">{expense.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Submitted: {expense.submittedAt}</span>
                  {expense.reviewedAt && (
                    <span>Reviewed: {expense.reviewedAt}</span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Receipt
                  </Button>
                  {expense.status === 'pending' && (
                    <>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleReject(expense.id)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => handleApprove(expense.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};