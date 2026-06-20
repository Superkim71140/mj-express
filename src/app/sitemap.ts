import { MetadataRoute } from "next";
import { localAreas } from "@/data/areas";
import { servicesData } from "@/data/services";
import { routesData } from "@/data/routes";
import { caseStudiesData } from "@/data/case-studies";
import { siteConfig } from "@/lib/seo/site-config";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.baseUrl;
  const defaultDate = new Date();

  // Core pages
  const corePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: defaultDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/motorcycle-transport`,
      lastModified: defaultDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/areas`,
      lastModified: defaultDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: defaultDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: defaultDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: defaultDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: defaultDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const areaPages = localAreas.map((area) => {
    const isSalaya = area.slug === "salaya";
    return {
      url: `${baseUrl}/areas/${area.slug}`,
      // SEO Magic: Only force current date for Salaya, use DB date for others
      lastModified: isSalaya ? new Date() : (area.updatedAt ? new Date(area.updatedAt) : defaultDate),
      changeFrequency: isSalaya ? ("daily" as const) : ("weekly" as const),
      priority: isSalaya ? 1.0 : 0.85,
    };
  });

  // Dynamic service pages (priority 0.9) - excluding motorcycle-transport to consolidate ranking signals on /motorcycle-transport
  const servicePages = servicesData
    .filter((service) => service.slug !== "motorcycle-transport")
    .map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: service.updatedAt ? new Date(service.updatedAt) : defaultDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));

  // Dynamic route pages (priority 0.9)
  const routePages = routesData.map((route) => ({
    url: `${baseUrl}/routes/${route.slug}`,
    lastModified: route.updatedAt ? new Date(route.updatedAt) : defaultDate,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Dynamic case study pages (priority 0.8)
  const caseStudyPages = caseStudiesData.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: study.updatedAt ? new Date(study.updatedAt) : defaultDate,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...corePages, ...areaPages, ...servicePages, ...routePages, ...caseStudyPages];
}
