import React from 'react';
import { Card } from '../ui/Card';
import { CheckCircle, Clock, FileText } from 'lucide-react';

export const EmployeeStats = ({ totalSpent, pendingAmount, totalSubmissions }) => (
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
          <p className="text-2xl font-bold text-gray-900">{totalSubmissions}</p>
        </div>
      </div>
    </Card>
  </div>
); 