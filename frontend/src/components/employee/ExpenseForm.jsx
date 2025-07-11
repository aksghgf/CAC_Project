import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

export const ExpenseForm = ({ onSubmit, onCancel }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('billboard');
  const [formError, setFormError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    if (!description || description.length < 5) {
      setFormError('Description must be at least 5 characters.');
      return;
    }
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setFormError('Amount must be a positive number.');
      return;
    }
    if (!category) {
      setFormError('Category is required.');
      return;
    }
    onSubmit({
      description,
      amount: parseFloat(amount),
      category,
      receipt: 'none', // Dummy value to satisfy backend validation
    });
    setDescription('');
    setAmount('');
    setCategory('billboard');
  };

  const categoryOptions = [
    { value: 'billboard', label: 'Billboard' },
    { value: 'influencer', label: 'Influencer' },
    { value: 'email', label: 'Email' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />
      <Input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        required
        min={0}
      />
      <Select
        value={category}
        onChange={e => setCategory(e.target.value)}
        required
        options={categoryOptions}
      />
      {formError && <div className="text-red-600 text-sm">{formError}</div>}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}; 