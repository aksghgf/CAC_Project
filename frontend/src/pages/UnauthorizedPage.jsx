import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <Card>
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Shield className="h-16 w-16 text-red-500" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Access Denied
            </h1>
            
            <p className="text-gray-600 mb-8">
              You don't have permission to access this page. Please contact your administrator if you believe this is an error.
            </p>
            
            <div className="space-y-4">
              <Button 
                onClick={() => navigate('/')}
                className="w-full"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              
              <Button 
                variant="ghost"
                onClick={() => navigate('/login')}
                className="w-full"
              >
                Try Different Account
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}; 