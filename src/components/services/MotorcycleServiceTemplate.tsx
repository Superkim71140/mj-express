import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import FAQAccordion from "@/components/FAQAccordion";
import SeoLinkHub from "@/components/SeoLinkHub";
import { ServiceItem } from "@/data/services";

interface Props {
  service: ServiceItem;
}

export default function MotorcycleServiceTemplate({ service }: Props) {
  // SVG background pattern (modern dot grid/map vibe)
  const bgPattern = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230d6efd' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

  return (
    <>
      {/* Premium Hero Section - Soft UI Evolution */}
      <header 
        className="position-relative overflow-hidden" 
        style={{ 
          background: "linear-gradient(135deg, #ffffff 0%, #eef5fb 100%)",
          minHeight: "85vh",
          display: "flex",
          alignItems: "center"
        }}
      >
        {/* Background Pattern */}
        <div 
          className="position-absolute top-0 start-0 w-100 h-100" 
          style={{ 
            backgroundImage: bgPattern,
            opacity: 0.8,
            zIndex: 0 
          }} 
        />

        <div className="container position-relative py-5" style={{ zIndex: 1 }}>
          {/* Visual Breadcrumbs */}
          <div className="page-breadcrumb mb-4" style={{ fontSize: "0.95rem" }}>
            <Link href="/" className="text-secondary text-decoration-none hover-primary transition-all">
              หน้าแรก
            </Link>
            <span className="mx-2 text-muted">/</span>
            <span className="text-primary fw-semibold">{service.serviceName}</span>
          </div>

          <div className="row align-items-center g-5">
            {/* Left Column: Primary Text & CTA */}
            <div className="col-lg-6">
              <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill mb-3 fw-semibold">
                <i className="bi bi-shield-check me-1"></i> VIP Delivery Service
              </span>
              <h1 
                className="display-4 fw-bold mb-4 text-dark" 
                style={{ fontFamily: "var(--font-prompt)", lineHeight: "1.2" }}
              >
                {service.h1}
              </h1>
              <p className="lead mb-5 text-secondary" style={{ fontSize: "1.15rem", lineHeight: "1.6" }}>
                {service.intro}
              </p>

              {/* 2x2 Feature Grid */}
              <div className="row g-4 mb-5">
                {service.benefits.slice(0, 4).map((benefit, index) => (
                  <div className="col-sm-6" key={index}>
                    <div className="d-flex align-items-start gap-3">
                      <div className="flex-shrink-0 bg-white shadow-sm rounded-circle d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
                        <i className="bi bi-check2 text-primary fs-5"></i>
                      </div>
                      <p className="mb-0 text-dark fw-medium small" style={{ lineHeight: "1.5" }}>
                        {benefit}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Consolidated CTA Group */}
              <div className="d-flex flex-column flex-sm-row gap-3">
                <a 
                  href={siteConfig.phoneHref} 
                  className="btn btn-primary btn-lg rounded-pill px-4 fw-bold shadow-sm d-flex align-items-center justify-content-center"
                  style={{ transition: "all 0.3s ease" }}
                >
                  <i className="bi bi-telephone-fill me-2"></i> โทรด่วน: {siteConfig.phone}
                </a>
                <a
                  href={siteConfig.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success btn-lg rounded-pill px-4 fw-bold shadow-sm d-flex align-items-center justify-content-center"
                  style={{ transition: "all 0.3s ease" }}
                >
                  <i className="bi bi-line me-2"></i> แอดไลน์ประเมินราคา
                </a>
                <Link 
                  href="/portfolio" 
                  className="btn btn-outline-secondary btn-lg rounded-pill px-4 fw-bold bg-white d-flex align-items-center justify-content-center"
                  style={{ transition: "all 0.3s ease" }}
                >
                  <i className="bi bi-images me-2"></i> ผลงาน
                </Link>
              </div>
            </div>

            {/* Right Column: Dynamic Visual Cluster */}
            <div className="col-lg-6">
              <div className="position-relative mx-auto" style={{ maxWidth: "600px", height: "500px" }}>
                {/* Truck & Delivery Man (Base Layer) */}
                <div 
                  className="position-absolute top-0 end-0 rounded-4 overflow-hidden shadow-lg"
                  style={{ 
                    width: "85%", 
                    height: "85%", 
                    zIndex: 1,
                    border: "8px solid #ffffff",
                    backgroundColor: "#f8f9fa",
                    transition: "transform 0.3s ease"
                  }}
                >
                  <img 
                    src="/Mjexpress1.webp" 
                    alt="Delivery Truck and Team" 
                    className="w-100 h-100 object-fit-cover"
                  />
                </div>

                {/* Wrapped Motorcycle (Foreground Layer) */}
                <div 
                  className="position-absolute bottom-0 start-0 rounded-4 overflow-hidden"
                  style={{ 
                    width: "65%", 
                    height: "60%", 
                    zIndex: 2,
                    border: "6px solid #ffffff",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                    backgroundColor: "#ffffff",
                    transition: "transform 0.3s ease"
                  }}
                >
                  <img 
                    src="/motorcycle.webp" 
                    alt="Wrapped Motorcycle Shipping" 
                    className="w-100 h-100 object-fit-cover"
                  />
                </div>

                {/* Trust Badge Floating Element */}
                <div 
                  className="position-absolute bg-white rounded-pill shadow px-4 py-3 d-flex align-items-center gap-3"
                  style={{ 
                    top: "10%", 
                    left: "-5%", 
                    zIndex: 3,
                    animation: "float 6s ease-in-out infinite"
                  }}
                >
                  <div className="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
                    <i className="bi bi-shield-check fs-5"></i>
                  </div>
                  <div>
                    <div className="fw-bold text-dark lh-1">ปลอดภัย 100%</div>
                    <div className="small text-muted">รับประกันทุกเที่ยว</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CSS for animations */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          .hover-primary:hover { color: var(--bs-primary) !important; }
          .btn:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important; }
        `}} />
      </header>

      {/* Trust & Process Section */}
      <section className="py-5 bg-white">
        <div className="container" style={{ maxWidth: "1000px" }}>
          <div className="text-center mb-5">
            <h2 className="fw-bold text-dark" style={{ fontFamily: "var(--font-prompt)" }}>
              มาตรฐานการขนส่ง <span className="text-primary">VIP</span>
            </h2>
            <p className="text-secondary">ขั้นตอนการดูแลรถมอเตอร์ไซค์บิ๊กไบค์ของคุณอย่างทะนุถนอมที่สุด</p>
          </div>
          
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="p-4 rounded-4 bg-light h-100 border-0 transition-all hover-shadow">
                <div className="bg-white rounded-circle shadow-sm d-flex align-items-center justify-content-center mx-auto mb-3 text-primary" style={{ width: "70px", height: "70px", fontSize: "2rem" }}>
                  <i className="bi bi-box-seam"></i>
                </div>
                <h5 className="fw-bold mb-2">1. ซีลพลาสติกกันรอย 3 ชั้น</h5>
                <p className="small text-muted mb-0">ปกป้องแฮนด์ ท่อไอเสีย และชิ้นส่วนโครเมียมด้วยแอร์บับเบิ้ลหนาพิเศษฟรี</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 rounded-4 bg-light h-100 border-0 transition-all hover-shadow">
                <div className="bg-white rounded-circle shadow-sm d-flex align-items-center justify-content-center mx-auto mb-3 text-primary" style={{ width: "70px", height: "70px", fontSize: "2rem" }}>
                  <i className="bi bi-link-45deg"></i>
                </div>
                <h5 className="fw-bold mb-2">2. รัดล้อหน้า-หลังแน่นหนา</h5>
                <p className="small text-muted mb-0">ใช้สายรัดสำหรับรถจักรยานยนต์โดยเฉพาะ ล็อคแน่นไม่โยกเยกตลอดการเดินทาง</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 rounded-4 bg-light h-100 border-0 transition-all hover-shadow">
                <div className="bg-white rounded-circle shadow-sm d-flex align-items-center justify-content-center mx-auto mb-3 text-primary" style={{ width: "70px", height: "70px", fontSize: "2rem" }}>
                  <i className="bi bi-truck-flatbed"></i>
                </div>
                <h5 className="fw-bold mb-2">3. ขนส่งด้วยตู้ทึบกันฝน</h5>
                <p className="small text-muted mb-0">จัดส่งตรงถึงหน้าบ้าน (Door-to-Door) ด้วยรถกระบะตู้ทึบที่ปลอดภัยจากสภาพอากาศ</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detail Content Section */}
      <section className="py-5" style={{ backgroundColor: "#fafbfc" }}>
        <div className="container" style={{ maxWidth: "1000px" }}>
          <div className="row g-5 align-items-center">
            {/* Left Column: Spec card */}
            <div className="col-md-5">
              <div className="p-4 rounded-4 border-0 shadow-sm bg-white position-relative">
                <div className="position-absolute top-0 start-50 translate-middle badge bg-primary px-3 py-2 rounded-pill shadow-sm">
                  ข้อมูลการบริการ
                </div>
                <h4 className="fw-bold mb-4 text-dark text-center mt-3" style={{ fontSize: "1.2rem", fontFamily: "var(--font-prompt)" }}>
                  📋 รายละเอียดรถและเครื่องมือ
                </h4>
                <div className="mb-4">
                  <p className="small text-secondary mb-2 fw-semibold"><i className="bi bi-truck text-primary me-2"></i> ประเภทยานพาหนะ:</p>
                  <div className="d-flex flex-wrap gap-2">
                    {service.vehicleTypes.map((type) => (
                      <span className="badge bg-light text-dark border px-3 py-2 rounded-pill fw-medium" key={type}>
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="small text-secondary mb-2 fw-semibold"><i className="bi bi-bicycle text-primary me-2"></i> รองรับการขนส่ง:</p>
                  <div className="d-flex flex-wrap gap-2">
                    {service.suitableFor.map((suit) => (
                      <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill fw-medium" key={suit}>
                        {suit}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-light rounded-3 border-start border-4 border-warning">
                  <h5 className="fw-bold text-dark mb-1" style={{ fontSize: "1rem" }}>
                    💰 การประเมินราคา
                  </h5>
                  <p className="small text-muted mb-0" style={{ lineHeight: "1.5" }}>
                    {service.priceNotes}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Use Cases */}
            <div className="col-md-7">
              <h3 className="fw-bold text-dark mb-4" style={{ fontFamily: "var(--font-prompt)" }}>
                💼 บริการนี้เหมาะสำหรับใคร?
              </h3>
              <div className="d-flex flex-column gap-3">
                {service.useCases.map((useCase, index) => (
                  <div className="d-flex align-items-center gap-3 p-3 bg-white rounded-4 shadow-sm" key={index}>
                    <div className="flex-shrink-0 bg-warning-subtle text-warning rounded-circle d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
                      <i className="bi bi-star-fill"></i>
                    </div>
                    <span className="text-dark fw-medium" style={{ fontSize: "1.05rem" }}>{useCase}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          .hover-shadow:hover { box-shadow: 0 10px 30px rgba(0,0,0,0.08) !important; transform: translateY(-5px); }
        `}} />
      </section>

      {/* Local Area Served Chips */}
      <section className="py-5 bg-white border-top border-bottom">
        <div className="container text-center">
          <h3 className="fw-bold text-dark mb-3" style={{ fontFamily: "var(--font-prompt)", fontSize: "1.4rem" }}>
            📍 บริการครอบคลุมพื้นที่ต่างๆ ทั่วไทย
          </h3>
          <p className="text-muted small mx-auto mb-4" style={{ maxWidth: "700px" }}>
            ทีมงานพร้อมรับของด่วนในย่านฝั่งธนบุรี และเดินทางจัดส่งรวดเร็วไปยังจุดปลายทางทั่วประเทศ
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-2" style={{ maxWidth: "800px", margin: "0 auto" }}>
            {service.serviceAreas.map((areaName) => (
              <span className="bg-light border px-4 py-2 rounded-pill small text-dark shadow-sm hover-shadow transition-all" key={areaName} style={{ fontSize: "0.9rem" }}>
                <i className="bi bi-geo-alt-fill text-danger me-1"></i> {areaName}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ specific to that Service */}
      <section className="py-5 bg-white">
        <div className="container" style={{ maxWidth: "800px" }}>
          <div className="text-center mb-5">
            <h2 className="fw-bold text-dark" style={{ fontFamily: "var(--font-prompt)" }}>
              คำถามที่พบบ่อย (FAQ)
            </h2>
            <div className="title-underline mx-auto mt-2 mb-3" style={{ width: "60px", height: "4px", backgroundColor: "var(--bs-primary)", borderRadius: "2px" }}></div>
            <p className="text-secondary">คลายข้อสงสัยเกี่ยวกับการขนส่งมอเตอร์ไซค์ เพื่อความสบายใจในการเรียกใช้บริการ</p>
          </div>

          <FAQAccordion id={`faqAccordion-${service.slug}`} items={service.faqs} />
        </div>
      </section>

      {/* Internal links for cross linking */}
      <SeoLinkHub excludeSlug={service.slug} mode="services-and-areas" />

      {/* Premium CTA Footer banner */}
      <section className="py-5 position-relative overflow-hidden" style={{ background: "linear-gradient(135deg, var(--bs-primary) 0%, #0a58ca 100%)" }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundImage: bgPattern, opacity: 0.1, zIndex: 0 }}></div>
        <div className="container position-relative text-center text-white" style={{ zIndex: 1 }}>
          <h2 className="fw-bold mb-3 display-6" style={{ fontFamily: "var(--font-prompt)" }}>สอบถามราคารถรับจ้าง {service.serviceName} ฟรี</h2>
          <p className="lead mb-5 text-white-50 mx-auto" style={{ maxWidth: "600px" }}>ส่งรูปรถมอเตอร์ไซค์และแจ้งจุดต้นทาง-ปลายทาง แอดไลน์คุยปรึกษากับเจ้าหน้าที่ของเราได้ตลอด 24 ชั่วโมง</p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <a href={siteConfig.phoneHref} className="btn btn-warning btn-lg rounded-pill px-5 text-dark fw-bold shadow-lg" style={{ transition: "all 0.3s ease" }}>
              <i className="bi bi-phone-vibrate-fill me-2 fs-5"></i> โทรสายด่วน
            </a>
            <a
              href={siteConfig.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-light btn-lg rounded-pill px-5 text-success fw-bold shadow-lg"
              style={{ transition: "all 0.3s ease" }}
            >
              <i className="bi bi-line me-2 fs-5"></i> แชทผ่าน LINE
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
