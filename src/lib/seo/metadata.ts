import type { Metadata } from "next";
import { siteConfig } from "./site-config";
import { ServiceItem } from "@/data/seo/services";
import { LocalArea } from "@/data/seo/areas";
import { RouteItem } from "@/data/seo/routes";
import { CaseStudyItem } from "@/data/seo/case-studies";

interface PageMetadataOptions {
  title: string;
  description: string;
  keywords?: string[];
  canonicalPath: string;
  ogImage?: string;
  ogImageAlt?: string;
  noIndex?: boolean;
}

export function buildPageMetadata(options: PageMetadataOptions): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonicalPath,
    ogImage = siteConfig.defaultOgImage,
    ogImageAlt = title,
    noIndex = false,
  } = options;

  // Normalise paths to ensure clean canonical routing
  const absoluteCanonicalUrl = `${siteConfig.baseUrl}${canonicalPath.startsWith("/") ? "" : "/"}${canonicalPath}`;

  return {
    metadataBase: new URL(siteConfig.baseUrl),
    title: title,
    description: description,
    keywords: keywords.length > 0 ? keywords : siteConfig.keywords,
    alternates: {
      canonical: absoluteCanonicalUrl,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      }
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: absoluteCanonicalUrl,
      title: title,
      description: description,
      siteName: siteConfig.businessName,
      images: [
        {
          url: ogImage.startsWith("http") ? ogImage : `${siteConfig.baseUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [ogImage.startsWith("http") ? ogImage : `${siteConfig.baseUrl}${ogImage}`],
    },
  };
}

export function buildServiceMetadata(service: ServiceItem): Metadata {
  // CRITICAL REQUIREMENT: Consolidation of ranking signals for Motorcycle Transport
  // Point /services/motorcycle-transport to /motorcycle-transport
  const canonicalPath = service.slug === "motorcycle-transport" 
    ? "/motorcycle-transport" 
    : `/services/${service.slug}`;

  return buildPageMetadata({
    title: service.title,
    description: service.description,
    keywords: [service.primaryKeyword, ...service.secondaryKeywords],
    canonicalPath: canonicalPath,
    ogImage: service.ogImage,
    ogImageAlt: service.title
  });
}

export function buildAreaMetadata(area: LocalArea): Metadata {
  return buildPageMetadata({
    title: area.title,
    description: area.description,
    keywords: area.keywords,
    canonicalPath: `/areas/${area.slug}`,
    ogImage: area.ogImage,
    ogImageAlt: area.title
  });
}

export function buildRouteMetadata(route: RouteItem): Metadata {
  return buildPageMetadata({
    title: route.title,
    description: route.description,
    keywords: [route.primaryKeyword, ...route.secondaryKeywords],
    canonicalPath: `/routes/${route.slug}`,
    ogImage: "/assets/images/best.webp", // Default or fallback image
    ogImageAlt: route.title
  });
}

export function buildCaseStudyMetadata(caseStudy: CaseStudyItem): Metadata {
  return buildPageMetadata({
    title: `${caseStudy.title} | ผลงานจาก MJ-TH Express`,
    description: `รีวิวงานจริง: ${caseStudy.description}. บริการขนของย้ายบ้าน ส่งมอเตอร์ไซค์ ทั่วไทย มั่นใจความปลอดภัย`,
    keywords: [caseStudy.jobType, caseStudy.route, "รีวิวรถรับจ้าง", "ย้ายของหน้างานจริง"],
    canonicalPath: `/case-studies/${caseStudy.slug}`,
    ogImage: caseStudy.image,
    ogImageAlt: caseStudy.title
  });
}
