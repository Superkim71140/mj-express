import { MetadataRoute } from "next";
import { localAreas } from "@/data/areas";
import { servicesData } from "@/data/services";
import { routesData } from "@/data/routes";
import { caseStudiesData } from "@/data/case-studies";
import { siteConfig } from "@/lib/seo/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.baseUrl;
  // Stable verified last modified date for content updates
  const stableFallbackDate = new Date("2026-06-15T12:00:00Z");

  // Core pages
  const corePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: stableFallbackDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/motorcycle-transport`,
      lastModified: stableFallbackDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/areas`,
      lastModified: stableFallbackDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: stableFallbackDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: stableFallbackDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: stableFallbackDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: stableFallbackDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const areaPages = localAreas.map((area) => ({
    url: `${baseUrl}/areas/${area.slug}`,
    lastModified: area.updatedAt ? new Date(area.updatedAt) : stableFallbackDate,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // Dynamic service pages (priority 0.9) - excluding motorcycle-transport to consolidate ranking signals on canonical /motorcycle-transport
  const servicePages = servicesData
    .filter((service) => service.slug !== "motorcycle-transport")
    .map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: service.updatedAt ? new Date(service.updatedAt) : stableFallbackDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));

  // Dynamic route pages (priority 0.9)
  const routePages = routesData.map((route) => ({
    url: `${baseUrl}/routes/${route.slug}`,
    lastModified: route.updatedAt ? new Date(route.updatedAt) : stableFallbackDate,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Dynamic case study pages (priority 0.8)
  const caseStudyPages = caseStudiesData.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: study.updatedAt ? new Date(study.updatedAt) : stableFallbackDate,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...corePages, ...areaPages, ...servicePages, ...routePages, ...caseStudyPages];
}
