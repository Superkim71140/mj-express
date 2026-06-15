import React from "react";
import Link from "next/link";
import { 
  getRelatedAreasForService, 
  getRelatedRoutesForService,
  getRelatedAreasForArea,
  getRelatedServicesForArea,
  getRelatedRoutesForArea,
  getRelatedServicesForRoute,
  getRelatedRoutesForRoute,
  getRelatedAreasForRoute
} from "@/data/seo/internal-links";
import styles from "./RelatedLinks.module.css";

interface RelatedLinksProps {
  currentSlug: string;
  entityType: "service" | "area" | "route";
  title?: string;
}

interface RelatedArea {
  slug: string;
  label?: string;
  badgeText: string;
}

interface RelatedService {
  slug: string;
  serviceName: string;
}

interface RelatedRoute {
  slug: string;
  origin: string;
  destination: string;
}

export default function RelatedLinks({ currentSlug, entityType, title }: RelatedLinksProps) {
  let relatedAreas: RelatedArea[] = [];
  let relatedServices: RelatedService[] = [];
  let relatedRoutes: RelatedRoute[] = [];

  if (entityType === "service") {
    relatedAreas = getRelatedAreasForService(currentSlug);
    relatedRoutes = getRelatedRoutesForService(currentSlug);
  } else if (entityType === "area") {
    relatedAreas = getRelatedAreasForArea(currentSlug);
    relatedServices = getRelatedServicesForArea(currentSlug);
    relatedRoutes = getRelatedRoutesForArea(currentSlug);
  } else if (entityType === "route") {
    relatedServices = getRelatedServicesForRoute(currentSlug);
    relatedRoutes = getRelatedRoutesForRoute(currentSlug);
    relatedAreas = getRelatedAreasForRoute(currentSlug);
  }

  const hasLinks = relatedAreas.length > 0 || relatedServices.length > 0 || relatedRoutes.length > 0;
  if (!hasLinks) return null;

  return (
    <section className={styles.relatedLinksSection}>
      <div className="container" style={{ maxWidth: "1000px" }}>
        <div className={styles.header}>
          <h3 className={styles.title}>
            {title || "🔗 ลิงก์บริการและพื้นที่แนะนำที่เกี่ยวข้อง"}
          </h3>
          <div className={styles.underline}></div>
        </div>

        <div className={styles.contentGrid}>
          {/* Related Services */}
          {relatedServices.length > 0 && (
            <div className={styles.linkGroup}>
              <h4 className={styles.groupTitle}>
                <i className="bi bi-box-seam-fill text-primary me-2"></i>บริการขนย้ายยอดนิยม
              </h4>
              <div className={styles.linkList}>
                {relatedServices.map((service) => (
                  <Link 
                    href={`/services/${service.slug}`} 
                    key={service.slug}
                    className={styles.linkItem}
                  >
                    🚚 {service.serviceName}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Areas */}
          {relatedAreas.length > 0 && (
            <div className={styles.linkGroup}>
              <h4 className={styles.groupTitle}>
                <i className="bi bi-geo-alt-fill text-danger me-2"></i>พื้นที่ให้บริการด่วนใกล้เคียง
              </h4>
              <div className={styles.linkList}>
                {relatedAreas.map((area) => {
                  const displayLabel = area.label || area.badgeText.replace("พื้นที่ ", "");
                  return (
                    <Link 
                      href={`/areas/${area.slug}`} 
                      key={area.slug}
                      className={styles.linkItem}
                    >
                      📍 รถรับจ้าง{displayLabel}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Related Routes */}
          {relatedRoutes.length > 0 && (
            <div className={styles.linkGroup}>
              <h4 className={styles.groupTitle}>
                <i className="bi bi-compass-fill text-success me-2"></i>เส้นทางขนส่งแนะนำ
              </h4>
              <div className={styles.linkList}>
                {relatedRoutes.map((route) => (
                  <Link 
                    href={`/routes/${route.slug}`} 
                    key={route.slug}
                    className={styles.linkItem}
                  >
                    🛣️ {route.origin} ⇄ {route.destination}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
