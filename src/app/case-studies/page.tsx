import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { caseStudiesData } from "@/data/case-studies";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import ConversionCTA from "@/components/seo/ConversionCTA";
import SeoLinkHub from "@/components/seo/SeoLinkHub";
import JsonLd from "@/components/JsonLd";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildItemListSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildPageMetadata({
  title: "ผลงานขนของย้ายบ้าน ย้ายคอนโด ส่งมอเตอร์ไซค์จริง | MJ-TH Express",
  description: "ดูเคสตัวอย่างงานขนย้ายของจริงล่าสุดโดยทีมงาน MJ-TH Express เช่น ย้ายคอนโดตึกสูง ขนของข้ามจังหวัดกรุงเทพฯ-เชียงใหม่ ขนส่งมอเตอร์ไซค์ Vespa ลงใต้ ขนสัตว์เลี้ยง",
  canonicalPath: "/case-studies",
});

export default function CaseStudiesPage() {
  const breadcrumbItems = [
    { name: "ผลงานขนย้ายจริง", item: "/case-studies" }
  ];

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "หน้าแรก", item: "/" },
    { name: "ผลงานขนย้ายจริง", item: "/case-studies" }
  ]);

  const itemListSchema = buildItemListSchema(
    caseStudiesData.map((cs) => ({
      name: cs.title,
      url: `/case-studies/${cs.slug}`
    }))
  );

  return (
    <>
      <JsonLd data={[breadcrumbSchema, itemListSchema]} />

      <header className="hero-local text-center py-5 text-white" style={{ background: "var(--blue-gradient)" }}>
        <div className="container py-4">
          <Breadcrumbs items={breadcrumbItems} />
          <h1 className="display-4 fw-bold mb-3" style={{ fontFamily: "var(--font-prompt)" }}>
            ผลงานขนของย้ายบ้าน ย้ายคอนโด ส่งมอเตอร์ไซค์จริง
          </h1>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: "800px", opacity: 0.95 }}>
            การันตีผลงานการให้บริการด้วยเคสจริงหน้างาน ปลอดภัย มั่นใจได้ 100%
          </p>
        </div>
      </header>

      <section className="py-5 bg-white">
        <div className="container" style={{ maxWidth: "1200px" }}>
          <div className="row g-4">
            {caseStudiesData.map((study) => (
              <div className="col-md-6 col-lg-4" key={study.slug}>
                <div className="card h-100 border shadow-sm rounded-4 overflow-hidden d-flex flex-column" style={{ transition: "transform 0.2s ease" }}>
                  <div className="position-relative" style={{ height: "220px" }}>
                    <Image
                      src={study.image}
                      alt={study.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-fit-cover"
                      loading="lazy"
                    />
                    <div className="position-absolute top-0 end-0 bg-primary text-white px-3 py-1.5 rounded-start-pill small fw-semibold" style={{ margin: "10px" }}>
                      {study.jobType}
                    </div>
                  </div>
                  
                  <div className="card-body bg-white d-flex flex-column flex-grow-1 p-4">
                    <h3 className="card-title fw-bold text-dark mb-2" style={{ fontFamily: "var(--font-prompt)", fontSize: "1.15rem", lineHeight: "1.4" }}>
                      {study.title.replace(" | MJ-TH Express", "")}
                    </h3>
                    <p className="card-text text-muted small mb-4 flex-grow-1" style={{ lineHeight: "1.6" }}>
                      {study.description}
                    </p>
                    
                    <div className="p-3 bg-light rounded-3 mb-3 small border-start border-warning border-3">
                      <span className="d-block text-secondary"><strong>📍 เส้นทาง:</strong> {study.route}</span>
                      <span className="d-block text-secondary mt-1"><strong>🚛 รถที่ใช้:</strong> {study.vehicle.split("พร้อม")[0]}</span>
                    </div>

                    <Link href={`/case-studies/${study.slug}`} className="btn btn-outline-primary w-100 rounded-pill fw-bold mt-auto">
                      อ่านรายละเอียดเคสขนย้าย <i className="bi bi-arrow-right-short"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <ConversionCTA title="ต้องการให้เราช่วยขนย้ายงานของคุณ?" subtitle="ประเมินราคาตามจุดพิกัดจริง รวดเร็ว ไม่มีชาร์จเพิ่ม โทรหาทีมงานหรือแชทคุยผ่าน LINE ได้ทันที" />
        </div>
      </section>

      <SeoLinkHub />
    </>
  );
}
