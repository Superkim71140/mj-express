import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/seo/site-config";
import { homepageFaqs } from "@/data/faqs";
import { buildPageMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/JsonLd";
import HeroCarousel from "@/components/HeroCarousel";
import SectionTitle from "@/components/SectionTitle";
import FAQAccordion from "@/components/FAQAccordion";
import ReviewsSlider from "@/components/ReviewsSlider";
import SeoLinkHub from "@/components/seo/SeoLinkHub";


export const metadata: Metadata = buildPageMetadata({
  title: "รถรับจ้างย้ายบ้าน ขนของ ขนส่งมอเตอร์ไซค์ กระบะตู้ทึบ 4 ล้อ - MJ-TH Express",
  description:
    "บริการรถรับจ้าง 4 ล้อตู้ทึบ ขนของ ย้ายบ้าน ย้ายหอพัก คอนโด ทั่วไทย กันฝน 100% พร้อมทีมคนยกของมืออาชีพ เริ่มต้นที่บางแค ฝั่งธนฯ ประเมินราคาฟรี โทร 095-583-0371",
  canonicalPath: "/",
  ogImage: "/assets/images/work4.webp",
  ogImageAlt: "MJ-TH Express รถรับจ้างบางแค ย้ายบ้าน ขนของ",
});

export default function HomePage() {
  // MovingCompany Schema Data
  const movingCompanySchema = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    "name": siteConfig.businessFullName,
    "image": `${siteConfig.baseUrl}/assets/images/work4.webp`,
    "@id": `${siteConfig.baseUrl}/#moving-company`,
    "url": siteConfig.baseUrl,
    "telephone": siteConfig.phone,
    "priceRange": siteConfig.priceRange,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.address.streetAddress,
      "addressLocality": siteConfig.address.addressLocality,
      "addressRegion": siteConfig.address.addressRegion,
      "postalCode": siteConfig.address.postalCode,
      "addressCountry": siteConfig.address.addressCountry,
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": siteConfig.geo.latitude,
      "longitude": siteConfig.geo.longitude,
    },
    "areaServed": siteConfig.serviceAreas,
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      "opens": "00:00",
      "closes": "23:59",
    },
    "sameAs": [
      siteConfig.facebookUrl,
      siteConfig.lineUrl,
    ],
    "description": "MJ-TH Express บริการรถรับจ้างขนของ ย้ายบ้าน ย้ายหอ ขนส่งสินค้า ด้วยรถกระบะตู้ทึบ 4 ล้อ พิกัดบางแค กรุงเทพฯ และทั่วไทย",
  };

  // FAQ Schema Data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": homepageFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer.replace(/\*\*/g, "").replace(/\*/g, ""),
      },
    })),
  };

  return (
    <>
      {/* Dynamic SEO Schemas */}
      <JsonLd data={[movingCompanySchema, faqSchema]} />

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="container-fluid px-0">
          <HeroCarousel />
        </div>

        {/* Visible accessible H1 heading for SEO matching brand visual styles */}
        <div className="container mt-4 text-center">
          <h1 className="fw-bold text-secondary fs-3 mb-2" style={{ fontFamily: "var(--font-prompt)" }}>
            รถรับจ้างขนของ ย้ายบ้าน ย้ายหอพัก ด้วยรถกระบะ 4 ล้อตู้ทึบ บริการทั่วไทย
          </h1>
          <p className="text-muted small max-width-700 mx-auto">
            บริการรถรับจ้างขนย้ายครบวงจร พิกัดหลักบางแค เพชรเกษม ฝั่งธนบุรี บุกหน้างานไว พร้อมทีมงานยกของมืออาชีพ ปลอดภัยจากแดดและฝน 100%
          </p>
        </div>

        {/* Mobile Action Buttons (Visible only on mobile viewports) */}
        <div className="container d-md-none mt-4 mb-4">
          <div className="mobile-action-overlay d-flex flex-column gap-3">
            <a
              href={siteConfig.phoneHref}
              className="btn btn-danger btn-lg w-100 fw-bold shadow-lg rounded-pill mobile-btn-pulse"
            >
              <i className="bi bi-telephone-fill me-2"></i> โทรเลย {siteConfig.phone}
            </a>
            <a
              href={siteConfig.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success btn-lg w-100 fw-bold shadow-lg rounded-pill mobile-btn-pulse"
            >
              <i className="bi bi-line me-2"></i> LINE: {siteConfig.lineId}
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="container mt-4 mb-5">
        <div className="stats-section">
          <div className="row g-0">
            <div className="col-md-4">
              <div className="stat-item border-right-custom">
                <i className="bi bi-truck stat-icon"></i>
                <h2>3,000+</h2>
                <p>เที่ยวขนส่งสำเร็จ</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stat-item border-right-custom">
                <i className="bi bi-map stat-icon"></i>
                <h2>77</h2>
                <p>จังหวัดทั่วประเทศไทย</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stat-item">
                <h2>100%</h2>
                <p>ลูกค้าพึงพอใจ</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Highlight Section */}
      <section id="portfolio-highlight" className="section-padding bg-light pb-5">
        <div className="container">
          <SectionTitle
            title="ผลงานการขนส่ง"
            subtitle="ตัวอย่างความไว้วางใจจากลูกค้าของเรา"
          />

          <div className="row g-4">
            <div className="col-md-6">
              <div className="mb-4 position-relative" style={{ height: "550px", overflow: "hidden", borderRadius: "16px" }}>
                <Image
                  src="/assets/images/work1.webp"
                  alt="รถรับจ้างบางแค ย้ายบ้าน ขนของไปต่างจังหวัด"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                  className="shadow rounded-4"
                  loading="lazy"
                />
              </div>
              <div className="mb-4 position-relative" style={{ height: "550px", overflow: "hidden", borderRadius: "16px" }}>
                <Image
                  src="/assets/images/work2.webp"
                  alt="บริการขนส่งมอเตอร์ไซค์ บางแค ราคาถูก"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                  className="shadow rounded-4"
                  loading="lazy"
                />
              </div>
              <div className="position-relative" style={{ height: "550px", overflow: "hidden", borderRadius: "16px" }}>
                <Image
                  src="/assets/images/work3.webp"
                  alt="รีวิวขนส่งมอเตอร์ไซค์บิ๊กไบค์ ไปต่างจังหวัด โดย MJ-TH Express"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                  className="shadow rounded-4"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-4 position-relative" style={{ height: "550px", overflow: "hidden", borderRadius: "16px" }}>
                <Image
                  src="/assets/images/work4.webp"
                  alt="รถรับจ้าง 4 ล้อตู้ทึบ ขนของย้ายหอพัก ราคาถูก"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                  className="shadow rounded-4"
                  loading="lazy"
                />
              </div>
              <div className="mb-4 position-relative" style={{ height: "550px", overflow: "hidden", borderRadius: "16px" }}>
                <Image
                  src="/assets/images/work5.webp"
                  alt="ผลงานขนส่งย้ายบ้านหอพักโดย MJ-TH Express"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                  className="shadow rounded-4"
                  loading="lazy"
                />
              </div>
              <div className="position-relative" style={{ height: "550px", overflow: "hidden", borderRadius: "16px" }}>
                <Image
                  src="/assets/images/work6.webp"
                  alt="ผลงานขนย้ายของสำนักงาน คอนโด"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                  className="shadow rounded-4"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <Link
              href="/portfolio"
              className="btn btn-primary btn-shine btn-lg rounded-pill px-5 py-3 shadow fw-bold text-white text-decoration-none"
            >
              <i className="bi bi-images me-2"></i> ดูรีวิวเพิ่มเติม (คลิก)
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-light border-top">
        <div className="container">
          <SectionTitle
            title="บริการขนย้ายและขนส่งมอเตอร์ไซค์"
            subtitle="MJ-TH Express พร้อมดูแลทุกเรื่องการขนย้าย ครบ จบ ในที่เดียว"
          />

          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="service-card">
                <div className="service-icon">
                  <i className="bi bi-house-check-fill"></i>
                </div>
                <h4 className="fw-bold mb-3">ย้ายบ้าน/คอนโด</h4>
                <p className="text-muted small">
                  บริการรถรับจ้างย้ายบ้าน ย้ายหอพัก สำนักงาน ด้วยรถกระบะ 4 ล้อตู้ทึบ
                  กันแดดกันฝน 100% พร้อมทีมงานมืออาชีพช่วยแพ็คและยกของอย่างระมัดระวัง
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="service-card">
                <div className="service-icon">
                  <i className="bi bi-bicycle"></i>
                </div>
                <h4 className="fw-bold mb-3">ส่งมอเตอร์ไซค์</h4>
                <p className="text-muted small">
                  รับส่งรถจักรยานยนต์ทุกรุ่น ตั้งแต่รถเล็กทั่วไปจนถึง BigBike หรูหรา
                  แพ็คกันรอยหนาพิเศษ 3 ชั้น ล็อคแน่นหนา ปลอดภัย ส่งถึงหน้าบ้านทั่วประเทศ
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="service-card">
                <div className="service-icon">
                  <i className="bi bi-boxes"></i>
                </div>
                <h4 className="fw-bold mb-3">ส่งสินค้าทั่วไป</h4>
                <p className="text-muted small">
                  รถรับจ้างตู้ทึบรับส่งพัสดุชิ้นใหญ่ เครื่องใช้ไฟฟ้า เฟอร์นิเจอร์
                  สินค้าโรงงาน เหมาคันกระจายสินค้าด่วนทั่วประเทศ ปลอดภัยตรงเวลา
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="service-card">
                <div className="service-icon">
                  <i className="bi bi-heart-fill"></i>
                </div>
                <h4 className="fw-bold mb-3">ขนส่งสัตว์เลี้ยง</h4>
                <p className="text-muted small">
                  บริการขนย้ายสัตว์เลี้ยงแสนรัก สุนัข แมว ข้ามจังหวัดด้วยความใส่ใจ
                  ปลอดภัย มีแอร์พัดลมระบายอากาศ ดูแลอย่างดีตลอดการเดินทาง
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="section-padding">
        <div className="container">
          <SectionTitle
            title="ขั้นตอนการใช้บริการ"
            subtitle="สะดวกรวดเร็ว เพียง 4 ขั้นตอน ของถึงมือผู้รับอย่างปลอดภัย"
          />

          <div className="process-wrapper">
            <div className="process-line d-none d-lg-block"></div>
            <div className="row g-4">
              <div className="col-md-6 col-lg-3">
                <div className="process-step-item text-center">
                  <div className="process-icon-wrapper">
                    <i className="bi bi-chat-dots-fill"></i>
                    <div className="step-badge">1</div>
                  </div>
                  <div className="process-content">
                    <h5 className="process-title">1. ติดต่อแจ้งงาน</h5>
                    <p className="process-desc">แอดไลน์หรือโทรแจ้งรายละเอียด ต้นทาง-ปลายทาง และส่งรูปของที่ต้องการย้าย</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="process-step-item text-center">
                  <div className="process-icon-wrapper">
                    <i className="bi bi-clipboard-check-fill"></i>
                    <div className="step-badge">2</div>
                  </div>
                  <div className="process-content">
                    <h5 className="process-title">2. สรุปราคา & นัดหมาย</h5>
                    <p className="process-desc">เจ้าหน้าที่ประเมินราคาที่แน่นอน (ไม่มีบวกเพิ่ม) พร้อมล็อคคิวรถและนัดเวลาทันที</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="process-step-item text-center">
                  <div className="process-icon-wrapper">
                    <i className="bi bi-truck-front-fill"></i>
                    <div className="step-badge">3</div>
                  </div>
                  <div className="process-content">
                    <h5 className="process-title">3. เข้าขนย้าย</h5>
                    <p className="process-desc">รถเข้ารับตรงเวลา พร้อมทีมงานมืออาชีพช่วยแพ็คและยกของ ดูแลสินค้าอย่างดี</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="process-step-item text-center">
                  <div className="process-icon-wrapper">
                    <i className="bi bi-geo-alt-fill"></i>
                    <div className="step-badge">4</div>
                  </div>
                  <div className="process-content">
                    <h5 className="process-title">4. ส่งถึงปลายทาง</h5>
                    <p className="process-desc">นำส่งถึงที่หมายอย่างปลอดภัย รวดเร็ว ตรวจเช็คสินค้าก่อนส่งมอบงาน</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-5">
              <a href={siteConfig.lineUrl} target="_blank" rel="noopener noreferrer" className="btn btn-line-cta rounded-pill px-5 py-3 fs-5">
                <i className="bi bi-line me-2"></i> เริ่มต้นใช้บริการคลิกเลย
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="price" className="section-padding border-top">
        <div className="container">
          <SectionTitle
            title="อัตราค่าบริการเริ่มต้น"
            subtitle="ราคามาตรฐาน ยุติธรรม ตรวจสอบได้"
          />

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="pricing-card">
                <div className="pricing-header text-center">
                  <h3 className="fw-bold mb-0">🚚 ตารางราคาขนส่งเริ่มต้น</h3>
                </div>
                <div className="p-4 bg-white">
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="bg-light">
                        <tr>
                          <th scope="col" className="py-3 ps-4">เส้นทางขนส่ง</th>
                          <th scope="col" className="py-3 pe-4 text-end">ราคาเริ่มต้น</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="ps-4 py-3">ในเขตกรุงเทพฯ และปริมณฑล</td>
                          <td className="pe-4 py-3 text-end fw-bold text-primary fs-5">1,000 บาท</td>
                        </tr>
                        <tr>
                          <td className="ps-4 py-3">กรุงเทพฯ ⇄ ภาคตะวันออก / ตะวันตก</td>
                          <td className="pe-4 py-3 text-end fw-bold text-primary fs-5">1,200 บาท</td>
                        </tr>
                        <tr>
                          <td className="ps-4 py-3">กรุงเทพฯ ⇄ ภาคอีสาน</td>
                          <td className="pe-4 py-3 text-end fw-bold text-primary fs-5">1,300 บาท</td>
                        </tr>
                        <tr>
                          <td className="ps-4 py-3">กรุงเทพฯ ⇄ ภาคเหนือ / ใต้</td>
                          <td className="pe-4 py-3 text-end fw-bold text-primary fs-5">1,500 บาท</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="text-center mt-4">
                    <a href={siteConfig.lineUrl} target="_blank" rel="noopener noreferrer" className="btn btn-success btn-shine btn-lg px-5 rounded-pill shadow fw-bold text-white text-decoration-none">
                      <i className="bi bi-line me-2"></i> สอบถามราคาที่แน่นอน
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-5 bg-white border-top">
        <div className="container">
          <h3 className="fw-bold text-secondary text-center mb-5" style={{ fontFamily: "var(--font-prompt)" }}>
            ทำไมต้องเลือก รถรับจ้างตู้ทึบ 4 ล้อ ของ MJ-TH Express?
          </h3>
          <div className="row g-4" style={{ color: "#334155", fontSize: "1.05rem", lineHeight: "1.95" }}>
            <div className="col-lg-4">
              <div className="card h-100" style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "30px" }}>
                <div className="mb-3 text-primary">
                  <i className="bi bi-patch-check-fill fs-1"></i>
                </div>
                <h4 className="fw-bold mb-3" style={{ fontFamily: "var(--font-prompt)" }}>มาตรฐานที่วางใจได้</h4>
                <p className="mb-0">
                  หากคุณกำลังวางแผน <strong>ย้ายบ้าน</strong> ย้ายหอพัก หรือขนส่งสินค้าที่มีมูลค่า การเลือกใช้บริการ{" "}
                  <strong>รถรับจ้างขนของ</strong> ที่ได้มาตรฐานเป็นสิ่งสำคัญอย่างยิ่ง ที่{" "}
                  <strong>MJ-TH Express</strong> เราให้บริการด้วย <strong>รถกระบะตู้ทึบ</strong>{" "}
                  ขนาด 4 ล้อ ที่มีความสูงและกว้างเป็นพิเศษ สามารถบรรทุกของชิ้นใหญ่ เช่น ตู้เสื้อผ้า เตียงนอน
                  ตู้เย็น หรือเครื่องซักผ้า ได้อย่างสะดวกสบาย
                </p>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card h-100" style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "30px" }}>
                <div className="mb-3 text-warning">
                  <i className="bi bi-shield-lock-fill fs-1"></i>
                </div>
                <h4 className="fw-bold mb-3" style={{ fontFamily: "var(--font-prompt)" }}>ปลอดภัยทุกการเดินทาง</h4>
                <p className="mb-0">
                  ข้อดีของการใช้บริการ <strong>รถรับจ้างตู้ทึบ</strong> ของเราคือ
                  ความปลอดภัยของสิ่งของที่จะไม่เปียกฝนหรือโดนฝุ่นแดดระหว่างการเดินทาง กันฝนได้ 100%
                  พร้อมการยึดล็อคที่แน่นหนาและฝาท้ายที่ปิดมิดชิดเพื่อความเป็นส่วนตัว
                  นอกจากนี้เรายังมีทีมงานขนย้ายมืออาชีพที่พร้อมช่วยแพ็ค
                  ช่วยยกของอย่างทะนุถนอม ป้องกันการเกิดรอยขีดข่วนหรือความเสียหายแก่ทรัพย์สินของท่าน
                </p>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card h-100" style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "30px" }}>
                <div className="mb-3 text-success">
                  <i className="bi bi-geo-alt-fill fs-1"></i>
                </div>
                <h4 className="fw-bold mb-3" style={{ fontFamily: "var(--font-prompt)" }}>ครอบคลุมทั่วไทย</h4>
                <p className="mb-0">
                  เราให้บริการครอบคลุมพื้นที่กรุงเทพฯ และปริมณฑล โดยมีจุดจอดรถและทีมงานพร้อมสแตนบายในย่าน{" "}
                  <strong>บางแค</strong>, <strong>หนองแขม</strong>, <strong>เพชรเกษม</strong>,
                  และพื้นที่ฝั่ง <strong>ธนบุรี</strong> ทั้งหมด ทำให้เข้าถึงพื้นที่และเข้ารับของได้อย่างรวดเร็วทันใจ
                  พร้อมเดินทางส่งตรงถึงปลายทางทุกจังหวัดทั่วประเทศไทยตลอด 24 ชั่วโมง
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section-padding border-top">
        <div className="container">
          <SectionTitle
            title="คำถามที่พบบ่อย"
            subtitle="คลายข้อสงสัย เพื่อความมั่นใจก่อนใช้บริการ"
          />

          <div className="faq-wrapper">
            <FAQAccordion id="faqAccordion" items={homepageFaqs} />

            <div className="text-center mt-4">
              <p className="text-muted">หากมีข้อสงสัยอื่นๆ สามารถสอบถามได้เลยครับ</p>
              <a
                href={siteConfig.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary rounded-pill px-4"
              >
                <i className="bi bi-chat-text-fill me-2"></i> สอบถามแอดมิน
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="section-padding border-top">
        <div className="container">
          <SectionTitle
            title="รีวิวจากผู้ใช้งานจริง"
            subtitle="ความประทับใจจากลูกค้าที่ไว้วางใจ MJ-TH Express"
          />

          <ReviewsSlider />

          <div className="text-center mt-4">
            <Link
              href="/reviews"
              className="btn btn-outline-primary rounded-pill px-4 me-3"
            >
              <i className="bi bi-star-fill me-2"></i> อ่านรีวิวทั้งหมดของลูกค้า
            </Link>
            <a
              href={siteConfig.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-secondary rounded-pill px-4"
            >
              <i className="bi bi-facebook me-2"></i> ดูรีวิวบนเพจ Facebook
            </a>
          </div>
        </div>
      </section>

      {/* Programmatic SEO inter-linking hub */}
      <SeoLinkHub />
    </>
  );
}

