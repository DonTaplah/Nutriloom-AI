import React from 'react';
import { Check, Star, Zap } from 'lucide-react';

interface PricingPageProps {
  onSelectPlan: (plan: string) => void;
  currentPlan?: string;
}

export default function PricingPage({ onSelectPlan, currentPlan }: PricingPageProps) {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying out Nutriloom AI',
      features: [
        '5 recipe generations per month',
        'Basic nutritional analysis',
        'Standard recipe suggestions',
        'Community support'
      ],
      buttonText: 'Get Started',
      popular: false,
      color: 'slate'
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: 'per month',
      description: 'Best for home cooks and food enthusiasts',
      features: [
        'Unlimited recipe generations',
        'Advanced nutritional analysis',
        'Personalized meal planning',
        'Dietary restriction support',
        'Priority support',
        'Export recipes to PDF'
      ],
      buttonText: 'Start Free Trial',
      popular: true,
      color: 'indigo'
    },
    {
      name: 'Premium',
      price: '$19.99',
      period: 'per month',
      description: 'For professional chefs and nutritionists',
      features: [
        'Everything in Pro',
        'Bulk recipe generation',
        'Advanced meal planning',
        'Nutritionist consultation',
        'White-label options',
        'API access',
        'Custom integrations'
      ],
      buttonText: 'Contact Sales',
      popular: false,
      color: 'blue'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Unlock the full potential of AI-powered nutrition and recipe generation
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? 'border-indigo-500/50 shadow-2xl shadow-indigo-500/20'
                  : 'border-slate-600/50 hover:border-indigo-500/30'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-slate-400 ml-2">/{plan.period}</span>
                </div>
                <p className="text-slate-300">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-indigo-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onSelectPlan(plan.name.toLowerCase())}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 shadow-lg'
                    : currentPlan === plan.name.toLowerCase()
                    ? 'bg-slate-600 text-slate-300 cursor-not-allowed'
                    : 'bg-slate-700 text-white hover:bg-slate-600 border border-slate-600'
                }`}
                disabled={currentPlan === plan.name.toLowerCase()}
              >
                {currentPlan === plan.name.toLowerCase() ? 'Current Plan' : plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-indigo-500/30 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-indigo-400 mr-3" />
              <h3 className="text-2xl font-bold text-white">Enterprise Solutions</h3>
            </div>
            <p className="text-slate-300 mb-6">
              Need a custom solution for your organization? We offer enterprise-grade features,
              dedicated support, and custom integrations.
            </p>
            <button
              onClick={() => onSelectPlan('enterprise')}
              className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-blue-700 transition-all"
            >
              Contact Sales
            </button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-400 text-sm">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </div>
  );
}