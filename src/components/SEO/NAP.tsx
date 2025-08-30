import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

interface NAPProps {
  variant?: 'header' | 'footer' | 'contact' | 'inline';
  showIcons?: boolean;
  className?: string;
}

export const businessInfo = {
  name: "Nutriloom AI",
  address: {
    street: "123 Innovation Drive",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
    country: "United States"
  },
  phone: "+1-555-NUTRI-AI",
  email: "nutriloomai@gmail.com",
  website: "https://nutriloomai.com"
};

const NAP: React.FC<NAPProps> = ({ 
  variant = 'footer', 
  showIcons = true, 
  className = '' 
}) => {
  const formatAddress = () => {
    const { street, city, state, zip } = businessInfo.address;
    return `${street}, ${city}, ${state} ${zip}`;
  };

  const formatPhone = () => {
    return businessInfo.phone;
  };

  const baseClasses = {
    header: 'text-sm text-slate-300',
    footer: 'text-sm text-slate-400',
    contact: 'text-base text-slate-300',
    inline: 'text-sm text-slate-600'
  };

  const iconClasses = {
    header: 'text-slate-400',
    footer: 'text-slate-500',
    contact: 'text-indigo-400',
    inline: 'text-slate-500'
  };

  if (variant === 'header') {
    return (
      <div className={`flex flex-wrap items-center gap-4 ${className}`}>
        <div className="flex items-center gap-2">
          {showIcons && <MapPin size={16} className={iconClasses[variant]} />}
          <span className={baseClasses[variant]}>{formatAddress()}</span>
        </div>
        <div className="flex items-center gap-2">
          {showIcons && <Phone size={16} className={iconClasses[variant]} />}
          <a 
            href={`tel:${businessInfo.phone}`}
            className={`${baseClasses[variant]} hover:text-indigo-400 transition-colors`}
          >
            {formatPhone()}
          </a>
        </div>
      </div>
    );
  }

  if (variant === 'contact') {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex items-start gap-3">
          {showIcons && <MapPin size={20} className={iconClasses[variant]} />}
          <div>
            <h4 className="font-semibold text-white mb-1">Address</h4>
            <address className={`${baseClasses[variant]} not-italic leading-relaxed`}>
              {businessInfo.address.street}<br />
              {businessInfo.address.city}, {businessInfo.address.state} {businessInfo.address.zip}<br />
              {businessInfo.address.country}
            </address>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {showIcons && <Phone size={20} className={iconClasses[variant]} />}
          <div>
            <h4 className="font-semibold text-white mb-1">Phone</h4>
            <a 
              href={`tel:${businessInfo.phone}`}
              className={`${baseClasses[variant]} hover:text-indigo-300 transition-colors`}
            >
              {formatPhone()}
            </a>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {showIcons && <Mail size={20} className={iconClasses[variant]} />}
          <div>
            <h4 className="font-semibold text-white mb-1">Email</h4>
            <a 
              href={`mailto:${businessInfo.email}`}
              className={`${baseClasses[variant]} hover:text-indigo-300 transition-colors`}
            >
              {businessInfo.email}
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <span className={`${baseClasses[variant]} ${className}`}>
        {businessInfo.name} • {formatAddress()} • {formatPhone()}
      </span>
    );
  }

  // Default footer variant
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center gap-2">
        {showIcons && <MapPin size={16} className={iconClasses[variant]} />}
        <address className={`${baseClasses[variant]} not-italic`}>
          {formatAddress()}
        </address>
      </div>
      <div className="flex items-center gap-2">
        {showIcons && <Phone size={16} className={iconClasses[variant]} />}
        <a 
          href={`tel:${businessInfo.phone}`}
          className={`${baseClasses[variant]} hover:text-slate-300 transition-colors`}
        >
          {formatPhone()}
        </a>
      </div>
      <div className="flex items-center gap-2">
        {showIcons && <Mail size={16} className={iconClasses[variant]} />}
        <a 
          href={`mailto:${businessInfo.email}`}
          className={`${baseClasses[variant]} hover:text-slate-300 transition-colors`}
        >
          {businessInfo.email}
        </a>
      </div>
    </div>
  );
};

export default NAP;