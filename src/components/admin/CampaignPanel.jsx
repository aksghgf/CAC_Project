import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Badge } from '../ui/Badge';
import { Play, Pause, Settings, Target, Zap, Trash2, Flame, BarChart2, Copy } from 'lucide-react';
import { Modal } from '../ui/Modal';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const ALL_PLATFORMS = [
  { value: 'meta', label: 'Meta' },
  { value: 'google', label: 'Google' },
  { value: 'influencer', label: 'Influencer' },
  { value: 'email', label: 'Email' },
  { value: 'billboard', label: 'Billboard' },
];

// Static influencer list with categories
const INFLUENCERS = [
  { id: 'inf1', name: 'Rohit Finance', category: 'Finance Influencer' },
  { id: 'inf2', name: 'Priya Tech', category: 'Tech Influencer' },
  { id: 'inf3', name: 'Amit Comedy', category: 'Comedy Influencer' },
  { id: 'inf4', name: 'Sana Vlogs', category: 'Vlog Influencer' },
  { id: 'inf5', name: 'Vikram Geopolitics', category: 'Geopolitics' },
  { id: 'inf6', name: 'Neha Jobs', category: 'Job' },
  { id: 'inf7', name: 'Ritu Entertainment', category: 'Entertainment Influencer' },
  { id: 'inf8', name: 'Manish Tech', category: 'Tech Influencer' },
  { id: 'inf9', name: 'Kiran Finance', category: 'Finance Influencer' },
  { id: 'inf10', name: 'Asha Comedy', category: 'Comedy Influencer' },
];

// Group influencers by category for display
const groupInfluencersByCategory = (influencers) => {
  return influencers.reduce((acc, inf) => {
    acc[inf.category] = acc[inf.category] || [];
    acc[inf.category].push(inf);
    return acc;
  }, {});
};

