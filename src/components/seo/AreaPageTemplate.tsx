import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LocalArea } from "@/data/seo/areas";
import Breadcrumbs from "./Breadcrumbs";
import ConversionCTA from "./ConversionCTA";
import TrustProofBlock from "./TrustProofBlock";
import PricingGuideBlock, { PriceEstimateItem } from "./PricingGuideBlock";
import RelatedLinks from "./RelatedLinks";
import SeoLinkHub from "./SeoLinkHub";
import FaqBlock, { FaqItem } from "./FaqBlock";
import ServiceShowcaseBanner from "@/components/ServiceShowcaseBanner";
import { siteConfig } from "@/lib/seo/site-config";
import { getCaseStudiesForEntity } from "@/data/seo/internal-links";

import { getAreaDetailBreadcrumbs, BreadcrumbItem } from "@/lib/seo/breadcrumbs";

interface AreaPageTemplateProps {
  area: LocalArea;
  breadcrumbs?: BreadcrumbItem[];
}

const StudentPromoBlock = () => (
  <aside id="mahidol-moving" aria-label="Student Special Offer" className="mt-4 p-4 rounded-4 shadow-sm border border-primary" style={{ backgroundColor: "rgba(13, 110, 253, 0.05)" }}>
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
          <strong>⚡ ระยะเวลาเข้ารับของ:</strong>{" "}
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

export default function AreaPageTemplate({ area, breadcrumbs }: AreaPageTemplateProps) {
  const breadcrumbItems = breadcrumbs || getAreaDetailBreadcrumbs(area);
  const matchingCaseStudies = getCaseStudiesForEntity(area.slug, "area");

  // Dynamic distance-based price matrix for this area
  const areaPrices: PriceEstimateItem[] = [
    {
      label: `ขนย้ายภายในเขต${area.areaThai} / ซอยใกล้เคียง`,
      priceStart: "เริ่มต้น 1,000 - 1,500 บาท",
      details: "ระยะทาง 0 - 15 กม. รถกระบะตู้ทึบหลังคาสูง พร้อมคนขับช่วยดูแลจัดเรียงของ เหมาะสำหรับย้ายหอพัก คอนโด",
      recommendFor: "ย้ายหอพัก, ห้องสตูดิโอ, มอเตอร์ไซค์, ส่งของด่วนในซอย",
    },
    {
      label: `ขนย้ายข้ามเขต (กรุงเทพฯ & ปริมณฑล)`,
      priceStart: "เริ่มต้น 1,200 - 2,200 บาท",
      details: `วิ่งรับ-ส่งเชื่อมต่อจาก${area.areaThai}ไปยังทุกเขตใน กทม. นนทบุรี นครปฐม สมุทรสาคร สมุทรปราการ ปทุมธานี`,
      recommendFor: "ย้ายบ้านเดี่ยว, ย้ายทาวน์โฮม, ขนย้ายคอนโด 1-2 ห้องนอน",
    },
    {
      label: `ส่งต่างจังหวัด (ภาคกลาง / ภาคตะวันออก)`,
      priceStart: "เริ่มต้น 2,500 - 4,500 บาท",
      details: "บริการเหมาคันตรงถึงปลายทาง ไม่รวมของปะปนกับผู้อื่น ปลอดภัย 100% ถึงภายในวันเดียวกัน",
      recommendFor: "ชลบุรี, ระยอง, อยุธยา, สระบุรี, ราชบุรี, ฉะเชิงเทรา ฯลฯ",
    },
    {
      label: `ส่งต่างจังหวัดระยะไกล (อีสาน / เหนือ / ใต้)`,
      priceStart: "คิดตามระยะทางจริง (กม.)",
      details: "คิดอัตราเหมาจ่ายสุทธิตั้งแต่ก่อนเริ่มงาน มีผ้าคลุมสายรัดพร้อมคนยก การันตีไม่มีค่าใช้จ่ายแอบแฝง",
      recommendFor: "ย้ายภูมิลำเนา, ย้ายบ้านข้ามภาค, ขนส่งสินค้าโรงงาน/เกษตร",
    },
  ];

  // Practical local moving FAQs combined with district-specific FAQs
  const practicalFaqs: FaqItem[] = [
    {
      question: `รถกระบะตู้ทึบเข้าชั้นใต้ดินคอนโดในย่าน${area.areaThai}ได้ไหม?`,
      answer: `รถกระบะตู้ทึบหลังคาสูงมีความสูงตู้ 2.10 เมตร (ความสูงรวมตัวรถประมาณ 2.80 - 3.00 เมตร) ซึ่งอาจเกินความสูงจำกัดของลานจอดใต้ดินอาคาร (ปกติจำกัดที่ 1.90 - 2.10 ม.) **แนะนำให้จอดเทียบจุด Loading Dock หรือจุดรับ-ส่งของหน้าล็อบบี้คอนโด** ซึ่งเป็นจุดมาตรฐานที่ปลอดภัยที่สุด โดยทีมงาน MJ-TH Express มีรถเข็นและอุปกรณ์พร้อมลำเลียงของเข้าลิฟต์ส่งตรงถึงหน้าห้องพักทันที`,
    },
    {
      question: `มีทีมงานยกของขึ้นบันไดหอพักหรือตึกแถวใน${area.areaThai}ที่ไม่มีลิฟต์หรือไม่?`,
      answer: `**มีบริการทีมงานช่วยยกของมืออาชีพ** สามารถยกของขึ้น-ลงบันไดหอพัก อพาร์ตเมนต์ หรืออาคารพาณิชย์ที่ไม่มีลิฟต์ได้ทุกชั้น เพียงแจ้งจำนวนชั้นและรายการสิ่งของขนาดใหญ่ล่วงหน้า เช่น เตียง ตู้เสื้อผ้า ตู้เย็น เราจะจัดเตรียมทีมงานยกของที่เหมาะสมเพื่อดูแลสิ่งของทุกชิ้นอย่างปลอดภัย 100%`,
    },
    {
      question: `ติดต่อเรียกรถด่วนรอบดึก หรือวันหยุดเสาร์-อาทิตย์ ในพื้นที่${area.areaThai}ได้ไหม?`,
      answer: `**ให้บริการตลอด 24 ชั่วโมง ทุกวันไม่มีวันหยุด** ไม่ว่าจะเป็นช่วงเช้าตรู่ รอบดึก วันเสาร์-อาทิตย์ หรือวันหยุดนักขัตฤกษ์ สามารถติดต่อผ่าน LINE หรือโทรหาทีมงานเพื่อเช็กคิวรถด่วนที่พร้อมเข้าหน้างานทันที หรือจองคิวล่วงหน้าตามเวลาที่ท่านสะดวกได้ตลอดเวลา`,
    },
  ];

  // Merge FAQs ensuring practical questions appear first, followed by unique area faqs
  const combinedFaqs: FaqItem[] = [
    ...practicalFaqs,
    ...(area.faqs || []).filter(
      (f) => !practicalFaqs.some((p) => p.question.includes(f.question.slice(0, 15)))
    ),
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

      {/* Service Showcase Banner Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <ServiceShowcaseBanner areaName={area.areaThai} />
        </div>
      </section>

      {/* 1. Useful Vehicle Information Before Booking */}
      <section className="py-5 bg-light border-top border-bottom" id="truck-specs">
        <div className="container" style={{ maxWidth: "1140px" }}>
          <div className="row g-4 g-lg-5 align-items-center">
            {/* Left Column: Real photo of MJ-TH Express enclosed pickup truck */}
            <div className="col-12 col-lg-5">
              <div
                className="position-relative overflow-hidden rounded-4 border shadow-sm"
                style={{
                  width: "100%",
                  aspectRatio: "4 / 3",
                  backgroundColor: "#e2e8f0",
                }}
              >
                <Image
                  src="/assets/images/best.webp"
                  alt="รถกระบะ 4 ล้อตู้ทึบ MJ-TH Express ขณะเปิดท้ายเตรียมขนย้ายสินค้าและอุปกรณ์"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 480px"
                  className="object-fit-cover"
                />
              </div>
            </div>

            {/* Right Column: Scannable specifications, condo notice, and direct CTAs */}
            <div className="col-12 col-lg-7">
              <h2
                className="fw-bold text-dark mb-3"
                style={{ fontFamily: "var(--font-prompt)", fontSize: "clamp(1.35rem, 1.15rem + 0.8vw, 1.75rem)", lineHeight: "1.3" }}
              >
                รถที่ใช้ให้บริการ เหมาะกับงานแบบไหน?
              </h2>

              <ul className="list-unstyled mb-4 d-flex flex-column gap-2" style={{ fontSize: "1rem", lineHeight: "1.7" }}>
                <li className="d-flex align-items-start gap-2">
                  <i className="bi bi-check-circle-fill text-primary mt-1 flex-shrink-0"></i>
                  <span className="text-dark">รถกระบะ 4 ล้อตู้ทึบ ช่วยป้องกันแดด ฝน และฝุ่น</span>
                </li>
                <li className="d-flex align-items-start gap-2">
                  <i className="bi bi-check-circle-fill text-primary mt-1 flex-shrink-0"></i>
                  <span className="text-dark">เหมาะสำหรับย้ายหอ คอนโด บ้านขนาดเล็ก และขนเครื่องใช้ไฟฟ้า</span>
                </li>
                <li className="d-flex align-items-start gap-2">
                  <i className="bi bi-check-circle-fill text-primary mt-1 flex-shrink-0"></i>
                  <span className="text-dark">รองรับสิ่งของจากห้อง Studio หรือคอนโด 1 ห้องนอนตามปริมาณจริง</span>
                </li>
                <li className="d-flex align-items-start gap-2">
                  <i className="bi bi-check-circle-fill text-primary mt-1 flex-shrink-0"></i>
                  <span className="text-dark">รถขนาดกระชับ เข้าซอยและจุดรับของได้สะดวก</span>
                </li>
              </ul>

              {/* Clearly visible information box */}
              <div
                className="p-3 p-md-4 rounded-3 mb-4 bg-white"
                style={{
                  border: "1px solid #cbd5e1",
                  borderLeft: "4px solid #0d6efd",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)"
                }}
              >
                <div className="d-flex align-items-center gap-2 mb-2">
                  <i className="bi bi-info-circle-fill text-primary fs-5"></i>
                  <h3
                    className="h6 fw-bold mb-0 text-dark"
                    style={{ fontFamily: "var(--font-prompt)", fontSize: "1rem" }}
                  >
                    ข้อควรรู้สำหรับคอนโด
                  </h3>
                </div>
                <p className="mb-0 text-muted" style={{ fontSize: "0.95rem", lineHeight: "1.65" }}>
                  ก่อนจอง กรุณาแจ้งความสูงทางเข้าอาคาร จุดจอดรถ และเวลาที่นิติบุคคลอนุญาตให้ขนย้าย เพื่อให้ทีมงานเลือกรถและวางแผนจุดโหลดของได้เหมาะสม
                </p>
              </div>

              {/* Two restrained CTA buttons */}
              <div className="d-flex flex-wrap gap-3">
                <a
                  href={siteConfig.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-warning fw-bold px-4 py-2.5 rounded-pill font-prompt d-inline-flex align-items-center justify-content-center gap-2 text-dark shadow-sm"
                  style={{ minHeight: "48px", fontSize: "1rem" }}
                >
                  <i className="bi bi-line fs-5"></i>
                  <span>ส่งรูปของให้ประเมินราคา</span>
                </a>
                <a
                  href={siteConfig.phoneHref}
                  className="btn btn-outline-primary fw-bold px-4 py-2.5 rounded-pill font-prompt d-inline-flex align-items-center justify-content-center gap-2"
                  style={{ minHeight: "48px", fontSize: "1rem" }}
                >
                  <i className="bi bi-telephone-fill"></i>
                  <span>โทรเช็กคิวรถ</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Area Local Overview */}
      <section className="py-5 bg-white">
        <div className="container" style={{ maxWidth: "1140px" }}>
          <div className="row g-4 g-lg-5">
            
            {/* Left Column: Localized content */}
            <div className="col-lg-7">
              <h2 className="fw-bold text-dark mb-3" style={{ fontFamily: "var(--font-prompt)", fontSize: "1.6rem" }}>
                <i className="bi bi-geo-alt-fill text-primary me-2"></i>พื้นที่ให้บริการรถรับจ้างย่าน {area.areaThai}
              </h2>
              <p className="text-muted mb-4" style={{ fontSize: "1rem", lineHeight: "1.75", maxWidth: "70ch" }}>
                {area.localIntro || area.intro}
              </p>

              {/* 2. Local Route & Landmark Coverage */}
              <div className="p-4 rounded-4 bg-light border mb-5">
                <h3 className="fw-bold mb-3 text-secondary" style={{ fontSize: "1.15rem", fontFamily: "var(--font-prompt)" }}>
                  <i className="bi bi-compass-fill text-primary me-2"></i>ความชำนาญเส้นทางและจุดรับ-ส่งสำคัญในย่าน {area.areaThai}
                </h3>
                
                {/* Landmarks */}
                {area.landmarks && area.landmarks.length > 0 && (
                  <div className="mb-3">
                    <p className="small text-muted fw-bold mb-2">
                      <i className="bi bi-building text-primary me-1"></i> คอนโด หอพัก &amp; แลนด์มาร์คสำคัญ:
                    </p>
                    <div className="d-flex flex-wrap gap-2">
                      {area.landmarks.map((landmark, idx) => (
                        <span key={idx} className="badge bg-white text-dark border px-3 py-2 rounded-pill fw-normal" style={{ fontSize: "0.88rem" }}>
                          🏢 {landmark}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pickup points & sub-districts */}
                {area.pickupPoints && area.pickupPoints.length > 0 && (
                  <div className="mb-3">
                    <p className="small text-muted fw-bold mb-2">
                      <i className="bi bi-geo-alt-fill text-danger me-1"></i> ซอยลัด ถนนสายหลัก &amp; จุดรับ-ส่งยอดนิยม:
                    </p>
                    <div className="d-flex flex-wrap gap-2">
                      {area.pickupPoints.map((pt, idx) => (
                        <span key={idx} className="badge bg-white text-dark border px-3 py-2 rounded-pill fw-normal" style={{ fontSize: "0.88rem" }}>
                          📍 {pt}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Service areas / sub-districts */}
                {area.serviceAreas && area.serviceAreas.length > 0 && (
                  <div className="mb-3">
                    <p className="small text-muted fw-bold mb-2">
                      <i className="bi bi-map-fill text-success me-1"></i> แขวง/ตำบลที่ครอบคลุม:
                    </p>
                    <div className="d-flex flex-wrap gap-2">
                      {area.serviceAreas.map((sa, idx) => (
                        <span key={idx} className="badge bg-success-subtle text-success-emphasis border border-success-subtle px-3 py-2 rounded-pill fw-normal" style={{ fontSize: "0.88rem" }}>
                          ✓ {sa}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular routes */}
                {area.popularRoutes && area.popularRoutes.length > 0 && (
                  <div>
                    <p className="small text-muted fw-bold mb-2">
                      <i className="bi bi-arrow-left-right text-info me-1"></i> เส้นทางขนย้ายที่วิ่งประจำ:
                    </p>
                    <div className="d-flex flex-wrap gap-2">
                      {area.popularRoutes.map((route, idx) => (
                        <span key={idx} className="badge bg-primary-subtle text-primary-emphasis border border-primary-subtle px-3 py-2 rounded-pill fw-normal" style={{ fontSize: "0.88rem" }}>
                          🚛 {route}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Special Salaya Student Promo */}
              {area.slug === 'salaya' && (
                <div className="mb-5">
                  <StudentPromoBlock />
                  <LocalProximityBlock proximityBlocks={area.proximityBlocks} />
                </div>
              )}

              {/* Pain points vs solutions */}
              <div className="mb-4">
                <h3 className="fw-bold text-dark mb-3" style={{ fontFamily: "var(--font-prompt)", fontSize: "1.35rem" }}>
                  <i className="bi bi-shield-check text-success me-2"></i>แนวทางรับมือปัญหาการขนย้ายในพื้นที่ {area.areaThai}
                </h3>
                <div className="d-flex flex-column gap-3">
                  {area.painPoints?.map((pain, idx) => (
                    <div className="p-3 p-md-3.5 border rounded-3 bg-light d-flex flex-column gap-1" key={idx} style={{ borderLeft: "4px solid #f59e0b" }}>
                      <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-exclamation-triangle-fill text-warning flex-shrink-0"></i>
                        <strong className="text-dark" style={{ fontSize: "0.95rem" }}>ปัญหา: {pain}</strong>
                      </div>
                      <div className="d-flex align-items-start gap-2 ms-4">
                        <i className="bi bi-arrow-return-right text-success flex-shrink-0 mt-1"></i>
                        <span className="text-muted" style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
                          แนวทางแก้ไข: {area.solutionBullets?.[idx] || "ทีมงานชำนาญการและจัดเตรียมรถที่เหมาะสมเข้าช่วยเหลือทันที"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Local Advantages & Popular Services */}
            <div className="col-lg-5">
              <div className="p-4 rounded-4 border shadow-sm" style={{ backgroundColor: "#fafbfc" }}>
                <h3 className="fw-bold text-secondary mb-3" style={{ fontSize: "1.2rem", fontFamily: "var(--font-prompt)" }}>
                  <i className="bi bi-star-fill text-warning me-2"></i>จุดเด่นรถรับจ้าง MJ-TH {area.areaThai}
                </h3>
                
                <div className="d-flex flex-column gap-3 mb-4">
                  {area.localAdvantages?.map(([title, desc], idx) => (
                    <div key={idx} className="border-bottom pb-2.5">
                      <strong className="text-dark d-block mb-1" style={{ fontFamily: "var(--font-prompt)", fontSize: "0.95rem" }}>
                        <i className="bi bi-check2 text-success me-1.5"></i>{title}
                      </strong>
                      <span className="text-muted small" style={{ lineHeight: "1.65", display: "block" }}>{desc}</span>
                    </div>
                  ))}
                </div>

                <hr className="my-4" />

                <h4 className="fw-bold text-primary mb-3" style={{ fontSize: "1.1rem", fontFamily: "var(--font-prompt)" }}>
                  <i className="bi bi-box-seam-fill text-primary me-2"></i>บริการยอดนิยมย่าน {area.areaThai}
                </h4>
                <div className="d-flex flex-wrap gap-2" itemScope itemType="https://schema.org/Service">
                  {area.popularServices?.map((serv, idx) => (
                    <span key={idx} className="badge bg-primary px-3 py-2 rounded-pill fw-normal" style={{ fontSize: "0.85rem" }} itemProp="name">
                      {serv}
                    </span>
                  ))}
                </div>

                <div className="mt-4 p-3 rounded-3 bg-warning-subtle text-warning-emphasis border border-warning-subtle d-flex align-items-start gap-2">
                  <i className="bi bi-clock-history mt-0.5 flex-shrink-0"></i> 
                  <span className="small leading-relaxed">สอบถามคิวรถและระยะเวลาเข้ารับงานตามพิกัดและสภาพการจราจรได้ตลอด 24 ชม.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Case studies in this local area */}
      {((area.workCards && area.workCards.length > 0) || matchingCaseStudies.length > 0) && (
        <section className="py-5 bg-light border-top">
          <div className="container" style={{ maxWidth: "1140px" }}>
            {area.workCards && area.workCards.length > 0 && (
              <>
                <div className="text-center mb-5">
                  <h2 className="fw-bold text-dark" style={{ fontFamily: "var(--font-prompt)", fontSize: "1.6rem" }}>
                    <i className="bi bi-images text-primary me-2"></i>ภาพผลงานการขนของ ย้ายของ ในเขต {area.areaThai}
                  </h2>
                  <div className="title-underline"></div>
                  <p className="text-muted" style={{ maxWidth: "65ch", margin: "0 auto" }}>รีวิวงานจริงจากลูกค้าที่ใช้บริการกระบะตู้ทึบรับจ้างย่าน{area.areaThai}</p>
                </div>
                
                <div className="row g-4">
                  {area.workCards.map((card, idx) => (
                    <div className="col-md-4" key={idx}>
                      <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white">
                        <div style={{ position: "relative", height: "220px", backgroundColor: "#f1f5f9" }}>
                          <Image 
                            src={card.imgSrc} 
                            alt={card.alt} 
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-fit-cover"
                          />
                        </div>
                        <div className="card-body p-3 p-md-4">
                          <h3 className="card-title fw-bold" style={{ fontFamily: "var(--font-prompt)", fontSize: "1.05rem" }}>
                            {card.title}
                          </h3>
                          <p className="card-text text-muted small mb-0" style={{ lineHeight: "1.6" }}>{card.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Real matching case studies */}
            {matchingCaseStudies.length > 0 && (
              <div className={`${area.workCards && area.workCards.length > 0 ? "mt-5 pt-4 border-top" : ""}`}>
                <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
                  <div>
                    <h3 className="fw-bold text-dark mb-1" style={{ fontFamily: "var(--font-prompt)", fontSize: "1.3rem" }}>
                      <i className="bi bi-journal-bookmark-fill text-primary me-2"></i>ผลงานจริงที่เกี่ยวข้อง
                    </h3>
                    <p className="text-muted small mb-0">กรณีศึกษาและบันทึกงานขนย้ายจริงที่เชื่อมโยงกับพื้นที่{area.areaThai}</p>
                  </div>
                  <Link href="/case-studies" className="btn btn-outline-primary btn-sm rounded-pill px-3">
                    ดูกรณีศึกษาทั้งหมด <i className="bi bi-arrow-right ms-1"></i>
                  </Link>
                </div>
                
                <div className="row g-3">
                  {matchingCaseStudies.map((cs) => (
                    <div className="col-12 col-md-6" key={cs.slug}>
                      <div className="card h-100 border border-primary-subtle shadow-sm rounded-4 p-3 bg-white">
                        <div className="d-flex align-items-start gap-3">
                          <div className="position-relative flex-shrink-0 rounded-3 overflow-hidden" style={{ width: "96px", height: "80px", backgroundColor: "#f1f5f9" }}>
                            <Image
                              src={cs.image}
                              alt={cs.alt}
                              fill
                              sizes="96px"
                              className="object-fit-cover"
                            />
                          </div>
                          <div className="flex-grow-1 min-w-0">
                            <span className="badge bg-primary-subtle text-primary mb-1 fw-medium" style={{ fontSize: "0.75rem" }}>
                              {cs.jobType}
                            </span>
                            <h4 className="fw-bold text-dark mb-1 text-truncate" style={{ fontSize: "0.95rem", fontFamily: "var(--font-prompt)" }}>
                              <Link href={`/case-studies/${cs.slug}`} className="text-decoration-none text-dark hover-primary">
                                {cs.shortTitle || cs.title}
                              </Link>
                            </h4>
                            <p className="text-muted small mb-2 text-truncate" style={{ fontSize: "0.8rem", lineHeight: "1.4" }}>
                              {cs.description}
                            </p>
                            <Link href={`/case-studies/${cs.slug}`} className="text-primary fw-medium small text-decoration-none d-inline-flex align-items-center" style={{ fontSize: "0.8rem" }}>
                              อ่านรายละเอียดผลงานจริง <i className="bi bi-chevron-right ms-1" style={{ fontSize: "0.7rem" }}></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 3. Transparent Price Guidance Matrix */}
      <PricingGuideBlock
        title={`ตารางประเมินราคาค่าบริการรถรับจ้างย่าน${area.areaThai} (ตามระยะทางจริง)`}
        subtitle="คิดราคาโปร่งใสตามระยะทางจริงและขนาดงาน แจ้งราคาสุทธิตั้งแต่ก่อนเริ่มงาน ไม่มีบวกเพิ่ม"
        customPrices={areaPrices}
        priceNotes={`อัตราค่าบริการเริ่มต้นจากพื้นที่${area.areaThai} คำนวณตามระยะทางจริงและจำนวนทีมงานยกของที่ลูกค้าเลือก การันตีราคาตามที่ตกลง ไม่มีค่าทางด่วนหรือค่าน้ำมันแอบแฝงเพิ่มเติม`}
      />

      {/* 4. Local Moving FAQ Accordion */}
      <FaqBlock
        id={`faq-${area.slug}`}
        items={combinedFaqs}
        title={`คำถามที่พบบ่อย (FAQ) - รถรับจ้าง${area.areaThai}`}
        subtitle={`คำตอบเคลียร์ชัดสำหรับคนต้องการรถขนของ ย้ายบ้าน ย้ายหอพัก คอนโด ย่าน${area.areaThai}`}
      />

      {/* Related semantic internal links */}
      <RelatedLinks currentSlug={area.slug} entityType="area" />

      {/* Global hub */}
      <SeoLinkHub excludeSlug={area.slug} />
    </>
  );
}
