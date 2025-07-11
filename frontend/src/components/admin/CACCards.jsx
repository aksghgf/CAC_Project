import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { TrendingUp, TrendingDown, Minus, Target, Globe, Mail, Users, MapPin } from 'lucide-react';

export const CACCards = () => {
  const cacData = [
    {
      channel: 'Meta',
      cac: 450,
      spend: 125000,
      conversions: 278,
      trend: 'down',
      change: -12,
      icon: Target,
      color: 'bg-blue-500'
    },
    {
      channel: 'Google',
      cac: 520,
      spend: 98000,
      conversions: 189,
      trend: 'up',
      change: 8,
      icon: Globe,
      color: 'bg-green-500'
    },
    {
      channel: 'Billboard',
      cac: 380,
      spend: 75000,
      conversions: 197,
      trend: 'stable',
      change: 0,
      icon: MapPin,
      color: 'bg-orange-500'
    },
    {
      channel: 'Influencer',
      cac: 290,
      spend: 45000,
      conversions: 155,
      trend: 'down',
      change: -5,
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      channel: 'Email',
      cac: 85,
      spend: 12000,
      conversions: 141,
      trend: 'up',
      change: 15,
      icon: Mail,
      color: 'bg-teal-500'
    }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendBadge = (trend, change) => {
    if (trend === 'stable') {
      return <Badge variant="secondary">Stable</Badge>;
    }
    const variant = trend === 'up' ? 'error' : 'success';
    const symbol = trend === 'up' ? '+' : '';
    return <Badge variant={variant}>{symbol}{change}%</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">CAC Performance</h2>
        <Badge variant="primary">Real-time</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {cacData.map((data) => {
          const Icon = data.icon;
          return (
            <Card key={data.channel} hover>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${data.color}`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(data.trend)}
                  {getTrendBadge(data.trend, data.change)}
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">{data.channel}</h3>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">CAC</span>
                    <span className="font-semibold">₹{data.cac}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Spend</span>
                    <span className="font-semibold">₹{data.spend.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Conversions</span>
                    <span className="font-semibold">{data.conversions}</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card>
        <h3 className="text-lg font-semibold mb-4">CAC Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">Best Performing Channel</h4>
            <p className="text-sm text-green-700">
              Email marketing shows the lowest CAC at ₹85 with a 15% improvement trend.
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">ML Recommendation</h4>
            <p className="text-sm text-blue-700">
              Increase email campaign budget by 25% and reduce Google Ads spend by 10%.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}; 