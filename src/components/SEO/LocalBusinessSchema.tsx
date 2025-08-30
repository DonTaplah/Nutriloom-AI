import React from 'react';

interface LocalBusinessSchemaProps {
  businessName?: string;
  description?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  phone?: string;
  email?: string;
  website?: string;
  openingHours?: string[];
  priceRange?: string;
  image?: string;
  logo?: string;
  socialProfiles?: string[];
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}

const LocalBusinessSchema: React.FC<LocalBusinessSchemaProps> = ({
  businessName = "Nutriloom AI",
  description = "AI-powered recipe generation platform that creates personalized, nutritious recipes tailored to your ingredients and dietary preferences.",
  address = {
    streetAddress: "123 Innovation Drive",
    addressLocality: "San Francisco",
    addressRegion: "CA",
    postalCode: "94105",
    addressCountry: "US"
  },
  phone = "+1-555-NUTRI-AI",
  email = "nutriloomai@gmail.com",
  website = "https://nutriloomai.com",
  openingHours = [
    "Mo-Su 00:00-23:59"
  ],
  priceRange = "Free-$4.99",
  image = "https://nutriloomai.com/modern%20ai.png",
  logo = "https://nutriloomai.com/An_AI_chef_with_a_spoon_and_a_fork_in_the_background-removebg-preview.png",
  socialProfiles = [
    "https://www.instagram.com/nutriloomai",
    "https://x.com/NutriloomAI"
  ],
  aggregateRating = {
    ratingValue: 4.2,
    reviewCount: 1247
  }
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": website,
    "name": businessName,
    "description": description,
    "url": website,
    "logo": logo,
    "image": [image],
    "telephone": phone,
    "email": email,
    "priceRange": priceRange,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address.streetAddress,
      "addressLocality": address.addressLocality,
      "addressRegion": address.addressRegion,
      "postalCode": address.postalCode,
      "addressCountry": address.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "37.7749",
      "longitude": "-122.4194"
    },
    "openingHoursSpecification": openingHours.map(hours => ({
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": hours.split(' ')[0].split('-').length > 1 
        ? ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        : [hours.split(' ')[0]],
      "opens": hours.split(' ')[1].split('-')[0],
      "closes": hours.split(' ')[1].split('-')[1]
    })),
    "sameAs": socialProfiles,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": aggregateRating.ratingValue,
      "reviewCount": aggregateRating.reviewCount,
      "bestRating": "5",
      "worstRating": "1"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Free Recipe Generation",
        "description": "5 AI-generated recipes per month",
        "price": "0",
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer",
        "name": "Pro Recipe Generation",
        "description": "Unlimited AI-generated recipes with advanced features",
        "price": "4.99",
        "priceCurrency": "USD",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "4.99",
          "priceCurrency": "USD",
          "unitText": "MONTH"
        }
      }
    ],
    "serviceType": "AI Recipe Generation Service",
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Recipe Generation Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Recipe Generation",
            "description": "Personalized recipe creation using artificial intelligence"
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData, null, 2) }}
    />
  );
};

export default LocalBusinessSchema;