import type { LocalArea } from "@/data/seo/areas";
import type { ServiceItem } from "@/data/seo/services";
import type { RouteItem } from "@/data/seo/routes";
import type { CaseStudyItem } from "@/data/seo/case-studies";

export interface BreadcrumbItem {
  name: string;
  href: string;
  item?: string; // alias for href for backward compatibility
}

export function getAreasBreadcrumbs(): BreadcrumbItem[] {
  return [
    { name: "หน้าแรก", href: "/" },
    { name: "พื้นที่ให้บริการ", href: "/areas" }
  ];
}

export function getAreaDetailBreadcrumbs(area: LocalArea): BreadcrumbItem[] {
  return [
    { name: "หน้าแรก", href: "/" },
    { name: "พื้นที่ให้บริการ", href: "/areas" },
    { name: area.breadcrumbLabel || area.areaThai, href: `/areas/${area.slug}` }
  ];
}

export function getServiceDetailBreadcrumbs(service: ServiceItem): BreadcrumbItem[] {
  return [
    { name: "หน้าแรก", href: "/" },
    { name: service.breadcrumbLabel || service.shortName, href: `/services/${service.slug}` }
  ];
}

export function getRouteDetailBreadcrumbs(route: RouteItem): BreadcrumbItem[] {
  const routeLabel = route.breadcrumbLabel || `${route.originThai}–${route.destinationThai}`;
  return [
    { name: "หน้าแรก", href: "/" },
    { name: routeLabel, href: `/routes/${route.slug}` }
  ];
}

export function getCaseStudiesBreadcrumbs(): BreadcrumbItem[] {
  return [
    { name: "หน้าแรก", href: "/" },
    { name: "กรณีศึกษา", href: "/case-studies" }
  ];
}

export function getCaseStudyDetailBreadcrumbs(study: CaseStudyItem): BreadcrumbItem[] {
  const label = study.breadcrumbLabel || study.shortTitle || study.title.replace(" | MJ-TH Express", "");
  return [
    { name: "หน้าแรก", href: "/" },
    { name: "กรณีศึกษา", href: "/case-studies" },
    { name: label, href: `/case-studies/${study.slug}` }
  ];
}

export function getMotorcycleTransportBreadcrumbs(): BreadcrumbItem[] {
  return [
    { name: "หน้าแรก", href: "/" },
    { name: "ขนส่งมอเตอร์ไซค์", href: "/motorcycle-transport" }
  ];
}

export function getPortfolioBreadcrumbs(): BreadcrumbItem[] {
  return [
    { name: "หน้าแรก", href: "/" },
    { name: "ผลงาน", href: "/portfolio" }
  ];
}

export function getReviewsBreadcrumbs(): BreadcrumbItem[] {
  return [
    { name: "หน้าแรก", href: "/" },
    { name: "รีวิวลูกค้า", href: "/reviews" }
  ];
}

export function getContactBreadcrumbs(): BreadcrumbItem[] {
  return [
    { name: "หน้าแรก", href: "/" },
    { name: "ติดต่อเรา", href: "/contact" }
  ];
}
