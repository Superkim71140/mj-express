import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/seo/site-config";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildPageMetadata({
  title: "ติดต่อรถรับจ้างบางแค ขนส่งมอเตอร์ไซค์ ย้ายของ (โทร 095-583-0371) - MJ-TH Express",
  description:
    "ติดต่อ MJ-TH Express รถรับจ้างบางแค เพชรเกษม หนองแขม บริการขนส่งมอเตอร์ไซค์ ย้ายบ้าน สอบถามราคาฟรี แอดไลน์ edokmzaza หรือโทร 095-583-0371 พิกัดซอยอัสสัมชัญ 23",
  canonicalPath: "/contact",
  ogImage: "/assets/images/work4.webp",
  ogImageAlt: "ติดต่อเรา MJ-TH Express รถรับจ้างย้ายบ้าน ขนของ",
});

export default function ContactPage() {
  const mapIframeUrl =
    "https://maps.google.com/maps?q=M%26J%E0%B8%97%E0%B8%A3%E0%B8%B2%E0%B8%99%E0%B8%AA%E0%B8%9B%E0%B8%AD%E0%B8%A3%E0%B9%80%E0%B8%95%20%E0%B8%82%E0%B8%99%E0%B8%AA%E0%B9%80%E0%B8%87%E0%B8%A1%E0%B8%AD%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%80%E0%B8%80%E0%B8%8A%E0%B8%84%E0%B9%8C%20%E0%B8%8B%E0%B8%AD%E0%B8%A2%E0%B8%AD%E0%B8%B1%E0%B8%AA%E0%B8%AA%E0%B8%B1%E0%B8%A1%E0%B8%8A%E0%B8%B1%E0%B8%80%2023&t=&z=15&ie=UTF8&iwloc=&output=embed";

  // MovingCompany contactPoint Schema
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    "name": siteConfig.businessFullName,
    "image": `${siteConfig.baseUrl}/assets/images/work4.webp`,
    "@id": `${siteConfig.baseUrl}/#moving-company`,
    "url": `${siteConfig.baseUrl}/contact`,
    "telephone": siteConfig.phone,
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
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": siteConfig.phone,
      "contactType": "customer service",
      "areaServed": "TH",
      "availableLanguage": "Thai",
    },
  };

  // Breadcrumb List Schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "หน้าแรก", item: "/" },
    { name: "ติดต่อเรา", item: "/contact" },
  ]);

  return (
    <>
      <JsonLd data={[contactSchema, breadcrumbSchema]} />

      {/* Page Header */}
      <header className="page-header">
        <div className="container">
          <h1 className="display-4 fw-bold mb-2">ปรึกษาและประเมินราคาฟรี</h1>
          <div className="page-breadcrumb text-center mb-3">
            <Link href="/" style={{ color: "#fff", textDecoration: "none" }}>หน้าแรก</Link>
            <span className="mx-2 text-white-50">/</span>
            <span className="text-warning fw-semibold">ติดต่อเรา</span>
          </div>
          <p className="lead opacity-75">
            รถรับจ้างบางแค รถรับจ้างฝั่งธน <br /> ทักไลน์ตอบไว โทรปรึกษาได้ทันที 24 ชม.
          </p>
        </div>
      </header>

      {/* Main contact options container grids */}
      <section className="container" style={{ marginTop: "-50px", position: "relative", zIndex: 10 }}>
        <div className="row g-4 justify-content-center">
          {/* LINE Card */}
          <div className="col-md-4">
            <div className="contact-card card-line">
              <div className="icon-box">
                <i className="bi bi-line"></i>
              </div>
              <h3 className="contact-label">แชทประเมินราคา</h3>
              <p className="contact-value">ส่งรูปของและรายละเอียดเพื่อเช็คราคา</p>
              <a
                href={siteConfig.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-action btn-line"
              >
                <i className="bi bi-chat-dots-fill me-2"></i> แอดไลน์ {siteConfig.lineId}
              </a>
            </div>
          </div>

          {/* Phone Card */}
          <div className="col-md-4">
            <div className="contact-card card-phone">
              <div className="icon-box">
                <i className="bi bi-telephone-fill"></i>
              </div>
              <h3 className="contact-label">โทรสายด่วน</h3>
              <p className="contact-value">ปรึกษาด่วน จองคิวรถทันที</p>
              <a href={siteConfig.phoneHref} className="btn btn-action btn-phone">
                <i className="bi bi-phone-vibrate me-2"></i> โทร {siteConfig.phone}
              </a>
            </div>
          </div>

          {/* Facebook Card */}
          <div className="col-md-4">
            <div className="contact-card card-fb">
              <div className="icon-box">
                <i className="bi bi-facebook"></i>
              </div>
              <h3 className="contact-label">ติดตามผลงาน</h3>
              <p className="contact-value">ดูรีวิวลูกค้าจริงและอัปเดตงานขนส่ง</p>
              <a
                href={siteConfig.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-action btn-fb"
              >
                <i className="bi bi-hand-thumbs-up-fill me-2"></i> ไปที่เพจ Facebook
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Form and Maps sections */}
      <section className="py-5 mt-4">
        <div className="container">
          <div className="row g-5 align-items-stretch">
            {/* Left side Form Card */}
            <div className="col-lg-5">
              <div className="info-box premium-card h-100 d-flex flex-column justify-content-between">
                <ContactForm />

                <div className="compact-info">
                  <hr className="my-4" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }} />

                  <h4 className="fw-bold mb-3" style={{ color: "var(--secondary-color)", fontSize: "1.1rem" }}>
                    <i className="bi bi-geo-alt-fill text-warning me-1"></i> จุดจอดรถ & ติดต่อสำนักงาน
                  </h4>
                  <p className="text-muted mb-2 small" style={{ lineHeight: "1.5" }}>
                    เรามีทีมงานพร้อมให้บริการในเขตพื้นที่:
                  </p>

                  <div className="d-flex flex-wrap mb-3">
                    <span className="district-badge">
                      <i className="bi bi-geo-alt-fill me-1 text-primary"></i>บางแค
                    </span>
                    <span className="district-badge">
                      <i className="bi bi-geo-alt-fill me-1 text-primary"></i>เพชรเกษม
                    </span>
                    <span className="district-badge">
                      <i className="bi bi-geo-alt-fill me-1 text-primary"></i>หนองแขม
                    </span>
                    <span className="district-badge">
                      <i className="bi bi-geo-alt-fill me-1 text-primary"></i>พุทธมณฑล
                    </span>
                  </div>

                  <p className="text-muted mb-3 small" style={{ lineHeight: "1.5" }}>
                    และพื้นที่ใกล้เคียง เรียกปุ๊บ ไปรับได้ทันที
                  </p>

                  <div className="d-flex align-items-start mb-3">
                    <div className="icon-circle-backdrop">
                      <i className="bi bi-house-door-fill" style={{ fontSize: "1rem" }}></i>
                    </div>
                    <div style={{ fontSize: "0.85rem" }}>
                      <span className="fw-bold text-dark d-block mb-1">
                        {siteConfig.businessName} (สำนักงานใหญ่)
                      </span>
                      <span className="text-muted">
                        {siteConfig.address.streetAddress} {siteConfig.address.addressLocality}{" "}
                        {siteConfig.address.addressRegion} {siteConfig.address.postalCode}
                      </span>
                    </div>
                  </div>

                  <div className="d-flex align-items-start mb-3">
                    <div className="icon-circle-backdrop">
                      <i className="bi bi-clock-fill" style={{ fontSize: "1rem" }}></i>
                    </div>
                    <div style={{ fontSize: "0.85rem" }}>
                      <span className="fw-bold text-dark d-block mb-1">เวลาทำการ</span>
                      <span className="text-muted">{siteConfig.openingHoursTh}</span>
                    </div>
                  </div>

                  <p
                    className="charcoal-footnote text-center mt-3 mb-0"
                    style={{ borderTop: "1px dashed rgba(0,0,0,0.05)", paddingTop: "12px" }}
                  >
                    *เพื่อความสะดวก รบกวนนัดหมายล่วงหน้าก่อนเข้ามาที่สำนักงาน
                  </p>
                </div>
              </div>
            </div>

            {/* Right side Location Map Iframe */}
            <div className="col-lg-7">
              <div className="map-container">
                <iframe
                  src={mapIframeUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="MJ-TH Express Official Location Map"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
