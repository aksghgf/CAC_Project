import React, { useState } from 'react';

const initialState = {
  conversion_rate: '',
  revenue: '',
  channel_email: false,
  channel_paid: false,
  channel_referral: false,
  channel_social: false,
};

const channelMap = {
  'email marketing': 'channel_email marketing',
  'paid advertising': 'channel_paid advertising',
  'referral': 'channel_referral',
  'social media': 'channel_social media',
};

export default function LaunchCampaignML() {
  const [form, setForm] = useState(initialState);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    // Prepare data for API
    const data = {
      conversion_rate: parseFloat(form.conversion_rate),
      revenue: parseFloat(form.revenue),
      'channel_email marketing': form.channel_email ? 1 : 0,
      'channel_paid advertising': form.channel_paid ? 1 : 0,
      'channel_referral': form.channel_referral ? 1 : 0,
      'channel_social media': form.channel_social ? 1 : 0,
    };
    try {
      const res = await fetch('http://localhost:5001/optimize-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      setResult(json.predicted_cac);
    } catch (err) {
      setError('Failed to get prediction from ML backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Launch Campaign with ML Optimization</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Conversion Rate</label>
          <input type="number" step="any" name="conversion_rate" value={form.conversion_rate} onChange={handleChange} className="border p-2 w-full" required />
        </div>
        <div>
          <label className="block font-medium">Revenue</label>
          <input type="number" step="any" name="revenue" value={form.revenue} onChange={handleChange} className="border p-2 w-full" required />
        </div>
        <div>
          <label className="block font-medium mb-1">Channel</label>
          <div className="flex flex-col gap-1">
            <label><input type="checkbox" name="channel_email" checked={form.channel_email} onChange={handleChange} /> Email Marketing</label>
            <label><input type="checkbox" name="channel_paid" checked={form.channel_paid} onChange={handleChange} /> Paid Advertising</label>
            <label><input type="checkbox" name="channel_referral" checked={form.channel_referral} onChange={handleChange} /> Referral</label>
            <label><input type="checkbox" name="channel_social" checked={form.channel_social} onChange={handleChange} /> Social Media</label>
          </div>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>{loading ? 'Optimizing...' : 'Launch Campaign with ML Optimization'}</button>
      </form>
      {result !== null && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">Predicted CAC: <b>{result.toFixed(2)}</b></div>
      )}
      {error && <div className="mt-4 p-3 bg-red-100 text-red-800 rounded">{error}</div>}
    </div>
  );
} 