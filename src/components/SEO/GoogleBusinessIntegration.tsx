import React from 'react';

interface GoogleBusinessIntegrationProps {
  businessId?: string;
  showReviews?: boolean;
  showPhotos?: boolean;
  className?: string;
}

const GoogleBusinessIntegration: React.FC<GoogleBusinessIntegrationProps> = ({
  businessId = "nutriloom-ai-sf", // Replace with actual Google Business Profile ID
  showReviews = true,
  showPhotos = true,
  className = ''
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Google Business Profile Integration Instructions */}
      <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
        <h3 className="text-xl font-bold text-white mb-4">Google Business Profile Setup</h3>
        <div className="space-y-4 text-sm text-slate-300">
          <div>
            <h4 className="font-semibold text-indigo-400 mb-2">1. Claim Your Business</h4>
            <p>Visit <a href="https://business.google.com" className="text-indigo-400 hover:text-indigo-300">business.google.com</a> and claim your Nutriloom AI listing</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-indigo-400 mb-2">2. Complete Your Profile</h4>
            <ul className="list-disc list-inside space-y-1 text-slate-400">
              <li>Add business description: "AI-powered recipe generation platform"</li>
              <li>Upload high-quality photos of the app interface</li>
              <li>Set business category: "Software Company" or "Technology Service"</li>
              <li>Add business hours: 24/7 (digital service)</li>
              <li>Include website URL: https://nutriloomai.com</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-indigo-400 mb-2">3. Optimize for Local SEO</h4>
            <ul className="list-disc list-inside space-y-1 text-slate-400">
              <li>Use location-specific keywords in description</li>
              <li>Encourage customer reviews</li>
              <li>Post regular updates about new features</li>
              <li>Add Q&A responses</li>
              <li>Upload product photos and videos</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Review Integration Widget Placeholder */}
      {showReviews && (
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-xl font-bold text-white mb-4">Customer Reviews</h3>
          <div className="space-y-4">
            {/* Mock reviews - replace with actual Google Reviews API integration */}
            <div className="border-l-4 border-indigo-500 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <span className="text-slate-400 text-sm">2 days ago</span>
              </div>
              <p className="text-slate-300 text-sm mb-2">
                "Amazing AI recipe generator! Perfect for my busy SF lifestyle. 
                The recipes are creative and use ingredients I can find locally."
              </p>
              <div className="text-slate-400 text-xs">- Sarah M., Mission District</div>
            </div>
            
            <div className="border-l-4 border-indigo-500 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <span className="text-slate-400 text-sm">1 week ago</span>
              </div>
              <p className="text-slate-300 text-sm mb-2">
                "Love how it incorporates local Bay Area ingredients and flavors. 
                The AI really understands our food culture here!"
              </p>
              <div className="text-slate-400 text-xs">- David L., SOMA</div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-slate-700">
            <a 
              href="https://business.google.com/reviews" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 text-sm"
            >
              View all reviews on Google →
            </a>
          </div>
        </div>
      )}

      {/* Google Posts Integration */}
      <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
        <h3 className="text-xl font-bold text-white mb-4">Latest Updates</h3>
        <div className="space-y-4">
          <div className="bg-slate-700/50 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">New Feature: SYD - Scan Your Dish</h4>
            <p className="text-slate-300 text-sm mb-2">
              Now available for Pro users in San Francisco! Upload photos of your meals 
              for instant nutritional analysis and ingredient identification.
            </p>
            <div className="text-slate-400 text-xs">Posted 3 days ago</div>
          </div>
          
          <div className="bg-slate-700/50 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">Bay Area Farmers Market Integration</h4>
            <p className="text-slate-300 text-sm mb-2">
              Our AI now recognizes seasonal ingredients from local SF farmers markets 
              to create fresh, locally-sourced recipe suggestions.
            </p>
            <div className="text-slate-400 text-xs">Posted 1 week ago</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleBusinessIntegration;