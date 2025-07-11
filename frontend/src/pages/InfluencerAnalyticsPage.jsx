import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line
} from 'recharts';

const dummyCategoryCAC = [
  { category: 'Finance Influencer', cac: 1800 },
  { category: 'Tech Influencer', cac: 2100 },
  { category: 'Comedy Influencer', cac: 1600 },
  { category: 'Vlog Influencer', cac: 2500 },
  { category: 'Geopolitics', cac: 2000 },
  { category: 'Job', cac: 1700 },
  { category: 'Entertainment Influencer', cac: 2200 },
];
const dummyInfluencerCAC = [
  { name: 'Rohit Finance', cac: 1800 },
  { name: 'Priya Tech', cac: 2100 },
  { name: 'Amit Comedy', cac: 1600 },
  { name: 'Sana Vlogs', cac: 2500 },
  { name: 'Vikram Geopolitics', cac: 2000 },
  { name: 'Neha Jobs', cac: 1700 },
  { name: 'Ritu Entertainment', cac: 2200 },
  { name: 'Manish Tech', cac: 2050 },
  { name: 'Kiran Finance', cac: 1850 },
  { name: 'Asha Comedy', cac: 1650 },
];
const pieColors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#14B8A6', '#F43F5E', '#6366F1', '#F472B6', '#FBBF24', '#A3E635'];

// Dummy data for last 12 months CAC for 3 influencers
const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
const dummyInfluencerMonthlyCAC = months.map((month, i) => ({
  month,
  'Rohit Finance': 1800 + Math.round(Math.sin(i) * 100),
  'Priya Tech': 2100 + Math.round(Math.cos(i) * 120),
  'Amit Comedy': 1600 + Math.round(Math.sin(i + 2) * 80),
}));

const InfluencerAnalyticsPage = () => {
  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">Influencer CAC Analytics</h2>
      {/* 1. Category-wise Pie and Bar Charts */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold mb-4 text-blue-700">Category-wise CAC</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pie Chart: CAC Share by Category */}
          <div className="bg-white rounded-lg shadow p-4">
            <h4 className="font-semibold mb-2 text-blue-700">CAC Share by Category (Pie)</h4>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={dummyCategoryCAC}
                  dataKey="cac"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {dummyCategoryCAC.map((entry, idx) => (
                    <Cell key={`cell-cat-${idx}`} fill={pieColors[idx % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Bar Chart: CAC by Category */}
          <div className="bg-white rounded-lg shadow p-4">
            <h4 className="font-semibold mb-2 text-blue-700">CAC by Category (Bar)</h4>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={dummyCategoryCAC}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" fontSize={12} angle={-15} interval={0} height={60} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cac" fill="#f59e42" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* 2. Individual Influencer Pie and Bar Charts */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold mb-4 text-blue-700">Individual Influencer CAC</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pie Chart: CAC Share by Influencer */}
          <div className="bg-white rounded-lg shadow p-4">
            <h4 className="font-semibold mb-2 text-blue-700">CAC Share by Influencer (Pie)</h4>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={dummyInfluencerCAC}
                  dataKey="cac"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {dummyInfluencerCAC.map((entry, idx) => (
                    <Cell key={`cell-inf-${idx}`} fill={pieColors[idx % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Bar Chart: CAC by Influencer */}
          <div className="bg-white rounded-lg shadow p-4">
            <h4 className="font-semibold mb-2 text-blue-700">CAC by Influencer (Bar)</h4>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={dummyInfluencerCAC}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} angle={-15} interval={0} height={60} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cac" fill="#6366F1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* 3. Individual Influencer CAC Performance (12 months) */}
      <div className="bg-white rounded-lg shadow p-4 mt-10">
        <h3 className="font-semibold mb-2 text-blue-700">Influencer CAC Performance (Last 12 Months)</h3>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={dummyInfluencerMonthlyCAC}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" fontSize={13} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Rohit Finance" stroke="#3B82F6" strokeWidth={3} dot={{ r: 5 }} />
            <Line type="monotone" dataKey="Priya Tech" stroke="#F59E0B" strokeWidth={3} dot={{ r: 5 }} />
            <Line type="monotone" dataKey="Amit Comedy" stroke="#10B981" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InfluencerAnalyticsPage; 