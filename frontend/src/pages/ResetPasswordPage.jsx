import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

export default function ResetPasswordPage() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    try {
      const res = await api.post('/auth/reset-password', { token, password });
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Error resetting password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-blue-200">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-center text-purple-700">Reset your password</h2>
        <p className="mb-6 text-center text-gray-600">Enter your new password below to reset your account password.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            disabled={loading}
          />
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded transition duration-150 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
        {message && <div className="mt-4 text-green-600 text-center font-medium">{message}</div>}
        {error && <div className="mt-4 text-red-600 text-center font-medium">{error}</div>}
        <div className="mt-6 text-center">
          <a href="/login" className="text-purple-600 hover:underline">Back to Login</a>
        </div>
      </div>
    </div>
  );
} 