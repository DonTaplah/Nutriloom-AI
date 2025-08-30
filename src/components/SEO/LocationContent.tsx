import React from 'react';
import { MapPin, Users, Star, TrendingUp } from 'lucide-react';
import { businessInfo } from './NAP';

interface LocationContentProps {
  showStats?: boolean;
  showTestimonials?: boolean;
  className?: string;
}

const LocationContent: React.FC<LocationContentProps> = ({
  showStats = true,
  showTestimonials = true,
  className = ''
}) => {
  const localStats = [
    { label: 'Bay Area Users', value: '25K+', icon: Users },
    { label: 'SF Restaurants Inspired', value: '150+', icon: Star },
    { label: 'Local Recipe Variations', value: '5K+', icon: TrendingUp }
  ];

  const localTestimonials = [
    {
      name: "Maria Rodriguez",
      location: "Mission District, SF",
      rating: 5,
      text: "As a busy mom in the Mission, Nutriloom AI helps me create healthy meals for my family using ingredients from our local farmers market. The AI understands our diverse food culture!"
    },
    {
      name: "David Chen",
      location: "Chinatown, SF",
      rating: 5,
      text: "Living in Chinatown, I love how the AI incorporates both traditional Asian ingredients and modern California cuisine. Perfect for our multicultural neighborhood!"
    },
    {
      name: "Jennifer Thompson",
      location: "SOMA, SF",
      rating: 5,
      text: "Working in SOMA's tech scene, I needed quick, healthy meals. Nutriloom AI creates amazing recipes that fit my busy lifestyle and dietary preferences."
    }
  ];

  return (
    <div className={`space-y-12 lg:space-y-16 ${className}`}>
      {/* Local Hero Section */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/20 border border-indigo-500/30 rounded-full mb-6">
          <MapPin size={16} className="text-indigo-400" />
          <span className="text-indigo-300 text-sm font-medium">Serving San Francisco Bay Area</span>
        </div>
        
        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
          <span className="gradient-text-primary">AI-Powered Recipes</span><br />
          <span className="text-white">for </span><span className="gradient-text-secondary">San Francisco</span>
        </h2>
        
        <p className="text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          From the Mission's vibrant food scene to Chinatown's authentic flavors, 
          our AI creates recipes that celebrate San Francisco's diverse culinary landscape. 
          Perfect for busy professionals, families, and food enthusiasts across the Bay Area.
        </p>
      </div>

      {/* Local Stats */}
      {showStats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {localStats.map((stat, index) => (
            <div key={index} className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 text-center">
              <div className="w-12 h-12 bg-indigo-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon size={24} className="text-indigo-400" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Local Service Areas */}
      <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-slate-700/50">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          Serving the Greater San Francisco Bay Area
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            'San Francisco', 'Oakland', 'San Jose', 'Berkeley',
            'Palo Alto', 'Mountain View', 'Fremont', 'Hayward',
            'Sunnyvale', 'Santa Clara', 'Daly City', 'Richmond'
          ].map((city, index) => (
            <div key={index} className="p-3 bg-slate-700/50 rounded-lg">
              <span className="text-slate-300 text-sm font-medium">{city}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            Can't find your city? We serve the entire Bay Area! 
            <a href={`mailto:${businessInfo.email}`} className="text-indigo-400 hover:text-indigo-300 ml-1">
              Contact us
            </a>
          </p>
        </div>
      </div>

      {/* Local Testimonials */}
      {showTestimonials && (
        <div>
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            What Bay Area Food Lovers Say
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {localTestimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  "{testimonial.text}"
                </p>
                
                <div className="border-t border-slate-700 pt-4">
                  <div className="font-semibold text-white text-sm">{testimonial.name}</div>
                  <div className="text-slate-400 text-xs flex items-center gap-1">
                    <MapPin size={12} />
                    {testimonial.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Local Business Hours */}
      <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
        <h3 className="text-xl font-bold text-white mb-4 text-center">Service Hours</h3>
        <div className="text-center">
          <div className="inline-block bg-green-500/20 border border-green-500/30 rounded-lg px-4 py-2">
            <span className="text-green-300 font-medium">24/7 AI Recipe Generation</span>
          </div>
          <p className="text-slate-400 text-sm mt-2">
            Our AI is always available to create personalized recipes for you
          </p>
        </div>
      </div>

      {/* Local Keywords Integration */}
      <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
        <h3 className="text-xl font-bold text-white mb-4">
          Perfect for San Francisco Lifestyle
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-indigo-400 mb-3">Tech Professionals</h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              Quick, healthy recipes for busy SOMA and Financial District workers. 
              Generate nutritious meals that fit your demanding schedule.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-indigo-400 mb-3">Families</h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              Family-friendly recipes perfect for Richmond, Sunset, and Mission families. 
              Create meals that kids love while maintaining nutritional value.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-indigo-400 mb-3">Food Enthusiasts</h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              Explore diverse cuisines reflecting SF's multicultural food scene. 
              From Chinatown to Little Italy, create authentic flavors at home.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-indigo-400 mb-3">Health-Conscious</h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              Perfect for Marina and Pacific Heights health enthusiasts. 
              Generate recipes that align with your wellness goals and dietary preferences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationContent;