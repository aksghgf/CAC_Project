import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Badge } from '../ui/Badge';
import { Play, Pause, Settings, Target, Zap } from 'lucide-react';

export const CampaignPanel = () => {
  const [campaignForm, setCampaignForm] = useState({
    name: '',
    goal: '',
    budget: '',
    targetAudience: '',
    region: '',
    platform: 'both'
  });

  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Summer Sale Campaign',
      goal: 'conversions',
      budget: 50000,
      platform: 'both',
      status: 'active',
      cac: 420,
      spend: 12500,
      conversions: 30,
      mlOptimizations: {
        targeting: ['25-35 age group', 'High-income households'],
        budgetSplit: { meta: 60, google: 40 },
        suggestedCreatives: ['Video ads', 'Carousel ads']
      }
    },
    {
      id: 2,
      name: 'Brand Awareness Drive',
      goal: 'reach',
      budget: 30000,
      platform: 'meta',
      status: 'paused',
      cac: 380,
      spend: 8500,
      conversions: 22,
      mlOptimizations: {
        targeting: ['18-24 age group', 'Urban areas'],
        budgetSplit: { meta: 100, google: 0 },
        suggestedCreatives: ['Image ads', 'Story ads']
      }
    }
  ]);

  const goalOptions = [
    { value: 'conversions', label: 'Conversions' },
    { value: 'reach', label: 'Reach' },
    { value: 'engagement', label: 'Engagement' },
    { value: 'traffic', label: 'Traffic' }
  ];

  const platformOptions = [
    { value: 'meta', label: 'Meta Only' },
    { value: 'google', label: 'Google Only' },
    { value: 'both', label: 'Both Platforms' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCampaign = {
      id: campaigns.length + 1,
      ...campaignForm,
      budget: parseInt(campaignForm.budget),
      status: 'active',
      cac: Math.floor(Math.random() * 200) + 300,
      spend: 0,
      conversions: 0,
      mlOptimizations: {
        targeting: ['ML-optimized targeting'],
        budgetSplit: { meta: 55, google: 45 },
        suggestedCreatives: ['AI-generated creatives']
      }
    };
    setCampaigns([newCampaign, ...campaigns]);
    setCampaignForm({
      name: '',
      goal: '',
      budget: '',
      targetAudience: '',
      region: '',
      platform: 'both'
    });
  };

  const toggleCampaign = (id) => {
    setCampaigns(campaigns.map(campaign => 
      campaign.id === id 
        ? { ...campaign, status: campaign.status === 'active' ? 'paused' : 'active' }
        : campaign
    ));
  };

  const getStatusBadge = (status) => {
    return status === 'active' 
      ? <Badge variant="success">Active</Badge>
      : <Badge variant="warning">Paused</Badge>;
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
      <Card>
        <h3 className="text-lg font-semibold mb-4">Create New Campaign</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Campaign Name"
              value={campaignForm.name}
              onChange={(e) => setCampaignForm({...campaignForm, name: e.target.value})}
              placeholder="Enter campaign name"
              required
            />
            <Select
              label="Campaign Goal"
              value={campaignForm.goal}
              onChange={(e) => setCampaignForm({...campaignForm, goal: e.target.value})}
              options={goalOptions}
              required
            />
            <Input
              label="Budget (₹)"
              type="number"
              value={campaignForm.budget}
              onChange={(e) => setCampaignForm({...campaignForm, budget: e.target.value})}
              placeholder="Enter budget"
              required
            />
            <Select
              label="Platform"
              value={campaignForm.platform}
              onChange={(e) => setCampaignForm({...campaignForm, platform: e.target.value})}
              options={platformOptions}
              required
            />
            <Input
              label="Target Audience"
              value={campaignForm.targetAudience}
              onChange={(e) => setCampaignForm({...campaignForm, targetAudience: e.target.value})}
              placeholder="Describe your target audience"
              required
            />
            <Input
              label="Region"
              value={campaignForm.region}
              onChange={(e) => setCampaignForm({...campaignForm, region: e.target.value})}
              placeholder="Target region"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            <Target className="h-4 w-4 mr-2" />
            Launch Campaign with ML Optimization
          </Button>
        </form>
      </Card>

      {/* Active Campaigns */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Active Campaigns</h3>
        {campaigns.map((campaign) => (
          <Card key={campaign.id} hover>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <h4 className="font-semibold text-lg">{campaign.name}</h4>
                {getStatusBadge(campaign.status)}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleCampaign(campaign.id)}
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
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Budget</p>
                <p className="font-semibold">₹{campaign.budget.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">CAC</p>
                <p className="font-semibold">₹{campaign.cac}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Spend</p>
                <p className="font-semibold">₹{campaign.spend.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Conversions</p>
                <p className="font-semibold">{campaign.conversions}</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-medium text-blue-800 mb-2">ML Optimizations</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium text-blue-700">Targeting</p>
                  <ul className="text-blue-600">
                    {campaign.mlOptimizations.targeting.map((target, idx) => (
                      <li key={idx}>• {target}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-blue-700">Budget Split</p>
                  <p className="text-blue-600">
                    Meta: {campaign.mlOptimizations.budgetSplit.meta}% | 
                    Google: {campaign.mlOptimizations.budgetSplit.google}%
                  </p>
                </div>
                <div>
                  <p className="font-medium text-blue-700">Creatives</p>
                  <ul className="text-blue-600">
                    {campaign.mlOptimizations.suggestedCreatives.map((creative, idx) => (
                      <li key={idx}>• {creative}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};