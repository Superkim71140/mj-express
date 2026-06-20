import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { localAreas } from "@/data/areas";
import JsonLd from "@/components/JsonLd";
import AreaPageTemplate from "@/components/seo/AreaPageTemplate";
import { buildAreaMetadata } from "@/lib/seo/metadata";
import {
  buildMovingCompanySchema,
  buildLocalBusinessSchema,
  buildFAQSchema,
  buildBreadcrumbSchema
} from "@/lib/seo/schema";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Pre-render routes at build time
export async function generateStaticParams() {
  return localAreas.map((area) => ({
    slug: area.slug,
  }));
}

// Generate dynamic meta settings per district
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = localAreas.find((a) => a.slug === slug);
  if (!area) return {};
  return buildAreaMetadata(area);
}

export default async function AreaPage({ params }: PageProps) {
  const { slug } = await params;
  const area = localAreas.find((a) => a.slug === slug);
  
  if (!area) {
    notFound();
  }

  // Linked Schemas Graph
  const companySchema = buildMovingCompanySchema(area.areaServed);
  const localBusinessSchema = buildLocalBusinessSchema(area);
  
  if (area.slug === "salaya") {
    Object.assign(localBusinessSchema, {
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 13.7934,
        "longitude": 100.3225
      },
      "offers": {
        "@type": "Offer",
        "name": "Student Discount",
        "description": "ราคานักศึกษา",
        "priceCurrency": "THB",
        "price": "500",
        "url": "https://www.mj-th-express.com/areas/salaya",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "500",
          "priceCurrency": "THB",
          "name": "ราคานักศึกษา",
          "description": "อัตราพิเศษสำหรับย้ายหอพักนักศึกษา ม.มหิดล ศาลายา"
        }
      },
      ...(area.aggregateRating ? {
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": area.aggregateRating.ratingValue,
          "reviewCount": area.aggregateRating.reviewCount
        }
      } : {}),
      ...(area.entitySameAs ? {
        "sameAs": area.entitySameAs
      } : {}),
      ...(area.studentReviews ? {
        "review": area.studentReviews.map((rev) => ({
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": rev.author
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": rev.rating,
            "bestRating": "5"
          },
          "reviewBody": rev.text
        }))
      } : {}),
      "audience": {
        "@type": "EducationalAudience",
        "educationalRole": "student"
      },
      "areaServed": [
        {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": 13.7934,
            "longitude": 100.3225
          },
          "geoRadius": "10000"
        },
        ...(area.areaServed || [])
      ]
    });
  }

  const salayaImageSchemas: Record<string, unknown>[] = [];
  if (area.slug === "salaya" && area.geoCoordinates) {
    const baseUrl = "https://www.mj-th-express.com";
    salayaImageSchemas.push({
      "@context": "https://schema.org",
      "@type": "ImageObject",
      "contentUrl": area.ogImage.startsWith("http") ? area.ogImage : `${baseUrl}${area.ogImage}`,
      "contentLocation": {
        "@type": "Place",
        "name": "มหาวิทยาลัยมหิดล ศาลายา",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": area.geoCoordinates.latitude,
          "longitude": area.geoCoordinates.longitude
        }
      }
    });

    if (area.workCards?.[0]) {
      salayaImageSchemas.push({
        "@context": "https://schema.org",
        "@type": "ImageObject",
        "contentUrl": area.workCards[0].imgSrc.startsWith("http") ? area.workCards[0].imgSrc : `${baseUrl}${area.workCards[0].imgSrc}`,
        "contentLocation": {
          "@type": "Place",
          "name": "มหาวิทยาลัยมหิดล ศาลายา",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": area.geoCoordinates.latitude,
            "longitude": area.geoCoordinates.longitude
          }
        }
      });
    }
  }

  const faqSchema = buildFAQSchema(area.faqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "หน้าแรก", item: "/" },
    { name: `รถรับจ้าง${area.areaThai}`, item: `/areas/${area.slug}` }
  ]);

  return (
    <>
      <JsonLd data={[companySchema, localBusinessSchema, faqSchema, breadcrumbSchema, ...salayaImageSchemas]} />
      <AreaPageTemplate area={area} />
    </>
  );
}
