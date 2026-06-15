import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { routesData } from "@/data/routes";
import JsonLd from "@/components/JsonLd";
import RoutePageTemplate from "@/components/seo/RoutePageTemplate";
import { buildRouteMetadata } from "@/lib/seo/metadata";
import {
  buildMovingCompanySchema,
  buildRouteServiceSchema,
  buildFAQSchema,
  buildBreadcrumbSchema
} from "@/lib/seo/schema";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for build pre-rendering
export async function generateStaticParams() {
  return routesData.map((route) => ({
    slug: route.slug,
  }));
}

// Generate unique metadata per route
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const route = routesData.find((r) => r.slug === slug);
  if (!route) return {};
  return buildRouteMetadata(route);
}

export default async function RoutePage({ params }: PageProps) {
  const { slug } = await params;
  const route = routesData.find((r) => r.slug === slug);

  if (!route) {
    notFound();
  }

  // Linked Schemas Graph
  const companySchema = buildMovingCompanySchema();
  const routeServiceSchema = buildRouteServiceSchema(route);
  const faqSchema = buildFAQSchema(route.faqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "หน้าแรก", item: "/" },
    { name: `เส้นทาง ${route.origin} ⇄ ${route.destination}`, item: `/routes/${route.slug}` }
  ]);

  return (
    <>
      <JsonLd data={[companySchema, routeServiceSchema, faqSchema, breadcrumbSchema]} />
      <RoutePageTemplate route={route} />
    </>
  );
}
