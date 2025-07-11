import React, { useState, useEffect } from 'react';
import { EmployeeHeader } from '../components/employee/EmployeeHeader';
import { EmployeeStats } from '../components/employee/EmployeeStats';
import { EmployeeExpenseHistory } from '../components/employee/EmployeeExpenseHistory';
import { EmployeeMain } from '../components/employee/EmployeeMain';
import { Modal } from '../components/ui/Modal';
import { ExpenseForm } from '../components/employee/ExpenseForm';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import Lottie from 'lottie-react';
import dashboardEmpty from '../Assets/dashboard-empty.json';
import api from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

export const EmployeeDashboard = () => {
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { logout } = useAuth();

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

  const handleSubmitExpense = async (expenseData) => {
    setError('');
    try {
      const res = await api.post('/expenses', expenseData);
      setExpenses([res.data, ...expenses]);
      setShowExpenseForm(false);
    } catch (err) {
      setError('Failed to submit expense');
    }
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
        return <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-800">Approved</span>;
      case 'rejected':
        return <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-red-100 text-red-800">Rejected</span>;
      default:
        return <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-yellow-100 text-yellow-800">Pending</span>;
    }
  };

  const totalSpent = expenses
    .filter(exp => exp.status === 'approved')
    .reduce((sum, exp) => sum + exp.amount, 0);

  const pendingAmount = expenses
    .filter(exp => exp.status === 'pending')
    .reduce((sum, exp) => sum + exp.amount, 0);

  const rejectedAmount = expenses
    .filter(exp => exp.status === 'rejected')
    .reduce((sum, exp) => sum + exp.amount, 0);

  const hasExpenses = expenses.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <EmployeeHeader onShowExpenseForm={() => setShowExpenseForm(true)} onLogout={logout} />
      {/* Creative Dashboard Header */}
      <div className="flex items-center gap-4 px-8 py-6 bg-gradient-to-r from-purple-600 to-blue-500 shadow-md rounded-b-3xl">
        <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=employee`} alt="Employee Avatar" className="w-16 h-16 rounded-full border-4 border-white shadow" />
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Welcome, Employee!</h1>
          <p className="text-purple-100">Track your expenses and submissions below.</p>
        </div>
      </div>
      <EmployeeMain>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <span className="text-lg text-gray-500">Loading expenses...</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16">
            <span className="text-lg text-red-500">{error}</span>
          </div>
        ) : hasExpenses ? (
          <>
            <EmployeeStats
              totalSpent={totalSpent}
              pendingAmount={pendingAmount}
              totalSubmissions={expenses.length}
            />
            <EmployeeExpenseHistory
              expenses={expenses}
              getStatusIcon={getStatusIcon}
              onShowExpenseForm={() => setShowExpenseForm(true)}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <Lottie animationData={dashboardEmpty} className="w-64 h-64 mb-4" loop={true} />
            <h3 className="text-xl font-semibold mb-2 text-gray-700">No Expenses Yet</h3>
            <p className="text-gray-500 mb-4">Submit your first expense to see it here!</p>
          </div>
        )}
      </EmployeeMain>
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

export default EmployeeDashboard;