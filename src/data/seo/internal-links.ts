import { servicesData, ServiceItem } from "./services";
import { localAreas, LocalArea } from "./areas";
import { routesData, RouteItem } from "./routes";
import { caseStudiesData, CaseStudyItem } from "./case-studies";

// Resolve related entities from services
export function getRelatedAreasForService(serviceSlug: string, limit = 8): LocalArea[] {
  const service = servicesData.find((s) => s.slug === serviceSlug);
  if (!service) return [];
  return localAreas
    .filter((area) => service.relatedAreaSlugs.includes(area.slug))
    .slice(0, limit);
}

export function getRelatedRoutesForService(serviceSlug: string, limit = 6): RouteItem[] {
  const service = servicesData.find((s) => s.slug === serviceSlug);
  if (!service) return [];
  return routesData
    .filter((route) => service.relatedRouteSlugs.includes(route.slug))
    .slice(0, limit);
}

// Resolve related entities from areas
export function getRelatedAreasForArea(areaSlug: string, limit = 6): LocalArea[] {
  const area = localAreas.find((a) => a.slug === areaSlug);
  if (!area) return [];
  return localAreas
    .filter((a) => area.nearbyAreas.includes(a.slug) || (a.nearbyAreas.includes(areaSlug) && a.slug !== areaSlug))
    .slice(0, limit);
}

export function getRelatedServicesForArea(areaSlug: string, limit = 6): ServiceItem[] {
  const area = localAreas.find((a) => a.slug === areaSlug);
  if (!area) return [];
  // Popular services listed in area, or fallback to first few services
  return servicesData
    .filter((service) => service.relatedAreaSlugs.includes(areaSlug))
    .slice(0, limit);
}

export function getRelatedRoutesForArea(areaSlug: string, limit = 6): RouteItem[] {
  // Find routes where this area is the origin or destination
  return routesData
    .filter((route) => route.relatedAreaSlugs.includes(areaSlug) || route.slug.includes(areaSlug))
    .slice(0, limit);
}

// Resolve related entities from routes
export function getRelatedServicesForRoute(routeSlug: string, limit = 4): ServiceItem[] {
  const route = routesData.find((r) => r.slug === routeSlug);
  if (!route) return [];
  return servicesData
    .filter((service) => route.relatedServiceSlugs.includes(service.slug))
    .slice(0, limit);
}

export function getRelatedRoutesForRoute(routeSlug: string, limit = 6): RouteItem[] {
  const route = routesData.find((r) => r.slug === routeSlug);
  if (!route) return [];
  // Return routes referenced in relatedRoutes or that share origin/destination
  const relatedSlugs = route.relatedRoutes.map((rr) => rr.slug);
  return routesData
    .filter((r) => relatedSlugs.includes(r.slug) || (r.origin === route.origin && r.slug !== routeSlug))
    .slice(0, limit);
}

export function getRelatedAreasForRoute(routeSlug: string, limit = 4): LocalArea[] {
  const route = routesData.find((r) => r.slug === routeSlug);
  if (!route) return [];
  return localAreas
    .filter((area) => route.relatedAreaSlugs.includes(area.slug))
    .slice(0, limit);
}

// Case studies lookups
export function getCaseStudiesForEntity(entitySlug: string, type: "service" | "area" | "route"): CaseStudyItem[] {
  return caseStudiesData.filter((cs) => {
    if (type === "service") return cs.relatedServiceSlugs.includes(entitySlug);
    if (type === "area") return cs.relatedAreaSlugs.includes(entitySlug);
    if (type === "route") return cs.relatedRouteSlugs.includes(entitySlug);
    return false;
  });
}
