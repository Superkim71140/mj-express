import React from "react";
import Link from "next/link";
import { localAreas } from "@/data/areas";
import { servicesData } from "@/data/services";
import { routesData } from "@/data/routes";

interface RelatedLinksProps {
  excludeSlug?: string;
  mode: "areas-and-services" | "services-and-areas" | "routes-and-services" | "all";
}

export default function RelatedLinks({ excludeSlug, mode }: RelatedLinksProps) {
  // Filter out the active item to prevent self-linking
  const otherAreas = localAreas.filter((area) => area.slug !== excludeSlug);
  const otherServices = servicesData.filter((service) => service.slug !== excludeSlug);
  const otherRoutes = routesData.filter((route) => route.slug !== excludeSlug);

  const showAreas = mode === "all" || mode === "services-and-areas" || mode === "routes-and-services";
  const showServices = mode === "all" || mode === "areas-and-services" || mode === "routes-and-services";
  const showRoutes = mode === "all" || mode === "areas-and-services" || mode === "services-and-areas";

  return (
    <div className="related-links-container py-5 bg-white border-top">
      <div className="container">
        <div className="text-center mb-5">
          <h3 className="fw-bold text-secondary text-center" style={{ fontFamily: "var(--font-prompt)", fontSize: "1.6rem" }}>
            🔗 บริการรับงานและพื้นที่รับย้ายอื่นๆ ของเรา
          </h3>
          <div className="title-underline"></div>
          <p className="text-muted small">บริการรถกระบะรับจ้างขนของ ย้ายบ้าน คอนโด ส่งบิ๊กไบค์ ตลอด 24 ชม.</p>
        </div>

        <div className="d-flex flex-column gap-4">
          {/* 1. Core Services Section */}
          {showServices && (
            <div>
              <h5 className="fw-bold text-dark mb-3" style={{ fontSize: "1.05rem" }}>
                📦 บริการขนย้ายขนส่งยอดนิยม:
              </h5>
              <div className="row g-2">
                {/* Regular motorcycle transport page */}
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <Link href="/motorcycle-transport" className="btn btn-outline-primary w-100 py-2.5 rounded-3 fw-semibold text-truncate" style={{ fontSize: "0.9rem" }}>
                    🏍️ ส่งมอเตอร์ไซค์ไปต่างจังหวัด
                  </Link>
                </div>
                {otherServices.map((service) => (
                  <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={service.slug}>
                    <Link href={`/services/${service.slug}`} className="btn btn-outline-primary w-100 py-2.5 rounded-3 fw-semibold text-truncate" style={{ fontSize: "0.9rem" }}>
                      🚚 {service.serviceName}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Service Areas Section */}
          {showAreas && (
            <div>
              <h5 className="fw-bold text-dark mb-3" style={{ fontSize: "1.05rem" }}>
                📍 พื้นที่รับรถกระบะตู้ทึบรับจ้างด่วน:
              </h5>
              <div className="row g-2">
                {otherAreas.map((area) => {
                  const displayLabel = area.label || area.badgeText.replace("พื้นที่ ", "");
                  return (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={area.slug}>
                      <Link href={`/areas/${area.slug}`} className="btn btn-outline-secondary w-100 py-2.5 rounded-3 fw-semibold text-truncate" style={{ fontSize: "0.9rem" }}>
                        🚚 รถรับจ้าง{displayLabel}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. Transport Routes Section */}
          {showRoutes && (
            <div>
              <h5 className="fw-bold text-dark mb-3" style={{ fontSize: "1.05rem" }}>
                🛣️ เส้นทางขนย้ายยอดนิยม:
              </h5>
              <div className="row g-2">
                {otherRoutes.map((route) => (
                  <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={route.slug}>
                    <Link href={`/routes/${route.slug}`} className="btn btn-outline-success w-100 py-2.5 rounded-3 fw-semibold text-truncate" style={{ fontSize: "0.9rem" }}>
                      🛣️ รถรับจ้าง{route.origin} ⇄ {route.destination}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* General Call-To-Action Quick Links */}
          <div className="text-center mt-3">
            <Link href="/portfolio" className="btn btn-sm btn-link text-decoration-none me-3">
              🖼️ ดูรูปรีวิวผลงานการขนส่ง
            </Link>
            <span className="text-muted">|</span>
            <Link href="/contact" className="btn btn-sm btn-link text-decoration-none ms-3">
              📞 ประเมินราคาขนของฟรี
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
