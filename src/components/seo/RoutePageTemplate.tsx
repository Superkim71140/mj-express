import React from "react";
import { RouteItem } from "@/data/seo/routes";
import Breadcrumbs from "./Breadcrumbs";
import ConversionCTA from "./ConversionCTA";
import TrustProofBlock from "./TrustProofBlock";
import PricingGuideBlock from "./PricingGuideBlock";
import RelatedLinks from "./RelatedLinks";
import SeoLinkHub from "./SeoLinkHub";
import FaqBlock from "./FaqBlock";

interface RoutePageTemplateProps {
  route: RouteItem;
}

export default function RoutePageTemplate({ route }: RoutePageTemplateProps) {
  const breadcrumbItems = [
    { name: `รถรับจ้าง ${route.originThai} ⇄ ${route.destinationThai}`, item: `/routes/${route.slug}` }
  ];

  return (
    <>
      {/* Hero Header */}
      <header className="hero-local text-center py-5 text-white" style={{ background: "var(--blue-gradient)", position: "relative" }}>
        <div className="container py-4">
          <Breadcrumbs items={breadcrumbItems} />
          
          <span className="badge bg-warning text-dark mb-2 px-3 py-2 fw-bold" style={{ fontSize: "0.9rem" }}>
            <i className="bi bi-signpost-split-fill me-1"></i> เส้นทางเหมาคันวิ่งตรงด่วน
          </span>
          <h1 className="display-4 fw-bold mb-3" style={{ fontFamily: "var(--font-prompt)", lineHeight: "1.2" }}>
            {route.h1}
          </h1>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: "800px", fontSize: "1.15rem", opacity: 0.95 }}>
            {route.routeIntro || route.intro}
          </p>

          <ConversionCTA title={`เช็คราคารถรับจ้าง เส้นทาง ${route.origin} ไป ${route.destination}`} />
        </div>
      </header>

      {/* Trustproof Block */}
      <TrustProofBlock />

      {/* Route Details Overview */}
      <section className="py-5 bg-white">
        <div className="container" style={{ maxWidth: "1000px" }}>
          <div className="row g-4">
            
            {/* Left Column: Route Details */}
            <div className="col-md-7">
              <h2 className="fw-bold text-dark mb-3" style={{ fontFamily: "var(--font-prompt)", fontSize: "1.6rem" }}>
                🛣️ รายละเอียดและข้อมูลการเดินทางเส้นทางนี้
              </h2>
              <p className="text-muted" style={{ fontSize: "1rem", lineHeight: "1.7" }}>
                {route.intro}
              </p>

              {/* Travel Stats Cards */}
              <div className="row g-3 my-3">
                <div className="col-sm-6">
                  <div className="p-3 border rounded-3 bg-light h-100">
                    <div className="d-flex align-items-center gap-2 mb-2 text-primary">
                      <i className="bi bi-signpost-fill fs-4"></i>
                      <strong className="small">ระยะทางประมาณการ</strong>
                    </div>
                    <span className="fs-5 fw-bold text-dark">
                      {route.estimatedDistanceKm ? `${route.estimatedDistanceKm} กม.` : "ตามระยะทางแผนที่"}
                    </span>
                    <p className="small text-muted mb-0 mt-1">{route.distanceEstimate.split("ใช้เวลา")[0]}</p>
                  </div>
                </div>
                
                <div className="col-sm-6">
                  <div className="p-3 border rounded-3 bg-light h-100">
                    <div className="d-flex align-items-center gap-2 mb-2 text-success">
                      <i className="bi bi-clock-history fs-4"></i>
                      <strong className="small">ระยะเวลาวิ่งรถเฉลี่ย</strong>
                    </div>
                    <span className="fs-5 fw-bold text-dark">
                      {route.estimatedTravelTime || "ตามสภาวะจราจร"}
                    </span>
                    <p className="small text-muted mb-0 mt-1">วิ่งเหมาคัน ส่งตรงด่วน ไม่พักคลัง</p>
                  </div>
                </div>
              </div>

              {/* Route notes */}
              <div className="mt-4 p-4 rounded-4 bg-light border">
                <h4 className="fw-bold mb-2 text-secondary" style={{ fontSize: "1.1rem", fontFamily: "var(--font-prompt)" }}>
                  🗺️ รายละเอียดเส้นทางเดินรถหลัก
                </h4>
                <p className="text-secondary small mb-0" style={{ lineHeight: "1.7" }}>
                  {route.routeNotes}
                </p>
              </div>

              {/* Safety notes */}
              {route.safetyNotes && (
                <div className="mt-4">
                  <h3 className="fw-bold text-dark mb-3" style={{ fontFamily: "var(--font-prompt)", fontSize: "1.3rem" }}>
                    🛡️ มาตรฐานความปลอดภัยการขนย้ายระยะไกล
                  </h3>
                  <div className="p-3 border rounded-3 bg-success-subtle text-success-emphasis d-flex gap-3 align-items-start">
                    <i className="bi bi-shield-fill-check fs-4 text-success mt-0.5"></i>
                    <div>
                      <strong className="d-block mb-1">มาตรฐานการขับขี่ทางไกล:</strong>
                      <span className="small text-secondary">{route.safetyNotes}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Vehicles & Suitable Goods */}
            <div className="col-md-5">
              <div className="p-4 rounded-4 border shadow-sm h-100" style={{ backgroundColor: "#fafbfc" }}>
                <h3 className="fw-bold text-secondary mb-3" style={{ fontSize: "1.2rem", fontFamily: "var(--font-prompt)" }}>
                  📋 ข้อมูลยานพาหนะและบริการที่รองรับ
                </h3>
                
                <div className="mb-3">
                  <p className="small text-muted mb-1 fw-bold">ประเภทยานพาหนะสแตนบาย:</p>
                  <div className="d-flex flex-wrap gap-2">
                    {route.vehicleTypes.map((type) => (
                      <span className="badge bg-secondary text-white px-2 py-1.5" key={type} style={{ fontSize: "0.8rem" }}>
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <p className="small text-muted mb-1 fw-bold">ประเภทงานบริการหลัก:</p>
                  <ul className="list-unstyled mb-0 d-flex flex-column gap-1.5 ps-1">
                    {route.serviceTypes.map((serv, idx) => (
                      <li key={idx} className="small text-secondary">
                        <i className="bi bi-check-circle text-primary me-2"></i> {serv}
                      </li>
                    ))}
                  </ul>
                </div>

                <hr />

                <h4 className="fw-bold text-primary mt-4 mb-3" style={{ fontSize: "1.1rem", fontFamily: "var(--font-prompt)" }}>
                  📦 เหมาะกับการขนส่งสิ่งของประเภทใด?
                </h4>
                <div className="d-flex flex-wrap gap-2">
                  {route.popularFor.map((item, idx) => (
                    <span key={idx} className="badge bg-primary px-3 py-2 rounded-pill" style={{ fontSize: "0.8rem" }}>
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-4 p-3 rounded bg-warning-subtle text-warning-emphasis border border-warning-subtle small">
                  <i className="bi bi-info-circle-fill me-1"></i>
                  <span>เส้นทางนี้บริการเฉพาะงาน **เหมาคันวิ่งตรง (Direct Delivery)** เท่านั้น ของไม่ตกหล่นปะปนกับรายอื่น มั่นใจความปลอดภัยสูงสุด 100%</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Pricing Guide */}
      <PricingGuideBlock priceNotes={route.priceNotes} />

      {/* FAQ block */}
      <FaqBlock
        id={`faq-${route.slug}`}
        items={route.faqs}
        title={`คำถามที่พบบ่อย (FAQ) - รถรับจ้าง ${route.origin} ไป ${route.destination}`}
        subtitle={`คำตอบเคลียร์ชัดเกี่ยวกับการเดินทางขนส่งข้ามจังหวัดเส้นทางนี้`}
      />

      {/* Related semantic internal links */}
      <RelatedLinks currentSlug={route.slug} entityType="route" />

      {/* Global hub */}
      <SeoLinkHub excludeSlug={route.slug} />
    </>
  );
}
