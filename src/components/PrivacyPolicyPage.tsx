import React from 'react';
import { X, Menu, Shield, Mail, Globe } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onToggleSidebar: () => void;
  onBack: () => void;
}

const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onToggleSidebar, onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900 py-8">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-slate-900/95 backdrop-blur-sm border-b border-indigo-500/20">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 text-slate-300 hover:text-white transition-colors duration-200"
          >
            <Menu size={24} />
          </button>
        </div>
        <h1 className="text-lg font-bold gradient-text-primary">Privacy Policy</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-2 text-slate-300 hover:text-white transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button for Desktop */}
        <button
          onClick={onBack}
          className="hidden lg:flex items-center gap-2 text-slate-300 hover:text-indigo-400 transition-colors duration-200 mb-8"
        >
          ← Back
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Privacy <span className="gradient-text-primary">Policy</span>
          </h1>
          <p className="text-slate-300 text-lg">
            Your privacy and data security are our top priorities
          </p>
        </div>

        {/* Privacy Policy Content */}
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-slate-700/50 space-y-8">
          {/* Effective Date */}
          <div className="text-center border-b border-slate-700 pb-6">
            <p className="text-slate-400">
              <strong>Effective Date:</strong> Aug 24, 2025<br />
              <strong>Last Updated:</strong> Sept 01, 2025
            </p>
          </div>

          {/* Introduction */}
          <div>
            <p className="text-slate-300 leading-relaxed">
              Nutriloom AI ("we," "our," or "us") values your trust. This Privacy Policy explains how we collect, use, and protect your information when you use our website{' '}
              <button 
                onClick={() => window.location.href = 'https://nutriloomai.com'}
                className="text-indigo-400 hover:text-indigo-300 underline cursor-pointer"
              >
                nutriloomai.com
              </button>{' '}
              and related services (the "Services").
            </p>
          </div>

          {/* Section 1 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
            <p className="text-slate-300 mb-4">We may collect the following types of information:</p>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-indigo-400 mb-2">a. Personal Information</h3>
                <ul className="text-slate-300 space-y-1 ml-4">
                  <li>• Name, email address, and account login details (if you create an account).</li>
                  <li>• Subscription and payment details (for Pro plan users).</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-indigo-400 mb-2">b. Usage Data</h3>
                <ul className="text-slate-300 space-y-1 ml-4">
                  <li>• Preferences (dietary restrictions, taste profiles, skill level).</li>
                  <li>• Recipes you generate or save.</li>
                  <li>• Device information, browser type, IP address, and usage analytics.</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-indigo-400 mb-2">c. Content You Provide</h3>
                <ul className="text-slate-300 space-y-1 ml-4">
                  <li>• Ingredients you input or upload through "Scan Your Dish."</li>
                  <li>• Any feedback, reviews, or communications with our team.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
            <p className="text-slate-300 mb-4">We use your information to:</p>
            <ul className="text-slate-300 space-y-2 ml-4">
              <li>• Generate personalized recipes and recommendations.</li>
              <li>• Improve and optimize our AI models.</li>
              <li>• Provide step-by-step cooking guidance.</li>
              <li>• Manage subscriptions and process payments.</li>
              <li>• Prevent misuse and ensure secure use of our Services.</li>
              <li>• Send updates, promotions, or newsletters (with your consent).</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">3. Sharing of Information</h2>
            <p className="text-slate-300 mb-4">We do not sell your data. We may share limited information only with:</p>
            <ul className="text-slate-300 space-y-2 ml-4">
              <li>• <strong>Service Providers:</strong> For hosting, payment processing, and analytics.</li>
              <li>• <strong>Legal Compliance:</strong> If required by law or to protect the rights and safety of our users.</li>
              <li>• <strong>Business Transfers:</strong> If Nutriloom AI is merged, acquired, or sold.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
            <p className="text-slate-300">
              We use enterprise-grade security to protect your information. While we take strong precautions, no system is 100% secure. We encourage you to use strong passwords and keep your account safe.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">5. Data Retention</h2>
            <ul className="text-slate-300 space-y-2 ml-4">
              <li>• We retain your information only as long as needed for the purposes described in this Policy.</li>
              <li>• You may request deletion of your data by contacting us at{' '}
                <a href="mailto:nutriloomai@gmail.com" className="text-indigo-400 hover:text-indigo-300 underline">
                  nutriloomai@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
            <p className="text-slate-300 mb-4">Depending on your location, you may have rights to:</p>
            <ul className="text-slate-300 space-y-2 ml-4">
              <li>• Access, correct, or delete your personal data.</li>
              <li>• Object to or restrict processing.</li>
              <li>• Withdraw consent to marketing communications.</li>
              <li>• Port your data to another service.</li>
            </ul>
            <p className="text-slate-300 mt-4">
              To exercise these rights, contact us at{' '}
              <a href="mailto:nutriloomai@gmail.com" className="text-indigo-400 hover:text-indigo-300 underline">
                nutriloomai@gmail.com
              </a>
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">7. Cookies & Tracking</h2>
            <p className="text-slate-300 mb-4">We may use cookies and similar technologies to:</p>
            <ul className="text-slate-300 space-y-2 ml-4">
              <li>• Save your preferences and recipe history.</li>
              <li>• Analyze website performance and improve services.</li>
              <li>• Show personalized recommendations.</li>
            </ul>
            <p className="text-slate-300 mt-4">
              You can control cookies through your browser settings.
            </p>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">8. Children's Privacy</h2>
            <p className="text-slate-300">
              Nutriloom AI is not intended for children under 13. We do not knowingly collect data from children. If you believe a child has provided data, please contact us to remove it.
            </p>
          </div>

          {/* Section 9 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">9. Third-Party Links</h2>
            <p className="text-slate-300">
              Our Services may contain links to third-party sites. We are not responsible for their privacy practices and encourage you to review their policies.
            </p>
          </div>

          {/* Section 10 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">10. Changes to This Policy</h2>
            <p className="text-slate-300">
              We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised "Last Updated" date.
            </p>
          </div>

          {/* Section 11 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">11. Contact Us</h2>
            <p className="text-slate-300 mb-4">
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-indigo-400" />
                <a href="mailto:nutriloomai@gmail.com" className="text-indigo-400 hover:text-indigo-300 underline">
                  nutriloomai@gmail.com
                </a>
                <span className="text-slate-400">/</span>
                <a href="mailto:devdontaplah@gmail.com" className="text-indigo-400 hover:text-indigo-300 underline">
                  devdontaplah@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={16} className="text-indigo-400" />
                <button 
                  onClick={() => window.location.href = 'https://nutriloomai.com'}
                  className="text-indigo-400 hover:text-indigo-300 underline cursor-pointer"
                >
                  nutriloomai.com
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;