export const CampaignPanel = () => {
  const [campaignForm, setCampaignForm] = useState({
    name: '',
    goal: '',
    budget: '',
    targetAudience: '',
    region: '',
    platforms: ['meta', 'google'], // default selected
    influencers: [], // selected influencer ids
  });
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');
  const [influencers, setInfluencers] = useState(INFLUENCERS);
  const [newInfluencer, setNewInfluencer] = useState({ name: '', category: '' });
  const [addError, setAddError] = useState('');
  const [showInfluencerModal, setShowInfluencerModal] = useState(false);
  const [showUtmLinks, setShowUtmLinks] = useState(false);
  const [lastCreatedCampaign, setLastCreatedCampaign] = useState(null);
  const navigate = useNavigate();

  // Dummy data for charts
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
  const pieColors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#14B8A6', '#F43F5E', '#6366F1'];

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get('/campaigns');
        setCampaigns(res.data);
      } catch (err) {
        setError('Failed to load campaigns');
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  const goalOptions = [
    { value: 'conversions', label: 'Conversions' },
    { value: 'reach', label: 'Reach' },
    { value: 'engagement', label: 'Engagement' },
    { value: 'traffic', label: 'Traffic' }
  ];

  const handlePlatformChange = (platform) => {
    setCampaignForm((prev) => {
      const selected = prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform];
      return { ...prev, platforms: selected };
    });
  };

  const handleInfluencerChange = (id) => {
    setCampaignForm((prev) => {
      const selected = prev.influencers.includes(id)
        ? prev.influencers.filter((infId) => infId !== id)
        : [...prev.influencers, id];
      return { ...prev, influencers: selected };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!campaignForm.name || !campaignForm.goal || !campaignForm.budget || !campaignForm.targetAudience || !campaignForm.region) {
      setFormError('All fields are required.');
      return;
    }
    if (!campaignForm.platforms || campaignForm.platforms.length === 0) {
      setFormError('Select at least one advertising platform.');
      return;
    }
    // If influencer is selected, at least one influencer must be chosen
    if (campaignForm.platforms.includes('influencer') && campaignForm.influencers.length === 0) {
      setFormError('Select at least one influencer.');
      return;
    }
    try {
      const res = await api.post('/campaigns', {
        ...campaignForm,
        budget: parseInt(campaignForm.budget),
      });
      setCampaigns([res.data, ...campaigns]);
      setCampaignForm({
        name: '',
        goal: '',
        budget: '',
        targetAudience: '',
        region: '',
        platforms: ['meta', 'google'],
        influencers: [],
      });
      setLastCreatedCampaign(res.data);
      setShowUtmLinks(true);
    } catch (err) {
      setFormError('Failed to create campaign');
    }
  };

  // Copy to clipboard helper
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const toggleCampaign = (id) => {
    setCampaigns(campaigns.map(campaign => 
      campaign._id === id 
        ? { ...campaign, status: campaign.status === 'active' ? 'paused' : 'active' }
        : campaign
    ));
    // Optionally, send a PATCH/PUT to backend to update status
  };

  const getStatusBadge = (status) => {
    return status === 'active' 
      ? <Badge variant="success">Active</Badge>
      : <Badge variant="warning">Paused</Badge>;
  };

  // Add Influencer
  const handleAddInfluencer = (e) => {
    e.preventDefault();
    setAddError('');
    if (!newInfluencer.name.trim() || !newInfluencer.category.trim()) {
      setAddError('Name and category are required.');
      return;
    }
    // Prevent duplicate name/category
    if (influencers.some(inf => inf.name.toLowerCase() === newInfluencer.name.trim().toLowerCase() && inf.category === newInfluencer.category)) {
      setAddError('Influencer with this name and category already exists.');
      return;
    }
    setInfluencers([
      ...influencers,
      { id: `inf${Date.now()}`, name: newInfluencer.name.trim(), category: newInfluencer.category.trim() }
    ]);
    setNewInfluencer({ name: '', category: '' });
  };

  // Remove Influencer
  const handleRemoveInfluencer = (id) => {
    setInfluencers((prev) => prev.filter((inf) => inf.id !== id));
    setCampaignForm((prev) => ({
      ...prev,
      influencers: prev.influencers.filter((infId) => infId !== id),
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">ML Campaign Panel</h2>
        <Badge variant="primary">
          <Zap className="h-4 w-4 mr-1" />
          AI-Powered
        </Badge>
      </div>

      {/* Campaign Creation Form */}
      <div className="bg-blue-50 rounded-xl p-6 shadow-inner mb-8">
        <h3 className="text-lg font-semibold mb-4">Create New Campaign</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Name and Goal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Campaign Name"
              value={campaignForm.name}
              onChange={(e) => setCampaignForm({...campaignForm, name: e.target.value})}
              placeholder="Enter campaign name"
              required
              className="rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 bg-white border border-gray-200"
            />
            <Select
              label="Campaign Goal"
              value={campaignForm.goal}
              onChange={(e) => setCampaignForm({...campaignForm, goal: e.target.value})}
              options={goalOptions}
              required
              className="rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 bg-white border border-gray-200"
            />
          </div>
          {/* Row 2: Budget and Target Audience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Budget (₹)"
              type="number"
              value={campaignForm.budget}
              onChange={(e) => setCampaignForm({...campaignForm, budget: e.target.value})}
              placeholder="Enter budget"
              required
              className="rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 bg-white border border-gray-200"
            />
            <Input
              label="Target Audience"
              value={campaignForm.targetAudience}
              onChange={(e) => setCampaignForm({...campaignForm, targetAudience: e.target.value})}
              placeholder="Describe your target audience"
              required
              className="rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 bg-white border border-gray-200"
            />
          </div>
          {/* Row 3: Region */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Region"
              value={campaignForm.region}
              onChange={(e) => setCampaignForm({...campaignForm, region: e.target.value})}
              placeholder="Target region"
              required
              className="rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 bg-white border border-gray-200"
            />
            <div></div>
          </div>
          {/* Platform Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Advertising Platforms</label>
            <div className="flex flex-wrap gap-4">
              {ALL_PLATFORMS.map((platform) => (
                <label key={platform.value} className="flex items-center space-x-2 cursor-pointer bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-200 hover:bg-blue-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={campaignForm.platforms.includes(platform.value)}
                    onChange={() => handlePlatformChange(platform.value)}
                    className="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-400"
                  />
                  <span className="text-gray-700 font-medium">{platform.label}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Influencer Section: Only show if 'Influencer' platform is selected */}
          {campaignForm.platforms.includes('influencer') && (
            <>
              {/* Add Influencer Inputs and Button */}
              <div className="flex flex-col md:flex-row gap-4 mt-2 mb-2 items-end">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Influencer Name</label>
                  <input
                    type="text"
                    value={newInfluencer.name}
                    onChange={e => setNewInfluencer({ ...newInfluencer, name: e.target.value })}
                    className="form-input border-gray-300 rounded-lg w-full px-2 py-2 shadow-sm focus:ring-2 focus:ring-blue-400"
                    placeholder="Influencer Name"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
                  <input
                    type="text"
                    value={newInfluencer.category}
                    onChange={e => setNewInfluencer({ ...newInfluencer, category: e.target.value })}
                    className="form-input border-gray-300 rounded-lg w-full px-2 py-2 shadow-sm focus:ring-2 focus:ring-blue-400"
                    placeholder="e.g. Tech Influencer"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddInfluencer}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition-colors flex items-center justify-center"
                  style={{ minWidth: '150px' }}
                >
                  Add Influencer
                </button>
              </div>
              {/* Add Influencer and Track Button (horizontal, equal width, spaced) */}
              <div className="flex flex-col md:flex-row gap-4 mt-2 mb-2">
                <button
                  type="button"
                  onClick={() => navigate('/admin/influencer-analytics')}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-5 py-2 rounded-lg font-semibold shadow hover:from-orange-600 hover:to-pink-600 focus:ring-2 focus:ring-orange-400 transition-colors"
                  style={{ minWidth: '150px' }}
                >
                  <BarChart2 className="h-5 w-5" />
                  Track Influencer Performance
                </button>
              </div>
              {/* Influencer Categories (dummy data, blue card) */}
              <div className="bg-blue-50 rounded-xl p-6 shadow-inner">
                <label className="block text-sm font-medium text-blue-900 mb-4">Influencer Categories</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(groupInfluencersByCategory(influencers)).map(([category, infs]) => (
                    <div key={category} className="bg-white rounded-lg shadow p-4 flex flex-col">
                      <div className="flex items-center font-semibold text-blue-700 mb-2 text-lg border-b pb-1">
                        <Flame className="h-5 w-5 text-orange-500 mr-2 animate-pulse" />
                        {category}
                      </div>
                      <div className="flex-1 space-y-2">
                        {infs.map((inf) => (
                          <div key={inf.id} className="flex items-center space-x-2">
                            <label className="flex items-center space-x-2 cursor-pointer flex-1">
                              <input
                                type="checkbox"
                                checked={campaignForm.influencers.includes(inf.id)}
                                onChange={() => handleInfluencerChange(inf.id)}
                                className="form-checkbox h-4 w-4 text-purple-600"
                              />
                              <span className="text-gray-700">{inf.name}</span>
                            </label>
                            <button
                              type="button"
                              onClick={() => handleRemoveInfluencer(inf.id)}
                              className="text-red-500 hover:text-red-700 p-1"
                              title="Remove influencer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          {/* Row 3: Launch Campaign Button */}
          <Button type="submit" className="w-full mt-2 rounded-lg shadow-lg text-lg font-semibold py-3 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 focus:ring-2 focus:ring-blue-400 transition-colors">
            <Target className="h-5 w-5 mr-2" />
            Launch Campaign with ML Optimization
          </Button>
          {formError && <div className="text-red-600 text-sm">{formError}</div>}
        </form>
      </div>

      {/* UTM Links Section (after campaign creation) */}
      {showUtmLinks && lastCreatedCampaign && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-2">
          <h3 className="text-lg font-semibold text-green-800 mb-4">UTM Links for Tracking</h3>
          {lastCreatedCampaign.influencerLinks && lastCreatedCampaign.influencerLinks.length > 0 && (
            <div className="mb-4">
              <div className="font-medium text-green-700 mb-2">Influencer UTM Links:</div>
              <ul className="space-y-2">
                {lastCreatedCampaign.influencerLinks.map(link => (
                  <li key={link.influencerId} className="flex items-center gap-2">
                    <span className="truncate text-sm text-green-900 font-mono">{link.utmLink}</span>
                    <button
                      onClick={() => handleCopy(link.utmLink)}
                      className="ml-2 text-green-700 hover:text-green-900 p-1"
                      title="Copy UTM link"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <span className="text-xs text-gray-500">({link.influencerName})</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {lastCreatedCampaign.emailUtmLink && (
            <div className="mb-2">
              <div className="font-medium text-green-700 mb-1">Email Campaign UTM Link:</div>
              <div className="flex items-center gap-2">
                <span className="truncate text-sm text-green-900 font-mono">{lastCreatedCampaign.emailUtmLink}</span>
                <button
                  onClick={() => handleCopy(lastCreatedCampaign.emailUtmLink)}
                  className="ml-2 text-green-700 hover:text-green-900 p-1"
                  title="Copy UTM link"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Active Campaigns */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Active Campaigns</h3>
        {loading ? (
          <div className="text-gray-500">Loading campaigns...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : campaigns.length === 0 ? (
          <div className="text-gray-500">No active campaigns yet.</div>
        ) : (
          campaigns.map((campaign) => (
            <Card key={campaign._id} hover>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <h4 className="font-semibold text-lg">{campaign.name}</h4>
                  {getStatusBadge(campaign.status)}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleCampaign(campaign._id)}
                  >
                    {campaign.status === 'active' ? (
                      <>
                        <Pause className="h-4 w-4 mr-1" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-1" />
                        Resume
                      </>
                    )}
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Goal: <span className="font-medium text-gray-900">{campaign.goal}</span></p>
                  <p className="text-sm text-gray-600 mb-1">Budget: <span className="font-medium text-gray-900">₹{campaign.budget}</span></p>
                  <p className="text-sm text-gray-600 mb-1">Platform: <span className="font-medium text-gray-900">{campaign.platform}</span></p>
                  <p className="text-sm text-gray-600 mb-1">Target Audience: <span className="font-medium text-gray-900">{campaign.targetAudience}</span></p>
                  <p className="text-sm text-gray-600 mb-1">Region: <span className="font-medium text-gray-900">{campaign.region}</span></p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">CAC: <span className="font-medium text-gray-900">₹{campaign.cac}</span></p>
                  <p className="text-sm text-gray-600 mb-1">Spend: <span className="font-medium text-gray-900">₹{campaign.spend}</span></p>
                  <p className="text-sm text-gray-600 mb-1">Conversions: <span className="font-medium text-gray-900">{campaign.conversions}</span></p>
                  <p className="text-sm text-gray-600 mb-1">ML Optimizations: <span className="font-medium text-gray-900">{campaign.mlOptimizations?.targeting?.join(', ')}</span></p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}; 