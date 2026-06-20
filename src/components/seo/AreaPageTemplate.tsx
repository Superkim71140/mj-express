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

const StudentPromoBlock = ({ ratingValue, reviewCount }: { ratingValue?: string; reviewCount?: string }) => (
  <aside id="mahidol-moving" aria-label="Student Special Offer" className="mt-4 p-4 rounded-4 shadow-sm border border-primary" style={{ backgroundColor: "rgba(13, 110, 253, 0.05)" }}>
    {ratingValue && reviewCount && (
      <div className="mb-3 d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill bg-warning-subtle text-warning-emphasis border border-warning" style={{ fontSize: "0.85rem", fontWeight: "bold" }}>
        <span>⭐️ {ratingValue}/5 จากนักศึกษาและบุคลากร {reviewCount} รีวิว</span>
      </div>
    )}
    <div className="d-flex align-items-start gap-3">
      <div className="fs-1 text-primary">🎓</div>
      <div>
        <h4 className="fw-bold text-primary mb-2" style={{ fontFamily: "var(--font-prompt)" }}>
          โปรโมชั่นพิเศษสำหรับนักศึกษา ม.มหิดล
        </h4>
        <p className="mb-2 text-dark">
          เพียง <strong>แสดงบัตรนักศึกษาลดราคา</strong> ทันที! บริการรับย้ายหอพักในพื้นที่รอบมหาวิทยาลัยมหิดล ศาลายา
        </p>
        <ul className="mb-0 text-muted small" style={{ listStyleType: "none", paddingLeft: 0 }}>
          <li><i className="bi bi-check-circle-fill text-success me-2"></i>โซนซอยตั้งสิน</li>
          <li><i className="bi bi-check-circle-fill text-success me-2"></i>หอใน ม.มหิดล</li>
          <li><i className="bi bi-check-circle-fill text-success me-2"></i>โซนหน้า ม. และบริเวณใกล้เคียง</li>
        </ul>
      </div>
    </div>
  </aside>
);

const LocalProximityBlock = ({ proximityBlocks }: { proximityBlocks?: { location: string; time: string }[] }) => {
  if (!proximityBlocks || proximityBlocks.length === 0) return null;
  return (
    <div className="mt-3 p-3 rounded-4 border shadow-sm" style={{ backgroundColor: "#f8f9fa", borderColor: "#dee2e6" }}>
      <div className="d-flex align-items-center gap-2">
        <i className="bi bi-stopwatch text-primary fs-5"></i>
        <span className="text-dark small">
          <strong>⚡ ระยะเวลาเข้ารับของด่วน:</strong>{" "}
          {proximityBlocks.map((block, idx) => (
            <span key={idx} className="fw-medium">
              {block.location} ({block.time}){idx < proximityBlocks.length - 1 ? " | " : ""}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
};

const SeasonalAlertBlock = ({ notice }: { notice?: string }) => {
  if (!notice) return null;
  return (
    <aside role="note" className="container mt-4">
      <div className="alert alert-warning d-flex align-items-center gap-3 border border-warning-subtle shadow-sm rounded-4 p-3 mb-0">
        <div className="fs-3 text-warning">📅</div>
        <div>
          <strong className="d-block text-warning-emphasis mb-1 font-prompt">ประกาศตารางเดินรถช่วงเปิด-ปิดเทอม</strong>
          <span className="text-dark small leading-relaxed">{notice}</span>
        </div>
      </div>
    </aside>
  );
};

const VerifiedStudentReviews = ({ reviews }: { reviews?: { author: string; text: string; rating: number }[] }) => {
  if (!reviews || reviews.length === 0) return null;
  return (
    <section className="py-5 bg-white border-top">
      <div className="container" style={{ maxWidth: "1000px" }}>
        <div className="text-center mb-5">
          <h2 className="fw-bold text-dark font-prompt">
            💬 รีวิวจากผู้ใช้จริงรอบรั้วมหิดล
          </h2>
          <div className="title-underline"></div>
          <p className="text-muted">ความคิดเห็นของนักศึกษาที่ร่วมประเมินความพึงพอใจการใช้บริการ</p>
        </div>
        <div className="row g-4">
          {reviews.map((rev, idx) => (
            <div className="col-md-6" key={idx}>
              <div className="card h-100 border shadow-sm rounded-4 p-4" style={{ backgroundColor: "#fdfdfd" }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-1.5 small fw-semibold">
                    ✅ Verified Student (ยืนยันตัวตนนักศึกษามหิดล)
                  </span>
                  <span className="text-warning fw-bold">
                    {"⭐️".repeat(rev.rating)}
                  </span>
                </div>
                <p className="card-text text-dark-emphasis italic leading-relaxed" style={{ fontSize: "0.95rem" }}>
                  &ldquo;{rev.text}&rdquo;
                </p>
                <div className="mt-3 text-end">
                  <strong className="text-secondary small font-prompt">— {rev.author}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function AreaPageTemplate({ area }: AreaPageTemplateProps) {
  const breadcrumbItems = [
    { name: `รถรับจ้าง${area.areaThai}`, item: `/areas/${area.slug}` }
  ];

  return (
    <>
      {/* Hero Header */}
      <header className="hero-local text-center py-5 text-white" style={{ background: "var(--blue-gradient)", position: "relative", overflow: "hidden" }}>
        {area.ogImage && (
          <Image
            src={area.ogImage}
            alt={area.h1}
            fill
            priority={true}
            fetchPriority="high"
            className="object-fit-cover opacity-25"
            style={{ zIndex: 0 }}
          />
        )}
        <div className="container py-4 position-relative" style={{ zIndex: 1 }}>
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

      <SeasonalAlertBlock notice={area.seasonalNotice} />

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

              {/* Special Salaya Student Promo */}
              {area.slug === 'salaya' && (
                <>
                  <StudentPromoBlock 
                    ratingValue={area.aggregateRating?.ratingValue} 
                    reviewCount={area.aggregateRating?.reviewCount} 
                  />
                  <LocalProximityBlock proximityBlocks={area.proximityBlocks} />
                </>
              )}

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
                <div className="d-flex flex-wrap gap-2" itemScope itemType="https://schema.org/Service">
                  {area.popularServices?.map((serv, idx) => (
                    <span key={idx} className="badge bg-primary px-3 py-2 rounded-pill" style={{ fontSize: "0.8rem" }} itemProp="name">
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
      <PricingGuideBlock priceNotes="อัตราค่าบริการเริ่มต้นที่ 1,000 บาท และประเมินราคารวมคนยกตามความเหมาะสมของปริมาณของและสถานที่หน้างานจริง ไม่มีบวกราคาแอบแฝง" />

      {/* FAQ block */}
      <FaqBlock
        id={`faq-${area.slug}`}
        items={area.faqs}
        title={`คำถามที่พบบ่อย (FAQ) - รถรับจ้าง${area.areaThai}`}
        subtitle={`คำตอบเคลียร์ชัดสำหรับคนต้องการรถขนของย่าน${area.areaThai}`}
      />

      <VerifiedStudentReviews reviews={area.studentReviews} />

      {/* Related semantic internal links */}
      <RelatedLinks currentSlug={area.slug} entityType="area" />

      {/* Global hub */}
      <SeoLinkHub excludeSlug={area.slug} />
    </>
  );
}
