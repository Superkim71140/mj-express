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
  const faqSchema = buildFAQSchema(area.faqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "หน้าแรก", item: "/" },
    { name: `รถรับจ้าง${area.areaThai}`, item: `/areas/${area.slug}` }
  ]);

  return (
    <>
      <JsonLd data={[companySchema, localBusinessSchema, faqSchema, breadcrumbSchema]} />
      <AreaPageTemplate area={area} />
    </>
  );
}
