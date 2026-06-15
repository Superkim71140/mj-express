import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { motorcycleFaqs } from "@/data/faqs";
import FAQAccordion from "@/components/FAQAccordion";
import JsonLd from "@/components/JsonLd";
import SectionTitle from "@/components/SectionTitle";
import MotorcycleHero from "@/components/MotorcycleHero";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "รับส่งมอเตอร์ไซค์ ฝั่งธน บางแค ทั่ว กทม. ไปต่างจังหวัด - MJ-TH Express",
  description:
    "บริการขนส่งมอเตอร์ไซค์ BigBike รถเล็ก ข้ามจังหวัด รับรถถึงหน้าบ้านทั่ว กทม. ปริมณฑล เน้นพื้นที่ฝั่งธน บางแค หนองแขม ตลิ่งชัน พระราม 2 ห่อหุ้มฟรี มีประกัน 100% โทร 095-583-0371",
  canonicalPath: "/motorcycle-transport",
  ogImage: "/motorcycle.webp",
  ogImageAlt: "บริการขนส่งมอเตอร์ไซค์ BigBike รถเล็ก ข้ามจังหวัด",
});

export default function MotorcyclePage() {
  const districtBadges = [
    "ธนบุรี",
    "คลองสาน",
    "บางกอกใหญ่",
    "บางกอกน้อย",
    "ตลิ่งชัน",
    "ทวีวัฒนา",
    "ภาษีเจริญ",
    "บางแค",
    "หนองแขม",
    "ราษฎร์บูรณะ",
    "ทุ่งครุ",
    "จอมทอง",
    "บางบอน",
    "บางขุนเทียน",
    "กรุงเทพมหานคร",
    "ปริมณฑล",
  ];

  // MovingCompany Schema
  const companySchema = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    "name": siteConfig.businessName,
    "telephone": siteConfig.phone,
    "url": "https://mj-th-express.com/motorcycle-transport",
    "areaServed": districtBadges,
    "description": "บริการรับส่งรถมอเตอร์ไซค์ไปต่างจังหวัด รถบิ๊กไบค์ รถเล็ก ห่อหุ้มกันรอยฟรี รับถึงหน้าบ้าน",
  };

  // Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Motorcycle Transport",
    "provider": {
      "@type": "MovingCompany",
      "name": siteConfig.businessName,
      "telephone": siteConfig.phone,
    },
    "areaServed": districtBadges,
    "description": "บริการรับส่งรถมอเตอร์ไซค์ไปต่างจังหวัด รถบิ๊กไบค์ รถเล็ก ห่อหุ้มกันรอยฟรี รับถึงหน้าบ้าน ราคาถูก",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "THB",
      "price": "1500",
      "description": "ราคาเริ่มต้นสำหรับการขนส่งมอเตอร์ไซค์",
    },
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": motorcycleFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "หน้าแรก",
        "item": "https://mj-th-express.com",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "บริการส่งมอเตอร์ไซค์",
        "item": "https://mj-th-express.com/motorcycle-transport",
      },
    ],
  };

  return (
    <>
      <JsonLd data={[companySchema, serviceSchema, faqSchema, breadcrumbSchema]} />

      <MotorcycleHero />

      {/* Showcase Gallery */}
      <section className="py-5 bg-light">
        <div className="container">
          <SectionTitle
            title="ผลงานจริง การันตีคุณภาพ"
            subtitle="ภาพจากหน้างานจริง มั่นใจได้ในความปลอดภัย"
          />

          <div className="row g-4">
            <div className="col-md-8">
              <div className="premium-gallery-card" style={{ minHeight: "520px" }}>
                <Image
                  src="/assets/images/S__11985366.webp"
                  alt="ขนส่งบิ๊กไบค์ Ducati"
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                />
                <div className="gallery-mask-overlay">
                  <h5>BigBike ระดับ High-End</h5>
                  <p>ดูแลพิเศษ ห่อหุ้มหนา ล็อคแน่นหนา ปลอดภัย 100%</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 d-flex flex-column gap-4">
              <div className="premium-gallery-card position-relative" style={{ height: "248px" }}>
                <Image
                  src="/assets/images/S__12230704.webp"
                  alt="รถมอเตอร์ไซค์คลาสสิค"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                />
                <div className="gallery-mask-overlay">
                  <h5>Classic Bike / Cafe Racer</h5>
                  <p>รถสะสม รถหายาก เราดูแลให้อย่างดี</p>
                </div>
              </div>
              <div className="premium-gallery-card position-relative" style={{ height: "248px" }}>
                <Image
                  src="/assets/images/S__12230707.webp"
                  alt="รถวิบาก โมโตครอส"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                />
                <div className="gallery-mask-overlay">
                  <h5>Motocross / รถวิบาก</h5>
                  <p>ขนส่งไปสนามแข่ง หรือส่งกลับบ้าน</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="premium-gallery-card position-relative" style={{ height: "300px" }}>
                <Image
                  src="/assets/images/S__12230709.webp"
                  alt="รถรับจ้างขนส่งมอเตอร์ไซค์ ลิฟต์ท้าย"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                />
                <div className="gallery-mask-overlay">
                  <h5>อุปกรณ์ครบครัน</h5>
                  <p>รถตู้ทึบหลังคาสูง พร้อมทางลาดอลูมิเนียมและสายรัดหนาพิเศษ</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="premium-gallery-card position-relative" style={{ height: "300px" }}>
                <Image
                  src="/assets/images/S__12230711.webp"
                  alt="รับส่งมอเตอร์ไซค์ รถเล็ก"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                />
                <div className="gallery-mask-overlay">
                  <h5>รถเล็ก / รถใช้งาน</h5>
                  <p>ห่อหุ้มฟรี ล็อคแน่นหนาในตู้ทึบกันฝุ่นและกันฝน 100%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Info Section */}
      <section className="py-5 bg-white border-top">
        <div className="container">
          <SectionTitle
            title="มาตรฐานการดูแลความปลอดภัยระดับ VIP"
            subtitle="ทำไมลูกค้าส่วนใหญ่เลือกใช้บริการส่งมอเตอร์ไซค์กับเรา"
          />

          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="vip-feature-card">
                <div className="vip-icon-box">
                  <i className="bi bi-box-seam-fill"></i>
                </div>
                <h5 className="fw-bold mb-3">ห่อหุ้มกันรอยฟรี</h5>
                <p className="mb-0">
                  เราใช้แอร์บับเบิ้ลห่อหุ้มชิ้นส่วนสำคัญ แฮนด์ ท่อไอเสีย ถังน้ำมัน
                  และจุดสัมผัสเพื่อป้องกันริ้วรอยขีดข่วนตลอดการเดินทาง
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="vip-feature-card">
                <div className="vip-icon-box">
                  <i className="bi bi-shield-fill-check"></i>
                </div>
                <h5 className="fw-bold mb-3">มีประกันสินค้า</h5>
                <p className="mb-0">
                  รับประกันภัยสินค้าเสียหายทุกเที่ยวการขนส่ง กรณีชำรุดเสียหายระหว่างเคลื่อนย้าย
                  รับผิดชอบชดใช้ค่าเสียหายตามจริง
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="vip-feature-card">
                <div className="vip-icon-box">
                  <i className="bi bi-truck-flatbed"></i>
                </div>
                <h5 className="fw-bold mb-3">ระบบยึดล็อคหนาแน่น</h5>
                <p className="mb-0">
                  ใช้ชุดล็อคหน้าล้อกันล้ม สายรัดสลิงหนาพิเศษรัดแยกอิสระ 4 จุด
                  ยึดล็อคกับโครงสร้างรถตู้ทึบอย่างมั่นคง ไม่ขยับเขยื้อน
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="vip-feature-card">
                <div className="vip-icon-box">
                  <i className="bi bi-person-fill-check"></i>
                </div>
                <h5 className="fw-bold mb-3">ทีมงานยกของมืออาชีพ</h5>
                <p className="mb-0">
                  พนักงานของเรามีประสบการณ์สูง รู้วิธีการยกลงและขึ้นทางลาดอย่างปลอดภัย
                  พร้อมสะพานลาดอลูมิเนียมลดความสูง
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers Section */}
      <section className="py-5 bg-light border-top">
        <div className="container">
          <SectionTitle
            title="อัตราค่าบริการขนส่งมอเตอร์ไซค์"
            subtitle="ราคาโปร่งใส ไม่มีบวกเพิ่มหน้างาน"
          />

          <div className="row justify-content-center g-4">
            {/* Tier 1 */}
            <div className="col-md-4">
              <div className="price-card-pro">
                <div className="price-head bg-gradient-1">
                  <h4 className="fw-bold mb-2">รถเล็กทั่วไป</h4>
                  <div className="small opacity-75">100cc - 150cc</div>
                </div>
                <div className="price-body">
                  <div className="text-center mb-4">
                    <span className="price-price">1,500</span>
                    <span className="text-muted ms-1">บาท/คัน</span>
                  </div>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i> ห่อหุ้มกันรอย 1 ชั้น</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i> ล็อคล้อหนา 2 จุด</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i> ขนส่งด้วยตู้ทึบกันฝน 100%</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i> ประกันสินค้าเสียหายพื้นฐาน</li>
                  </ul>
                  <a href={siteConfig.lineUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary w-100 rounded-pill fw-bold">จองคิวรถขนส่ง</a>
                </div>
              </div>
            </div>

            {/* Tier 2 */}
            <div className="col-md-4">
              <div className="price-card-pro popular">
                <div className="price-head bg-gradient-2">
                  <h4 className="fw-bold mb-2">BigBike / Chopper</h4>
                  <div className="small opacity-90">250cc - 650cc</div>
                </div>
                <div className="price-body">
                  <div className="text-center mb-4">
                    <span className="price-price">2,500</span>
                    <span className="text-muted ms-1">บาท/คัน</span>
                  </div>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i> ห่อหุ้มกันรอยหนา 2 ชั้น</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i> ล็อคล้อหนาแน่น 4 จุดแยก</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i> ลิฟต์ยกรถด้วยไฮดรอลิกส์</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i> ขนตู้ทึบพิเศษ กันแดดฝุ่น</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i> ประกันความเสียหายเต็มวงเงิน</li>
                  </ul>
                  <a href={siteConfig.lineUrl} target="_blank" rel="noopener noreferrer" className="btn btn-success btn-shine w-100 rounded-pill fw-bold text-white">ยอดนิยม จองคิวเลย</a>
                </div>
              </div>
            </div>

            {/* Tier 3 */}
            <div className="col-md-4">
              <div className="price-card-pro">
                <div className="price-head bg-gradient-3">
                  <h4 className="fw-bold mb-2">VIP / Superbike</h4>
                  <div className="small opacity-75">1000cc+ / รถสะสม</div>
                </div>
                <div className="price-body">
                  <div className="text-center mb-4">
                    <span className="price-price">3,500</span>
                    <span className="text-muted ms-1">บาท/คัน</span>
                  </div>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i> ห่อกันกระแทกหนา 3 ชั้นพิเศษ</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i> แท่นยึดล้อหน้าหลัง 6 จุด</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i> ขนส่งด้วยรถตู้ล็อคเดี่ยว VIP</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i> โหลดขึ้นลิฟต์ท้ายกันโครงสร้างกระแทก</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i> ประกันภัยวงเงินพิเศษ Premium</li>
                  </ul>
                  <a href={siteConfig.lineUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary w-100 rounded-pill fw-bold">จองคิวรถ VIP</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local District badges list for ฝั่งธนบุรี */}
      <section className="py-5 bg-white border-top">
        <div className="container">
          <SectionTitle
            title="จุดจอดรอรับรถมอเตอร์ไซค์ โซนฝั่งธนบุรี"
            subtitle="บริการด่วน เรียกรับรถถึงหน้าบ้านในเขตกรุงเทพและปริมณฑล"
          />
          <div className="text-center max-width-900 mx-auto">
            <div className="d-flex flex-wrap justify-content-center gap-2">
              {districtBadges.map((badge) => (
                <span key={badge} className="district-badge">
                  <i className="bi bi-geo-alt-fill me-1 text-primary"></i>
                  {badge}
                </span>
              ))}
            </div>
            <p className="text-muted small mt-4">
              *ทีมงานของเรามีจุดแสตนบายรถกระบะขนส่งครอบคลุมเกือบทุกเขตฝั่งธนฯ ทำให้สามารถเข้ารับรถจักรยานยนต์ถึงหน้าบ้านท่านได้ภายในเวลาอันรวดเร็ว
            </p>
          </div>
        </div>
      </section>

      {/* Documents Required Info (Premium Slanted Section) */}
      <section className="docs-section-premium py-5 text-white">
        <div className="container py-4">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <h3 className="fw-bold mb-3 text-warning">เอกสารที่ต้องใช้ในการจัดส่ง</h3>
              <p className="opacity-90 mb-4 lh-lg">
                เพื่อความถูกต้องตามข้อกำหนดทางกฎหมายในการขนส่งสิ่งของข้ามจังหวัด
                รบกวนลูกค้าจัดเตรียมเอกสารที่จำเป็นสำหรับการตรวจสอบของด่านตรวจทางหลวง ดังนี้:
              </p>

              <div className="d-flex flex-column gap-3 mb-4">
                <div className="doc-warning-note">
                  <i className="bi bi-file-earmark-pdf-fill me-2 fs-5 text-warning"></i>
                  <span>1. สำเนาคู่มือจดทะเบียนรถ (เล่มทะเบียนรถหน้าเจ้าของคนล่าสุด)</span>
                </div>
                <div className="doc-warning-note">
                  <i className="bi bi-card-id me-2 fs-5 text-warning"></i>
                  <span>2. สำเนาบัตรประจำตัวประชาชนของเจ้าของรถ หรือผู้ส่ง</span>
                </div>
              </div>
              <p className="small text-warning-emphasis">
                {'*สามารถขีดคร่อมเขียนกำกับ "ใช้เพื่อการจัดส่งมอเตอร์ไซค์กับ MJ-TH Express เท่านั้น"'}
              </p>
            </div>
            <div className="col-lg-6">
              <div className="process-box-white text-dark p-4 rounded-4 shadow">
                <h4 className="fw-bold mb-4 text-primary"><i className="bi bi-hourglass-split me-2 text-warning"></i>ขั้นตอนเตรียมความพร้อม</h4>
                <div className="timeline-item">
                  <div className="timeline-badge">1</div>
                  <h5>เตรียมเอกสาร</h5>
                  <p className="small text-muted mb-0">เซ็นสำเนาทะเบียนรถและบัตรประชาชน แนบเตรียมพร้อมให้คนขับในวันรับรถ</p>
                </div>
                <div className="timeline-item">
                  <div className="timeline-badge">2</div>
                  <h5>ลดระดับน้ำมัน</h5>
                  <p className="small text-muted mb-0">น้ำมันสามารถมีในถังได้เพื่อความปลอดภัยในการขนย้าย (แนะนำ 1/4 ของถัง)</p>
                </div>
                <div className="timeline-item">
                  <div className="timeline-badge">3</div>
                  <h5>ส่งกุญแจรถ</h5>
                  <p className="small text-muted mb-0">จำเป็นต้องส่งกุญแจรถให้ทีมงานขนย้ายเพื่ออำนวยความสะดวกในการเข็นขึ้น-ลงรถ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-5 bg-light border-top">
        <div className="container">
          <SectionTitle
            title="คำถามที่พบบ่อย (FAQs)"
            subtitle="คำถามที่พบบ่อยเกี่ยวกับการขนส่งรถจักรยานยนต์"
          />

          <div className="faq-wrapper" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <FAQAccordion id="faqAccordionMotorcycle" items={motorcycleFaqs} />
          </div>
        </div>
      </section>
    </>
  );
}
