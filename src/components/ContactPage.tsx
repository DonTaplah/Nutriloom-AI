import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Menu } from 'lucide-react';
import NAP from './SEO/NAP';
import LocalSEOHead from './SEO/LocalSEOHead';
import { businessInfo } from './SEO/NAP';

interface ContactPageProps {
  onToggleSidebar: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onToggleSidebar }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <>
      <LocalSEOHead
        title="Contact Nutriloom AI - San Francisco AI Recipe Generation"
        description="Contact Nutriloom AI for AI-powered recipe generation services in San Francisco. Get support, ask questions, or learn more about our personalized nutrition solutions."
        keywords={[
          "contact Nutriloom AI San Francisco",
          "AI recipe support Bay Area",
          "nutrition consultation SF",
          "recipe generation help",
          "meal planning support California"
        ]}
        canonicalUrl="https://nutriloomai.com/contact"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-slate-900/95 backdrop-blur-sm border-b border-indigo-500/20">
          <button
            onClick={onToggleSidebar}
            className="p-2 text-slate-300 hover:text-white transition-colors duration-200"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-bold gradient-text-primary">Contact Us</h1>
          <div className="w-10"></div>
        </div>

        <div className="container mx-auto px-4 py-8 lg:py-16">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/20 border border-indigo-500/30 rounded-full mb-6">
              <MapPin size={16} className="text-indigo-400" />
              <span className="text-indigo-300 text-sm font-medium">San Francisco, CA</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 hidden lg:block">
              <span className="gradient-text-primary">Get in Touch</span><br />
              <span className="text-white">with </span><span className="gradient-text-secondary">Nutriloom AI</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Have questions about our AI recipe generation? Need support with your account? 
              We're here to help you create amazing meals in the San Francisco Bay Area and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-indigo-500/30">
              <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
              
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                  <p className="text-slate-300">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="">Select a topic</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="billing">Billing & Subscriptions</option>
                      <option value="feature">Feature Request</option>
                      <option value="partnership">Business Partnership</option>
                      <option value="press">Press & Media</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending Message...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <Send size={18} />
                        Send Message
                      </div>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Business Info */}
              <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-indigo-500/30">
                <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                <NAP variant="contact" showIcons={true} />
              </div>

              {/* Business Hours */}
              <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={20} className="text-indigo-400" />
                  <h3 className="text-xl font-bold text-white">Service Hours</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">AI Recipe Generation</span>
                    <span className="text-green-400 font-medium">24/7</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Customer Support</span>
                    <span className="text-slate-400">Mon-Fri 9AM-6PM PST</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Emergency Support</span>
                    <span className="text-slate-400">24/7 (Pro users)</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                <h3 className="text-xl font-bold text-white mb-4">Quick Help</h3>
                <div className="space-y-3">
                  <a 
                    href="mailto:support@nutriloomai.com?subject=Technical Support"
                    className="block p-3 bg-slate-700/50 rounded-lg hover:bg-slate-600/50 transition-colors"
                  >
                    <div className="font-medium text-white">Technical Support</div>
                    <div className="text-slate-400 text-sm">Get help with app features</div>
                  </a>
                  <a 
                    href="mailto:billing@nutriloomai.com?subject=Billing Question"
                    className="block p-3 bg-slate-700/50 rounded-lg hover:bg-slate-600/50 transition-colors"
                  >
                    <div className="font-medium text-white">Billing Support</div>
                    <div className="text-slate-400 text-sm">Questions about subscriptions</div>
                  </a>
                  <a 
                    href="mailto:partnerships@nutriloomai.com?subject=Partnership Inquiry"
                    className="block p-3 bg-slate-700/50 rounded-lg hover:bg-slate-600/50 transition-colors"
                  >
                    <div className="font-medium text-white">Business Partnerships</div>
                    <div className="text-slate-400 text-sm">Collaboration opportunities</div>
                  </a>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-red-400 mb-3">Emergency Support</h3>
                <p className="text-red-300 text-sm mb-3">
                  For urgent technical issues affecting Pro subscribers:
                </p>
                <a 
                  href="tel:+1-555-NUTRI-911"
                  className="flex items-center gap-2 text-red-400 hover:text-red-300 font-medium"
                >
                  <Phone size={16} />
                  +1-555-NUTRI-911
                </a>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12 lg:mt-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                <h3 className="font-semibold text-white mb-3">Do you serve the entire Bay Area?</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Yes! While we're based in San Francisco, our AI recipe generation service 
                  is available 24/7 to users throughout the Bay Area and beyond.
                </p>
              </div>
              
              <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                <h3 className="font-semibold text-white mb-3">How quickly do you respond to support requests?</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  We typically respond within 4-6 hours during business hours (9AM-6PM PST). 
                  Pro users receive priority support with faster response times.
                </p>
              </div>
              
              <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                <h3 className="font-semibold text-white mb-3">Can I schedule a demo or consultation?</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Absolutely! Contact us to schedule a personalized demo of our AI recipe 
                  generation platform. Perfect for restaurants, meal planning services, or bulk users.
                </p>
              </div>
              
              <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                <h3 className="font-semibold text-white mb-3">Do you offer local delivery or in-person services?</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  We're a digital AI platform, but we partner with local SF meal kit services 
                  and personal chefs who can bring our AI-generated recipes to your kitchen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;