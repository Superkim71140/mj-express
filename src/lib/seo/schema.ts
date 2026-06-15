import { siteConfig } from "./site-config";
import { ServiceItem } from "@/data/seo/services";
import { LocalArea } from "@/data/seo/areas";
import { RouteItem } from "@/data/seo/routes";

// Organization Schema
export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org" as const,
    "@type": "Organization" as const,
    "@id": `${siteConfig.baseUrl}/#organization`,
    "name": siteConfig.businessName,
    "url": siteConfig.baseUrl,
    "logo": `${siteConfig.baseUrl}/assets/images/best.webp`,
    "contactPoint": {
      "@type": "ContactPoint" as const,
      "telephone": siteConfig.phone,
      "contactType": "customer service",
      "areaServed": "TH",
      "availableLanguage": ["Thai", "English"]
    },
    "sameAs": [
      siteConfig.facebookUrl,
      siteConfig.lineUrl
    ]
  };
}

// Moving Company Schema (Extended LocalBusiness)
export function buildMovingCompanySchema(areaServed: string[] = siteConfig.serviceAreas) {
  return {
    "@context": "https://schema.org" as const,
    "@type": "MovingCompany" as const,
    "@id": `${siteConfig.baseUrl}/#moving-company`,
    "name": siteConfig.businessFullName,
    "image": `${siteConfig.baseUrl}/assets/images/work4.webp`,
    "url": siteConfig.baseUrl,
    "telephone": siteConfig.phone,
    "priceRange": siteConfig.priceRange,
    "address": {
      "@type": "PostalAddress" as const,
      "streetAddress": siteConfig.address.streetAddress,
      "addressLocality": siteConfig.address.addressLocality,
      "addressRegion": siteConfig.address.addressRegion,
      "postalCode": siteConfig.address.postalCode,
      "addressCountry": siteConfig.address.addressCountry,
    },
    "geo": {
      "@type": "GeoCoordinates" as const,
      "latitude": siteConfig.geo.latitude,
      "longitude": siteConfig.geo.longitude,
    },
    "areaServed": areaServed,
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification" as const,
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      siteConfig.facebookUrl,
      siteConfig.lineUrl
    ],
    "description": "MJ-TH Express บริการรถรับจ้างขนของ ย้ายบ้าน ย้ายหอ ขนส่งสินค้า ด้วยรถกระบะตู้ทึบ 4 ล้อ พิกัดบางแค กรุงเทพฯ และทั่วไทย"
  };
}

// LocalBusiness Schema for specific areas
export function buildLocalBusinessSchema(area: LocalArea) {
  return {
    "@context": "https://schema.org" as const,
    "@type": "LocalBusiness" as const,
    "@id": `${siteConfig.baseUrl}/areas/${area.slug}#local-business`,
    "name": `รถรับจ้าง${area.areaThai} - MJ-TH Express`,
    "image": `${siteConfig.baseUrl}${area.ogImage}`,
    "telephone": siteConfig.phone,
    "priceRange": siteConfig.priceRange,
    "address": {
      "@type": "PostalAddress" as const,
      "addressLocality": area.addressLocality || area.areaThai,
      "addressRegion": area.addressRegion || "Bangkok",
      "addressCountry": "TH"
    },
    "areaServed": area.areaServed || [area.areaThai],
    "url": `${siteConfig.baseUrl}/areas/${area.slug}`,
    "description": area.description
  };
}

// Service Schema
export function buildServiceSchema(service: ServiceItem) {
  // CRITICAL REQUIREMENT: Consolidation of ranking signals for Motorcycle Transport
  const canonicalPath = service.slug === "motorcycle-transport" 
    ? "/motorcycle-transport" 
    : `/services/${service.slug}`;

  return {
    "@context": "https://schema.org" as const,
    "@type": "Service" as const,
    "@id": `${siteConfig.baseUrl}${canonicalPath}#service`,
    "name": service.serviceNameThai,
    "description": service.description,
    "provider": {
      "@id": `${siteConfig.baseUrl}/#moving-company`
    },
    "serviceType": "Transportation",
    "areaServed": service.serviceAreas
  };
}

// FAQ Schema
export function buildFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org" as const,
    "@type": "FAQPage" as const,
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question" as const,
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer" as const,
        "text": faq.answer.replace(/\*\*/g, "").replace(/\*/g, "")
      }
    }))
  };
}

// Breadcrumb Schema
export function buildBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org" as const,
    "@type": "BreadcrumbList" as const,
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem" as const,
      "position": index + 1,
      "name": item.name,
      "item": item.item.startsWith("http") ? item.item : `${siteConfig.baseUrl}${item.item}`
    }))
  };
}

// ItemList Schema
export function buildItemListSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org" as const,
    "@type": "ItemList" as const,
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem" as const,
      "position": index + 1,
      "name": item.name,
      "url": item.url.startsWith("http") ? item.url : `${siteConfig.baseUrl}${item.url}`
    }))
  };
}

// Route Service Schema
export function buildRouteServiceSchema(route: RouteItem) {
  return {
    "@context": "https://schema.org" as const,
    "@type": "Service" as const,
    "@id": `${siteConfig.baseUrl}/routes/${route.slug}#service`,
    "name": route.h1,
    "description": route.description,
    "provider": {
      "@id": `${siteConfig.baseUrl}/#moving-company`
    },
    "serviceType": "Long Distance Transport",
    "areaServed": [
      {
        "@type": "AdministrativeArea" as const,
        "name": route.origin
      },
      {
        "@type": "AdministrativeArea" as const,
        "name": route.destination
      }
    ]
  };
}

// Review Schema
export function buildReviewSchema(reviews: { author: string; reviewBody: string; ratingValue: number; datePublished: string }[]) {
  return {
    "@context": "https://schema.org" as const,
    "@type": "ItemList" as const,
    "name": "Customer Reviews",
    "itemListElement": reviews.map((rev, index) => ({
      "@type": "Review" as const,
      "position": index + 1,
      "author": {
        "@type": "Person" as const,
        "name": rev.author
      },
      "reviewRating": {
        "@type": "Rating" as const,
        "ratingValue": rev.ratingValue,
        "bestRating": "5"
      },
      "reviewBody": rev.reviewBody,
      "datePublished": rev.datePublished
    }))
  };
}

// Keep legacy mapping/alias naming for safety
export const generateMovingCompanySchema = buildMovingCompanySchema;
export const getMovingCompanySchema = buildMovingCompanySchema;
export const generateFAQSchema = buildFAQSchema;
export const getFAQSchema = buildFAQSchema;
export const generateBreadcrumbSchema = buildBreadcrumbSchema;
export const getBreadcrumbSchema = buildBreadcrumbSchema;
export const generateServiceSchema = (name: string, description: string, path: string, serviceType: string) => {
  return {
    "@context": "https://schema.org" as const,
    "@type": "Service" as const,
    "@id": `${siteConfig.baseUrl}${path}#service`,
    "name": name,
    "description": description,
    "provider": {
      "@id": `${siteConfig.baseUrl}/#moving-company`
    },
    "serviceType": serviceType,
    "areaServed": siteConfig.serviceAreas
  };
};
export const getServiceSchema = generateServiceSchema;
