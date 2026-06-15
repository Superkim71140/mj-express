import React from "react";
import Image from "next/image";
import { LocalArea } from "@/data/seo/areas";
import Breadcrumbs from "./Breadcrumbs";
import ConversionCTA from "./ConversionCTA";
import TrustProofBlock from "./TrustProofBlock";
import PricingGuideBlock from "./PricingGuideBlock";
import RelatedLinks from "./RelatedLinks";
import SeoLinkHub from "./SeoLinkHub";
import FaqBlock from "./FaqBlock";

interface AreaPageTemplateProps {
  area: LocalArea;
}

export default function AreaPageTemplate({ area }: AreaPageTemplateProps) {
  const breadcrumbItems = [
    { name: `รถรับจ้าง${area.areaThai}`, item: `/areas/${area.slug}` }
  ];

  return (
    <>
      {/* Hero Header */}
      <header className="hero-local text-center py-5 text-white" style={{ background: "var(--blue-gradient)", position: "relative" }}>
        <div className="container py-4">
          <Breadcrumbs items={breadcrumbItems} />
          
          <span className="badge bg-warning text-dark mb-2 px-3 py-2 fw-bold" style={{ fontSize: "0.9rem" }}>
            <i className="bi bi-geo-alt-fill me-1"></i> {area.badgeText}
          </span>
          <h1 className="display-4 fw-bold mb-3" style={{ fontFamily: "var(--font-prompt)", lineHeight: "1.2" }}>
            {area.h1}
          </h1>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: "800px", fontSize: "1.15rem", opacity: 0.95 }}>
            {area.heroSubtitle || area.intro}
          </p>

          <ConversionCTA title={`ประเมินราคา ขนของ ย้ายบ้าน ย้ายหอ ในพื้นที่ ${area.areaThai}`} />
        </div>
      </header>

      {/* Trustproof Indicators */}
      <TrustProofBlock />

      {/* Area Local Overview */}
      <section className="py-5 bg-white">
        <div className="container" style={{ maxWidth: "1000px" }}>
          <div className="row g-4">
            
            {/* Left Column: Localized content */}
            <div className="col-md-7">
              <h2 className="fw-bold text-dark mb-3" style={{ fontFamily: "var(--font-prompt)", fontSize: "1.6rem" }}>
                📍 พื้นที่ให้บริการรถรับจ้างย่าน {area.areaThai}
              </h2>
              <p className="text-muted" style={{ fontSize: "1rem", lineHeight: "1.7" }}>
                {area.localIntro || area.intro}
              </p>

              {/* Landmarks and Pickup Points */}
              <div className="mt-4 p-4 rounded-4 bg-light border">
                <h4 className="fw-bold mb-3 text-secondary" style={{ fontSize: "1.1rem", fontFamily: "var(--font-prompt)" }}>
                  🏢 สถานที่และจุดรับของสำคัญในพื้นที่
                </h4>
                <div className="row">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <p className="small text-muted fw-bold mb-2">สถานที่สำคัญ/แลนด์มาร์ค:</p>
                    <ul className="list-unstyled mb-0 d-flex flex-column gap-1.5">
                      {area.landmarks?.map((landmark, idx) => (
                        <li key={idx} className="small text-secondary">
                          <i className="bi bi-building text-primary me-2"></i> {landmark}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-sm-6">
                    <p className="small text-muted fw-bold mb-2">จุดรับ-ส่งยอดนิยม:</p>
                    <ul className="list-unstyled mb-0 d-flex flex-column gap-1.5">
                      {area.pickupPoints?.map((pt, idx) => (
                        <li key={idx} className="small text-secondary">
                          <i className="bi bi-geo-alt-fill text-danger me-2"></i> {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Pain points vs solutions */}
              <div className="mt-5">
                <h3 className="fw-bold text-dark mb-3" style={{ fontFamily: "var(--font-prompt)", fontSize: "1.4rem" }}>
                  ⚠️ ปัญหาการขนย้ายในพื้นที่ {area.areaThai} และการแก้ไขของเรา
                </h3>
                <div className="d-flex flex-column gap-3">
                  {area.painPoints?.map((pain, idx) => (
                    <div className="p-3 border rounded-3 bg-danger-subtle text-danger-emphasis d-flex gap-3 align-items-start" key={idx}>
                      <i className="bi bi-exclamation-triangle-fill fs-5 mt-0.5"></i>
                      <div>
                        <strong className="d-block mb-1">ปัญหา: {pain}</strong>
                        <span className="small text-muted">
                          แก้ไขโดย: {area.solutionBullets?.[idx] || "ทีมงานชำนาญการและจัดเตรียมรถที่เหมาะสมเข้าช่วยเหลือทันที"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Local Advantages & Popular Services */}
            <div className="col-md-5">
              <div className="p-4 rounded-4 border shadow-sm h-100" style={{ backgroundColor: "#fafbfc" }}>
                <h3 className="fw-bold text-secondary mb-3" style={{ fontSize: "1.2rem", fontFamily: "var(--font-prompt)" }}>
                  💡 จุดเด่นรถรับจ้าง MJ-TH {area.areaThai}
                </h3>
                
                <div className="d-flex flex-column gap-3 mb-4">
                  {area.localAdvantages?.map(([title, desc], idx) => (
                    <div key={idx} className="border-bottom pb-2">
                      <strong className="text-dark d-block small" style={{ fontFamily: "var(--font-prompt)" }}>
                        ✅ {title}
                      </strong>
                      <span className="text-muted small leading-relaxed">{desc}</span>
                    </div>
                  ))}
                </div>

                <hr />

                <h4 className="fw-bold text-primary mt-4 mb-3" style={{ fontSize: "1.1rem", fontFamily: "var(--font-prompt)" }}>
                  📦 บริการยอดนิยมย่าน {area.areaThai}
                </h4>
                <div className="d-flex flex-wrap gap-2">
                  {area.popularServices?.map((serv, idx) => (
                    <span key={idx} className="badge bg-primary px-3 py-2 rounded-pill" style={{ fontSize: "0.8rem" }}>
                      {serv}
                    </span>
                  ))}
                </div>

                <div className="mt-4 p-3 rounded bg-warning-subtle text-warning-emphasis border border-warning-subtle">
                  <i className="bi bi-clock-history me-2"></i> 
                  <span>เข้ารับของด่วนได้ภายใน 30-60 นาทีในย่านนี้!</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Case studies in this local area */}
      {area.workCards && area.workCards.length > 0 && (
        <section className="py-5 bg-light border-top">
          <div className="container" style={{ maxWidth: "1000px" }}>
            <div className="text-center mb-5">
              <h2 className="fw-bold text-dark" style={{ fontFamily: "var(--font-prompt)" }}>
                🖼️ ภาพผลงานการขนของ ย้ายของ ในเขต {area.areaThai}
              </h2>
              <div className="title-underline"></div>
              <p className="text-muted">รีวิวงานจริงจากลูกค้าที่ใช้บริการกระบะตู้ทึบรับจ้างย่าน{area.areaThai}</p>
            </div>
            
            <div className="row g-4">
              {area.workCards.map((card, idx) => (
                <div className="col-md-4" key={idx}>
                  <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                    <div style={{ position: "relative", height: "200px" }}>
                      <Image 
                        src={card.imgSrc} 
                        alt={card.alt} 
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-fit-cover"
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title fw-bold" style={{ fontFamily: "var(--font-prompt)", fontSize: "1.05rem" }}>
                        {card.title}
                      </h5>
                      <p className="card-text text-muted small">{card.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing Guide */}
      <PricingGuideBlock priceNotes={area.priceNotes} />

      {/* FAQ block */}
      <FaqBlock
        id={`faq-${area.slug}`}
        items={area.faqs}
        title={`คำถามที่พบบ่อย (FAQ) - รถรับจ้าง${area.areaThai}`}
        subtitle={`คำตอบเคลียร์ชัดสำหรับคนต้องการรถขนของย่าน${area.areaThai}`}
      />

      {/* Related semantic internal links */}
      <RelatedLinks currentSlug={area.slug} entityType="area" />

      {/* Global hub */}
      <SeoLinkHub excludeSlug={area.slug} />
    </>
  );
}
