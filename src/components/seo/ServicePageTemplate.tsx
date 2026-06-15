import React from "react";
import { ServiceItem } from "@/data/seo/services";
import Breadcrumbs from "./Breadcrumbs";
import ConversionCTA from "./ConversionCTA";
import TrustProofBlock from "./TrustProofBlock";
import PricingGuideBlock from "./PricingGuideBlock";
import RelatedLinks from "./RelatedLinks";
import SeoLinkHub from "./SeoLinkHub";
import FaqBlock from "./FaqBlock";

interface ServicePageTemplateProps {
  service: ServiceItem;
}

export default function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  const breadcrumbItems = [
    { name: service.serviceNameThai, item: `/services/${service.slug}` }
  ];

  return (
    <>
      {/* Hero Header Banner */}
      <header className="hero-local text-center py-5 text-white" style={{ background: "var(--blue-gradient)", position: "relative" }}>
        <div className="container py-4">
          <Breadcrumbs items={breadcrumbItems} />
          
          <h1 className="display-4 fw-bold mb-3" style={{ fontFamily: "var(--font-prompt)", lineHeight: "1.2" }}>
            {service.h1}
          </h1>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: "800px", fontSize: "1.15rem", opacity: 0.95 }}>
            {service.intro}
          </p>

          <ConversionCTA title="ประเมินราคาและจองคิวด่วน" />
        </div>
      </header>

      {/* Trust Showcase Block */}
      <TrustProofBlock />

      {/* Detail Content Section */}
      <section className="py-5 bg-white">
        <div className="container" style={{ maxWidth: "950px" }}>
          <div className="row g-4">
            {/* Left Column: Benefits & Process */}
            <div className="col-md-7">
              <h3 className="fw-bold text-dark mb-3" style={{ fontFamily: "var(--font-prompt)" }}>
                ✨ จุดเด่นการบริการ{service.shortName}
              </h3>
              <ul className="list-unstyled d-flex flex-column gap-3 mb-4">
                {service.benefits.map((benefit, index) => (
                  <li className="d-flex align-items-start gap-2" key={index}>
                    <i className="bi bi-patch-check-fill text-primary mt-1" style={{ fontSize: "1.1rem" }}></i>
                    <span className="text-secondary" style={{ fontSize: "1.05rem" }}>{benefit}</span>
                  </li>
                ))}
              </ul>

              <hr />

              <h3 className="fw-bold text-dark mt-4 mb-3" style={{ fontFamily: "var(--font-prompt)" }}>
                🔄 ขั้นตอนการใช้บริการขนย้าย
              </h3>
              <ol className="d-flex flex-column gap-3 mb-4 ps-3">
                {service.process.map((step, index) => (
                  <li key={index} className="text-muted" style={{ fontSize: "1rem", lineHeight: "1.6" }}>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* Right Column: Specifications Card */}
            <div className="col-md-5">
              <div className="p-4 rounded-4 border shadow-sm" style={{ backgroundColor: "#fafbfc" }}>
                <h4 className="fw-bold mb-3 text-secondary" style={{ fontSize: "1.2rem", fontFamily: "var(--font-prompt)" }}>
                  📋 รายละเอียดรถและอุปกรณ์
                </h4>
                
                <div className="mb-3">
                  <p className="small text-muted mb-1 fw-bold">ประเภทยานพาหนะ:</p>
                  <div className="d-flex flex-wrap gap-2">
                    {service.vehicleTypes.map((type) => (
                      <span className="badge bg-secondary text-white px-2 py-1.5" key={type} style={{ fontSize: "0.8rem" }}>
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <p className="small text-muted mb-1 fw-bold">เหมาะสำหรับลูกค้า:</p>
                  <div className="d-flex flex-wrap gap-2">
                    {service.suitableFor.map((suit) => (
                      <span className="badge bg-primary-subtle text-primary px-2 py-1.5" key={suit} style={{ fontSize: "0.8rem" }}>
                        {suit}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <p className="small text-muted mb-1 fw-bold">พื้นที่รับของหลัก:</p>
                  <div className="d-flex flex-wrap gap-1">
                    {service.serviceAreas.slice(0, 8).map((area) => (
                      <span className="badge bg-light text-secondary border px-2 py-1" key={area} style={{ fontSize: "0.75rem" }}>
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <hr />

                <h5 className="fw-bold text-primary mt-3" style={{ fontSize: "1.05rem", fontFamily: "var(--font-prompt)" }}>
                  💰 ข้อมูลราคาเพิ่มเติม
                </h5>
                <p className="small text-muted mb-0" style={{ lineHeight: "1.6" }}>
                  {service.priceNotes}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Guide */}
      <PricingGuideBlock priceNotes={service.priceNotes} />

      {/* FAQ block */}
      <FaqBlock
        id={`faq-${service.slug}`}
        items={service.faqs}
        title={`คำถามที่พบบ่อย (FAQ) - ${service.serviceNameThai}`}
        subtitle={`คำถามยอดฮิตเกี่ยวกับการใช้บริการ${service.shortName}`}
      />

      {/* Related semantic internal links */}
      <RelatedLinks currentSlug={service.slug} entityType="service" />

      {/* Global hub */}
      <SeoLinkHub excludeSlug={service.slug} />
    </>
  );
}
