import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import FAQAccordion from "@/components/FAQAccordion";
import SeoLinkHub from "@/components/SeoLinkHub";
import { ServiceItem } from "@/data/services";

interface Props {
  service: ServiceItem;
}

export default function GenericServiceTemplate({ service }: Props) {
  return (
    <>
      {/* Hero Header & Visual Breadcrumbs */}
      <header className="hero-local text-center py-5 text-white" style={{ background: "var(--blue-gradient)", position: "relative" }}>
        <div className="container py-4">
          {/* Visual Breadcrumbs */}
          <div className="page-breadcrumb mb-3" style={{ fontSize: "0.95rem" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>หน้าแรก</Link>
            <span className="mx-2 text-white-50">/</span>
            <span className="text-warning fw-semibold">{service.serviceName}</span>
          </div>

          <h1 className="display-4 fw-bold mb-3" style={{ fontFamily: "var(--font-prompt)", lineHeight: "1.2" }}>{service.h1}</h1>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: "800px", fontSize: "1.15rem", opacity: 0.95 }}>
            {service.intro}
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <a href={siteConfig.phoneHref} className="btn btn-danger btn-lg rounded-pill px-4 shadow text-white fw-bold">
              <i className="bi bi-telephone-fill me-2"></i> โทรด่วน: {siteConfig.phone}
            </a>
            <a
              href={siteConfig.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success btn-lg rounded-pill px-4 shadow text-white fw-bold"
            >
              <i className="bi bi-line me-2"></i> แอดไลน์สอบถามค่าบริการ
            </a>
          </div>
        </div>
      </header>

      {/* Trust Badges */}
      <section className="py-4 border-bottom shadow-sm bg-white">
        <div className="container">
          <div className="row g-3 text-center">
            <div className="col-6 col-md-3">
              <div className="p-3 rounded border h-100 d-flex flex-column align-items-center justify-content-center bg-light">
                <i className="bi bi-shield-fill-check text-primary mb-2 fs-3"></i>
                <h6 className="fw-bold mb-1">ปลอดภัย มีประกันสินค้า</h6>
                <p className="small text-muted mb-0">รับผิดชอบดูแลสินค้าทุกเที่ยว</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-3 rounded border h-100 d-flex flex-column align-items-center justify-content-center bg-light">
                <i className="bi bi-truck text-warning mb-2 fs-3"></i>
                <h6 className="fw-bold mb-1">ตู้ทึบกันฝน 100%</h6>
                <p className="small text-muted mb-0">ปกป้องฝุ่นและฝนตลอดทาง</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-3 rounded border h-100 d-flex flex-column align-items-center justify-content-center bg-light">
                <i className="bi bi-people-fill text-success mb-2 fs-3"></i>
                <h6 className="fw-bold mb-1">มีทีมงานช่วยขนยก</h6>
                <p className="small text-muted mb-0">จัดวางเรียบร้อยไม่ต้องยกเอง</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-3 rounded border h-100 d-flex flex-column align-items-center justify-content-center bg-light">
                <i className="bi bi-wallet2 text-danger mb-2 fs-3"></i>
                <h6 className="fw-bold mb-1">ราคามาตรฐานตรงไปตรงมา</h6>
                <p className="small text-muted mb-0">ประเมินราคาก่อนเริ่ม ไม่มีบวกเพิ่ม</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detail Content Section */}
      <section className="py-5 bg-white">
        <div className="container" style={{ maxWidth: "950px" }}>
          <div className="row g-4">
            {/* Left Column: Benefits & Use Cases */}
            <div className="col-md-7">
              <h3 className="fw-bold text-dark mb-3" style={{ fontFamily: "var(--font-prompt)" }}>
                ✨ จุดเด่นการบริการของเรา
              </h3>
              <ul className="list-unstyled d-flex flex-column gap-3 mb-4">
                {service.benefits.map((benefit, index) => (
                  <li className="d-flex align-items-start gap-2.5" key={index}>
                    <i className="bi bi-patch-check-fill text-primary mt-1" style={{ fontSize: "1.1rem" }}></i>
                    <span className="text-secondary" style={{ fontSize: "1.05rem" }}>{benefit}</span>
                  </li>
                ))}
              </ul>

              <hr />

              <h3 className="fw-bold text-dark mt-4 mb-3" style={{ fontFamily: "var(--font-prompt)" }}>
                💼 เหมาะสำหรับลูกค้าแบบไหนบ้าง?
              </h3>
              <ul className="list-unstyled d-flex flex-column gap-2">
                {service.useCases.map((useCase, index) => (
                  <li className="d-flex align-items-center gap-2" key={index}>
                    <i className="bi bi-arrow-right-short text-warning" style={{ fontSize: "1.3rem" }}></i>
                    <span className="text-muted" style={{ fontSize: "1rem" }}>{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Spec card & Price note */}
            <div className="col-md-5">
              <div className="p-4 rounded-4 border shadow-sm" style={{ backgroundColor: "#fafbfc" }}>
                <h4 className="fw-bold mb-3 text-secondary" style={{ fontSize: "1.2rem", fontFamily: "var(--font-prompt)" }}>
                  📋 รายละเอียดรถและเครื่องมือ
                </h4>
                <div className="mb-3">
                  <p className="small text-muted mb-1 fw-bold">ประเภทยานพาหนะ:</p>
                  <div className="d-flex flex-wrap gap-1.5">
                    {service.vehicleTypes.map((type) => (
                      <span className="badge bg-secondary text-white px-2 py-1.5" key={type} style={{ fontSize: "0.8rem" }}>
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <p className="small text-muted mb-1 fw-bold">รองรับการใช้งาน:</p>
                  <div className="d-flex flex-wrap gap-1.5">
                    {service.suitableFor.map((suit) => (
                      <span className="badge bg-primary-subtle text-primary px-2 py-1.5" key={suit} style={{ fontSize: "0.8rem" }}>
                        {suit}
                      </span>
                    ))}
                  </div>
                </div>

                <hr />

                <h5 className="fw-bold text-primary mt-3" style={{ fontSize: "1.05rem", fontFamily: "var(--font-prompt)" }}>
                  💰 รายละเอียดการประเมินราคา
                </h5>
                <p className="small text-muted mb-0 leading-relaxed" style={{ lineHeight: "1.6" }}>
                  {service.priceNotes}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Area Served Chips */}
      <section className="py-5 bg-light border-top">
        <div className="container text-center">
          <h3 className="fw-bold text-dark mb-3" style={{ fontFamily: "var(--font-prompt)", fontSize: "1.4rem" }}>
            📍 บริการครอบคลุมพื้นที่ต่างๆ ทั่วไทย
          </h3>
          <p className="text-muted small max-width-700 mx-auto mb-4">
            ทีมงานพร้อมรับของด่วนในย่านฝั่งธนบุรี และเดินทางจัดส่งรวดเร็วไปยังจุดปลายทางของคุณ
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-2" style={{ maxWidth: "800px", margin: "0 auto" }}>
            {service.serviceAreas.map((areaName) => (
              <span className="bg-white border px-3 py-1.5 rounded small text-secondary shadow-sm" key={areaName} style={{ fontSize: "0.85rem" }}>
                <i className="bi bi-geo-alt-fill text-primary me-1"></i> {areaName}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ specific to that Service */}
      <section className="py-5 bg-white border-top">
        <div className="container" style={{ maxWidth: "800px" }}>
          <div className="text-center mb-5">
            <h2 className="fw-bold text-dark" style={{ fontFamily: "var(--font-prompt)" }}>
              คำถามที่พบบ่อย (FAQ) - {service.serviceName}
            </h2>
            <div className="title-underline"></div>
            <p className="text-muted">คลายข้อสงสัยเกี่ยวกับการบริการเพื่อความสบายใจในการเรียกใช้บริการ</p>
          </div>

          <FAQAccordion id={`faqAccordion-${service.slug}`} items={service.faqs} />
        </div>
      </section>

      {/* Internal links for cross linking */}
      <SeoLinkHub excludeSlug={service.slug} mode="services-and-areas" />

      {/* CTA Footer banner */}
      <section className="py-5 text-white text-center" style={{ background: "var(--blue-gradient)" }}>
        <div className="container">
          <h2 className="fw-bold mb-3" style={{ fontFamily: "var(--font-prompt)" }}>สอบถามราคารถรับจ้าง {service.serviceName} ฟรี</h2>
          <p className="lead mb-4 opacity-90">ส่งรูปของ ต้นทาง-ปลายทาง แอดไลน์คุยปรึกษากับเจ้าหน้าที่ได้ตลอด 24 ชั่วโมง</p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <a href={siteConfig.phoneHref} className="btn btn-warning btn-lg rounded-pill px-4 text-dark fw-bold">
              <i className="bi bi-phone-vibrate-fill me-2"></i> โทรสายด่วน: {siteConfig.phone}
            </a>
            <a
              href={siteConfig.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success btn-lg rounded-pill px-4 text-white fw-bold"
            >
              <i className="bi bi-line me-2"></i> แชทผ่าน LINE: {siteConfig.lineId}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
