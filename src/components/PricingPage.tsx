import React from 'react';
import { Check, Star, Zap, Crown, ChefHat } from 'lucide-react';

interface PricingPageProps {
  onSelectPlan: (plan: 'free' | 'pro') => void;
  currentPlan: 'free' | 'pro';
}

const PricingPage: React.FC<PricingPageProps> = ({ onSelectPlan, currentPlan }) => {
  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started with AI cooking',
      icon: <ChefHat size={32} className="text-emerald-500" />,
      features: [
        'Up to 5 recipes per day',
        'Basic ingredient matching',
        'Beginner skill level recipes',
        'Standard nutrition info',
        'Basic cuisine filters',
        'Recipe saving (up to 10)',
        'Community support'
      ],
      limitations: [
        'Limited daily generations',
        'No advanced techniques',
        'Basic ingredient database'
      ],
      buttonText: currentPlan === 'free' ? 'Current Plan' : 'Get Started',
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$9.99',
      period: 'per month',
      description: 'Unlock the full power of AI cooking mastery',
      icon: <Crown size={32} className="text-amber-500" />,
      features: [
        'Unlimited recipe generations',
        'Advanced ingredient matching',
        'All skill levels (Beginner, Pro, Legendary)',
        'Detailed nutrition breakdown',
        'All cuisine types & dietary filters',
        'Unlimited recipe saving',
        'Photo ingredient recognition',
        'Meal planning & grocery lists',
        'Advanced cooking techniques',
        'Restaurant-quality presentations',
        'Priority customer support',
        'Early access to new features'
      ],
      limitations: [],
      buttonText: currentPlan === 'pro' ? 'Current Plan' : 'Upgrade to Pro',
      popular: true
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center items-center mb-6">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-full p-4">
            <Star size={48} className="text-white" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-white mb-4">
          Choose Your Culinary Journey
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          From kitchen novice to master chef - we have the perfect plan to elevate your cooking game
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-slate-800 rounded-2xl shadow-xl border-2 transition-all duration-300 hover:scale-[1.02] ${
              plan.popular
                ? 'border-amber-500 shadow-amber-500/20'
                : 'border-slate-700 hover:border-orange-400'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                  <Zap size={16} />
                  Most Popular
                </div>
              </div>
            )}

            <div className="p-8">
              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-slate-400 ml-2">/{plan.period}</span>
                </div>
                <p className="text-slate-300">{plan.description}</p>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4">What's included:</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check size={20} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectPlan(plan.id as 'free' | 'pro')}
                disabled={currentPlan === plan.id}
                className={`w-full py-4 rounded-xl text-lg font-semibold transition-all duration-200 ${
                  currentPlan === plan.id
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                    : plan.popular
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                {plan.buttonText}
              </button>

              {plan.id === 'pro' && currentPlan !== 'pro' && (
                <p className="text-center text-slate-400 text-sm mt-4">
                  Cancel anytime • 7-day money-back guarantee
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              What makes Legendary recipes special?
            </h3>
            <p className="text-slate-300 text-sm">
              Legendary recipes include advanced culinary techniques, molecular gastronomy, 
              professional plating, and restaurant-quality presentations that transform 
              your kitchen into a fine dining experience.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Can I change plans anytime?
            </h3>
            <p className="text-slate-300 text-sm">
              Yes! You can upgrade or downgrade your plan at any time. Changes take effect 
              immediately, and we'll prorate any billing differences.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              How does photo recognition work?
            </h3>
            <p className="text-slate-300 text-sm">
              Our AI analyzes photos of your ingredients and automatically identifies them, 
              adding them to your ingredient list for instant recipe generation.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Is there a free trial for Pro?
            </h3>
            <p className="text-slate-300 text-sm">
              New users get 3 free Legendary recipe generations to experience the Pro features. 
              Plus, we offer a 7-day money-back guarantee on all Pro subscriptions.
            </p>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="mt-12 text-center">
        <p className="text-slate-400 mb-6">Trusted by thousands of home chefs worldwide</p>
        <div className="flex justify-center items-center space-x-8 text-slate-500">
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-amber-400 fill-current" />
              ))}
            </div>
            <span className="text-sm">4.9/5 rating</span>
          </div>
          <div className="text-sm">
            <span className="text-2xl font-bold text-orange-400">50K+</span>
            <br />recipes created
          </div>
          <div className="text-sm">
            <span className="text-2xl font-bold text-orange-400">10K+</span>
            <br />active users
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;