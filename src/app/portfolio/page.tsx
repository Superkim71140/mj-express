import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/seo/site-config";
import PortfolioGallery from "@/components/PortfolioGallery";
import JsonLd from "@/components/JsonLd";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildPageMetadata({
  title: "ผลงานขนย้ายบ้าน ส่งมอเตอร์ไซค์ รีวิวลูกค้าจริง - MJ-TH EXPRESS",
  description:
    "รวมภาพผลงานจริง MJ-TH Express บริการรถรับจ้างขนของ ย้ายหอพัก ส่งรถมอเตอร์ไซค์ BigBike ข้ามจังหวัด แพ็คของหนาพิเศษ ลูกค้าไว้วางใจกว่า 3,000 เที่ยว ชมรีวิวก่อนตัดสินใจ",
  canonicalPath: "/portfolio",
  ogImage: "/assets/images/S__11985366.webp",
  ogImageAlt: "ผลงานรับจ้างขนย้ายโดย MJ-TH Express",
});

export default function PortfolioPage() {
  // CollectionPage & ImageGallery schema
  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "ผลงานขนย้ายบ้านและส่งมอเตอร์ไซค์ MJ-TH Express",
    "description": "รวมภาพผลงานการขนย้ายบ้าน ย้ายหอพัก และส่งรถมอเตอร์ไซค์ BigBike ทั่วประเทศไทย",
    "url": `${siteConfig.baseUrl}/portfolio`,
    "mainEntity": {
      "@type": "ImageGallery",
      "author": {
        "@type": "MovingCompany",
        "name": siteConfig.businessName,
        "url": siteConfig.baseUrl,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "350",
        },
      },
    },
  };

  // Breadcrumb List Schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "หน้าแรก", item: "/" },
    { name: "ผลงาน", item: "/portfolio" },
  ]);

  const testimonials = [
    {
      avatar: "ณ",
      name: "คุณณัฐพล K.",
      role: "ส่ง BigBike (VIP)",
      text: '"ส่งรถ BigBike จากกรุงเทพฯ ไปเชียงใหม่ ประทับใจมากครับ ห่อกันรอยหนามากและล็อคล้อได้แน่นหนาดีมาก รถไม่มีรอยแม้แต่นิดเดียว คนขับสุภาพ อัปเดตสถานะตลอดทาง แนะนำเลยครับ!"',
    },
    {
      avatar: "พ",
      name: "คุณพัชราภรณ์ S.",
      role: "ย้ายหอพักคอนโด",
      text: '"ใช้บริการย้ายหอพัก ขนของเร็วมาก พี่ๆ คนขับและทีมงานช่วยยกช่วยจัดระเบียบดีมาก พูดจาเพราะ ตรงต่อเวลาสุดๆ ราคาไม่แพงคุ้มค่ามากค่ะ"',
    },
    {
      avatar: "ส",
      name: "คุณสุรศักดิ์ T.",
      role: "ขนย้ายตู้เซฟ/ของหนัก",
      text: '"ตู้เซฟหนักเกือบ 200 โล ทีมงานย้ายได้อย่างเป็นมืออาชีพ มีอุปกรณ์พร้อมมาก ไม่มีรอยชนผนังหรือพื้นบ้านเลย ทำงานเรียบร้อยรวดเร็วมากครับ"',
    },
  ];

  return (
    <>
      <JsonLd data={[gallerySchema, breadcrumbSchema]} />

      {/* Page header banner block */}
      <header className="page-header">
        <div className="container">
          <h1 className="page-title">ผลงานรับจ้างขนของและขนส่งมอเตอร์ไซค์ทั่วไทย - MJ-TH EXPRESS</h1>
          <div className="page-breadcrumb">
            <Link href="/">หน้าแรก</Link> <span className="mx-2 text-white-50">/</span> ผลงาน
          </div>
          <p className="mt-3 opacity-90 header-desc">ภาพถ่ายจากการทำงานจริง มั่นใจได้ในความปลอดภัย และความเป็นมืออาชีพ</p>
        </div>
      </header>

      {/* Main Interactive Gallery Wrapper */}
      <PortfolioGallery />

      {/* Testimonials Review Cards */}
      <section className="testimonials-section border-top">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center mb-5">
              <h2 className="fw-bold text-dark" style={{ fontSize: "2.2rem" }}>
                รีวิวจากลูกค้าจริง (Customer Reviews)
              </h2>
              <div className="title-underline"></div>
              <p className="text-muted">ความประทับใจและความไว้วางใจจากลูกค้าที่ใช้บริการจริงกับ MJ-TH Express</p>
            </div>
          </div>
          <div className="row g-4">
            {testimonials.map((t, index) => (
              <div className="col-md-4" key={index}>
                <div className="testimonial-card">
                  <div>
                    <div className="testimonial-stars">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                    <p className="testimonial-text">{t.text}</p>
                  </div>
                  <div className="testimonial-user">
                    <div className="testimonial-avatar">{t.avatar}</div>
                    <div className="testimonial-info">
                      <h5>{t.name}</h5>
                      <span>
                        <i className="bi bi-patch-check-fill text-success"></i> {t.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Banner */}
      <section className="cta-banner text-center text-white">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <h2 className="cta-title">มั่นใจในผลงานของเราแล้วใช่ไหม?</h2>
              <p className="cta-subtitle">ทักไลน์ประเมินราคาฟรีทันที! ทีมงานมืออาชีพพร้อมตอบกลับภายใน 5 นาที</p>
              <a href={siteConfig.lineUrl} target="_blank" rel="noopener noreferrer" className="btn btn-cta-line">
                <i className="bi bi-line fs-3"></i>
                <span>แอดไลน์ประเมินราคาฟรี (LINE ID: {siteConfig.lineId})</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
