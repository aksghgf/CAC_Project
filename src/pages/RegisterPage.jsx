import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('admin');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    businessName: '',
    businessId: ''
  });
  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userType === 'employee') {
      fetch('/api/auth/businesses')
        .then(res => res.json())
        .then(data => setBusinesses(data));
    }
  }, [userType]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let endpoint = '';
      let body = {};
      if (userType === 'admin') {
        endpoint = '/api/auth/register-admin';
        body = {
          name: form.name,
          email: form.email,
          password: form.password,
          businessName: form.businessName
        };
      } else {
        endpoint = '/api/auth/register-employee';
        body = {
          name: form.name,
          email: form.email,
          password: form.password,
          businessId: form.businessId
        };
      }
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      let data = {};
      try {
        data = await res.json();
      } catch (err) {
        // If response is not JSON, data stays as empty object
      }
      setIsLoading(false);
      if (res.ok) {
        // success logic
      } else {
        alert(data.message || 'Registration failed');
      }

    } catch (error) {
      setIsLoading(false);
      alert(error.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <div className="flex justify-center space-x-4 mb-4">
            <button
              onClick={() => setUserType('admin')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                userType === 'admin'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Register as Admin
            </button>
            <button
              onClick={() => setUserType('employee')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                userType === 'employee'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Register as Employee
            </button>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {userType === 'admin' ? 'Admin Registration' : 'Employee Registration'}
          </h2>
        </div>
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value.trim().toLowerCase()})}
              placeholder="Enter your email"
              required
            />
            <Input
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            {userType === 'admin' ? (
              <Input
                label="Business Name"
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                placeholder="Enter your business name"
                required
              />
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Business</label>
                <select
                  name="businessId"
                  value={form.businessId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                >
                  <option value="">-- Select Business --</option>
                  {businesses.map((b) => (
                    <option key={b._id} value={b._id}>{b.name}</option>
                  ))}
                </select>
              </div>
            )}
            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </Card>
        <div className="mt-6 text-center">
          <Button variant="link" onClick={() => navigate('/login')}>
            Already have an account? Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 