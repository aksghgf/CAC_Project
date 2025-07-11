import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { CheckCircle, XCircle, Eye, Clock, DollarSign } from 'lucide-react';
import api from '../../utils/api';

export const ExpenseManager = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get('/expenses');
        setExpenses(res.data);
      } catch (err) {
        setError('Failed to load expenses');
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, []);

  // Debug logging
  useEffect(() => {
    console.log('ExpenseManager:', { expenses, error, loading });
  }, [expenses, error, loading]);

  const handleApprove = async (id) => {
    try {
      const res = await api.put(`/expenses/${id}/status`, { status: 'approved' });
      setExpenses(expenses.map(expense => 
        expense._id === id ? res.data : expense
      ));
    } catch (err) {
      alert('Failed to approve expense');
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await api.put(`/expenses/${id}/status`, { status: 'rejected' });
      setExpenses(expenses.map(expense => 
        expense._id === id ? res.data : expense
      ));
    } catch (err) {
      alert('Failed to reject expense');
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
        {loading ? (
          <div className="py-8 text-center text-gray-500">Loading...</div>
        ) : error ? (
          <div className="py-8 text-center text-red-500">{error}</div>
        ) : expenses.length === 0 ? (
          <div className="py-8 text-center text-gray-500">No expenses found for this business.</div>
        ) : (
        <div className="space-y-4">
          {expenses.map((expense) => (
            <div key={expense._id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div>
                    <p className="font-medium text-gray-900">{expense.employeeName || (typeof expense.employeeId === 'object' ? expense.employeeId?.name : '')}</p>
                    <p className="text-sm text-gray-500">
                      {typeof expense.employeeId === 'object'
                        ? `${expense.employeeId?.email || ''} (${expense.employeeId?._id || ''})`
                        : (expense.employeeId || expense.employee_id || '')}
                    </p>
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
                  <span>Submitted: {new Date(expense.submittedAt).toLocaleDateString()}</span>
                  {expense.reviewedAt && (
                    <span>Reviewed: {new Date(expense.reviewedAt).toLocaleDateString()}</span>
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
                        onClick={() => handleReject(expense._id)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => handleApprove(expense._id)}
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
        )}
      </Card>
    </div>
  );
}; 