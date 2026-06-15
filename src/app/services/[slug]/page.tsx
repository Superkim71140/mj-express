import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicesData } from "@/data/services";
import JsonLd from "@/components/JsonLd";
import ServicePageTemplate from "@/components/seo/ServicePageTemplate";
import { buildServiceMetadata } from "@/lib/seo/metadata";
import {
  buildMovingCompanySchema,
  buildServiceSchema,
  buildFAQSchema,
  buildBreadcrumbSchema
} from "@/lib/seo/schema";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for build pre-rendering
export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

// Generate unique metadata per service
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  if (!service) return {};
  return buildServiceMetadata(service);
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  // Linked Schemas Graph
  const companySchema = buildMovingCompanySchema(service.serviceAreas);
  const serviceSchema = buildServiceSchema(service);
  const faqSchema = buildFAQSchema(service.faqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "หน้าแรก", item: "/" },
    { name: service.serviceNameThai, item: `/services/${service.slug}` }
  ]);

  return (
    <>
      <JsonLd data={[companySchema, serviceSchema, faqSchema, breadcrumbSchema]} />
      <ServicePageTemplate service={service} />
    </>
  );
}
