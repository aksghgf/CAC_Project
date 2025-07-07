import React, { useState } from 'react';
import { User, Lock, TrendingUp, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

export const LoginPage = ({ userType, onLogin, onBack }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin(userType, credentials);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </button>
          
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-xl font-bold text-gray-900">CAC Optimizer Pro</span>
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
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
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
            <p className="text-sm text-gray-600">
              Demo credentials: admin@demo.com / password123
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};