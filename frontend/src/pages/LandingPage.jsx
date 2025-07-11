import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Target, Zap, Shield, BarChart3, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import Lottie from 'lottie-react';
import landingAnimation from '../Assets/lf20_49rdyysj.json';

export const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center min-h-[5.5rem] py-3 gap-2 sm:gap-0">
            <div className="flex items-center mb-2 sm:mb-0">
              <TrendingUp className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-lg sm:text-xl font-bold text-gray-900">CAC Optimizer Pro</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:space-x-4 w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto" onClick={() => navigate('/login')}>
                Admin Login
              </Button>
              <Button className="w-full sm:w-auto" onClick={() => navigate('/login')}>
                Employee Login
              </Button>
            </div>
          </div>
        </div>
      </header>
      {/* Spacer to prevent content from being hidden under sticky header */}
      <div className="h-16" />

      {/* Hero Section with Lottie Animation */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 pt-10 pb-10 sm:pt-20 sm:pb-16">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8">
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Run Ads Like an Agency
                <span className="text-blue-600"> - Without One</span>
              </h1>
              <p className="text-base sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto md:mx-0">
                Eliminate agency fees and gain full control over your ad spend with our ML-powered 
                automation platform. Save 15-30% of your budget while achieving better results.
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 sm:space-x-4">
                <Button size="lg" className="w-full sm:w-auto" onClick={() => navigate('/login')}>
                  Start Free Trial
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center md:justify-end mb-6 md:mb-0">
              <Lottie 
                animationData={landingAnimation} 
                loop={true} 
                className="w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 drop-shadow-xl"
                aria-label="Business analytics animation"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
              Why Choose CAC Optimizer Pro?
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Replace expensive agencies with intelligent automation
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card hover padding="lg">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <Zap className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">ML-Powered Automation</h3>
                <p className="text-gray-600">
                  Our AI automatically optimizes targeting, budget allocation, and creative selection 
                  for maximum ROI.
                </p>
              </div>
            </Card>

            <Card hover padding="lg">
              <div className="text-center">
                <div className="bg-teal-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Unified CAC Dashboard</h3>
                <p className="text-gray-600">
                  Track customer acquisition costs across Meta, Google, billboards, 
                  influencers, and email campaigns in one place.
                </p>
              </div>
            </Card>

            <Card hover padding="lg">
              <div className="text-center">
                <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <Target className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Real-Time Optimization</h3>
                <p className="text-gray-600">
                  Campaigns are continuously optimized based on performance data, 
                  ensuring maximum efficiency.
                </p>
              </div>
            </Card>

            <Card hover padding="lg">
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Full Control & Transparency</h3>
                <p className="text-gray-600">
                  Maintain complete visibility and control over your campaigns 
                  without agency dependency.
                </p>
              </div>
            </Card>

            <Card hover padding="lg">
              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">CSM Support</h3>
                <p className="text-gray-600">
                  Get human support when needed through our Campaign Success Manager 
                  without full agency costs.
                </p>
              </div>
            </Card>

            <Card hover padding="lg">
              <div className="text-center">
                <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Billboard Attribution</h3>
                <p className="text-gray-600">
                  Track offline billboard conversions using geo-location technology 
                  for complete attribution.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-600 py-10 sm:py-20">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-4">
            Ready to Replace Your Agency?
          </h2>
          <p className="text-base sm:text-xl text-blue-100 mb-6 sm:mb-8">
            Join thousands of businesses saving money while improving their ad performance
          </p>
          <Button size="lg" variant="secondary" className="w-full sm:w-auto" onClick={() => navigate('/login')}>
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
            <div className="flex items-center mb-2 sm:mb-0">
              <TrendingUp className="h-8 w-8 text-blue-400 mr-2" />
              <span className="text-lg sm:text-xl font-bold">CAC Optimizer Pro</span>
            </div>
            <p className="text-gray-400 text-center sm:text-left">
              © 2024 CAC Optimizer Pro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;