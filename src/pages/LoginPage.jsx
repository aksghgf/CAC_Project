import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Lock, TrendingUp, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { useAuth } from '../contexts/AuthContext';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, user, logout } = useAuth();
  const [userType, setUserType] = useState('admin');
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Debug: log user on every render
  useEffect(() => {
    console.log('LoginPage user:', user);
  }, [user]);

  // After login, redirect only when user is set
  useEffect(() => {
    if (loginSuccess && user) {
      if (user.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else if (user.role === 'employee') {
        navigate('/employee/dashboard', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [loginSuccess, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await login(credentials);

      if (result.success) {
        setIsLoading(false);
        setLoginSuccess(true); // trigger redirect in effect
      } else {
        setIsLoading(false);
        alert(result.error || 'Login failed');
      }
    } catch (error) {
      setIsLoading(false);
      alert(error.message || 'Login failed');
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </button>
          
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-xl font-bold text-gray-900">CAC Optimizer Pro</span>
          </div>
          
          <div className="flex justify-center space-x-4 mb-4">
            <button
              onClick={() => setUserType('admin')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                userType === 'admin'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => setUserType('employee')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                userType === 'employee'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Employee
            </button>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {userType === 'admin' ? 'Admin' : 'Employee'} Login
          </h2>
          <p className="text-gray-600">
            {userType === 'admin' 
              ? 'Access your dashboard to manage campaigns and optimize CAC'
              : 'Submit expense reports and track your submissions'
            }
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              icon={<User size={20} />}
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, email: e.target.value.trim().toLowerCase()})}
              placeholder="Enter your email"
              required
            />

            <Input
              label="Password"
              type="password"
              icon={<Lock size={20} />}
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              placeholder="Enter your password"
              required
            />

            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            
            <Button variant="link" onClick={() => navigate('/register')}>
              Don't have an account? Register
            </Button>
            <p>
              <a href="/forgot-password">Forgot Password?</a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;