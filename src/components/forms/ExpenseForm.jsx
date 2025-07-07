import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Upload } from 'lucide-react';

export const ExpenseForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    receipt: null
  });

  const categoryOptions = [
    { value: '', label: 'Select Category' },
    { value: 'billboard', label: 'Billboard' },
    { value: 'influencer', label: 'Influencer' },
    { value: 'email', label: 'Email Marketing' },
    { value: 'other', label: 'Other' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      amount: parseInt(formData.amount),
      receipt: formData.receipt ? formData.receipt.name : 'receipt.pdf'
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, receipt: file });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        placeholder="Describe the expense"
        required
      />

      <Input
        label="Amount (₹)"
        type="number"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        placeholder="Enter amount"
        required
      />

      <Select
        label="Category"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        options={categoryOptions}
        required
      />

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Receipt</label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <Upload className="h-4 w-4 mr-2" />
            Choose File
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden"
              required
            />
          </label>
          {formData.receipt && (
            <span className="text-sm text-gray-600">{formData.receipt.name}</span>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Submit Expense
        </Button>
      </div>
    </form>
  );
};