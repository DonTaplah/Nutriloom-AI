import React from 'react';
import { Helmet } from 'react-helmet-async';
import { businessInfo } from './NAP';

interface LocalSEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  location?: string;
}

const LocalSEOHead: React.FC<LocalSEOHeadProps> = ({
  title = "Nutriloom AI - AI-Powered Recipe Generation in San Francisco",
  description = "Create personalized, nutritious recipes with AI technology. Serving San Francisco Bay Area with advanced recipe generation, meal planning, and nutritional analysis.",
  keywords = [
    "AI recipe generator San Francisco",
    "personalized recipes Bay Area",
    "nutrition meal planning California",
    "AI cooking assistant SF",
    "healthy recipe creator",
    "meal planning app San Francisco",
    "nutritional analysis tool",
    "custom recipe generation"
  ],
  canonicalUrl = "https://nutriloomai.com",
  ogImage = "https://nutriloomai.com/modern%20ai.png",
  location = "San Francisco, CA"
}) => {
  const fullTitle = `${title} | ${businessInfo.name}`;
  const fullDescription = `${description} Located in ${location}. Contact us at ${businessInfo.phone}.`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={keywords.join(', ')} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Local SEO Meta Tags */}
      <meta name="geo.region" content="US-CA" />
      <meta name="geo.placename" content="San Francisco" />
      <meta name="geo.position" content="37.7749;-122.4194" />
      <meta name="ICBM" content="37.7749, -122.4194" />
      <meta name="DC.title" content={fullTitle} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={businessInfo.name} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@NutriloomAI" />

      {/* Business Contact Info */}
      <meta name="contact" content={businessInfo.email} />
      <meta name="author" content={businessInfo.name} />
      <meta name="reply-to" content={businessInfo.email} />

      {/* Local Business Markup */}
      <meta name="business:contact_data:street_address" content={businessInfo.address.street} />
      <meta name="business:contact_data:locality" content={businessInfo.address.city} />
      <meta name="business:contact_data:region" content={businessInfo.address.state} />
      <meta name="business:contact_data:postal_code" content={businessInfo.address.zip} />
      <meta name="business:contact_data:country_name" content={businessInfo.address.country} />
      <meta name="business:contact_data:phone_number" content={businessInfo.phone} />
      <meta name="business:contact_data:email" content={businessInfo.email} />
    </Helmet>
  );
};

export default LocalSEOHead;