import React from 'react';
import { Card } from '../ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export const PerformanceCharts = () => {
  const cacTrendData = [
    { month: 'Jan', meta: 520, google: 480, billboard: 390, influencer: 320, email: 95 },
    { month: 'Feb', meta: 490, google: 510, billboard: 380, influencer: 310, email: 88 },
    { month: 'Mar', meta: 470, google: 520, billboard: 385, influencer: 295, email: 82 },
    { month: 'Apr', meta: 450, google: 520, billboard: 380, influencer: 290, email: 85 },
  ];

  const spendData = [
    { channel: 'Meta', spend: 125000, conversions: 278 },
    { channel: 'Google', spend: 98000, conversions: 189 },
    { channel: 'Billboard', spend: 75000, conversions: 197 },
    { channel: 'Influencer', spend: 45000, conversions: 155 },
    { channel: 'Email', spend: 12000, conversions: 141 },
  ];

  const conversionData = [
    { name: 'Meta', value: 278, color: '#3B82F6' },
    { name: 'Google', value: 189, color: '#10B981' },
    { name: 'Billboard', value: 197, color: '#F59E0B' },
    { name: 'Influencer', value: 155, color: '#8B5CF6' },
    { name: 'Email', value: 141, color: '#14B8A6' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Performance Analytics</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CAC Trend Chart */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">CAC Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cacTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="meta" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="google" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="billboard" stroke="#F59E0B" strokeWidth={2} />
              <Line type="monotone" dataKey="influencer" stroke="#8B5CF6" strokeWidth={2} />
              <Line type="monotone" dataKey="email" stroke="#14B8A6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Spend vs Conversions */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Spend vs Conversions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={spendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="channel" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="spend" fill="#3B82F6" />
              <Bar dataKey="conversions" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Conversion Distribution */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Conversion Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={conversionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {conversionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Spend</span>
              <span className="font-semibold text-lg">₹3,55,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Conversions</span>
              <span className="font-semibold text-lg">960</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average CAC</span>
              <span className="font-semibold text-lg">₹370</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Best Performing Channel</span>
              <span className="font-semibold text-lg text-green-600">Email</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">ROI</span>
              <span className="font-semibold text-lg text-green-600">2.4x</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Billboard Heatmap Placeholder */}
      <Card>
        <h3 className="text-lg font-semibold mb-4">Billboard Conversion Heatmap</h3>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Interactive billboard conversion map will be displayed here</p>
        </div>
      </Card>
    </div>
  );
};