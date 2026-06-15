import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { caseStudiesData } from "@/data/case-studies";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import ConversionCTA from "@/components/seo/ConversionCTA";
import SeoLinkHub from "@/components/seo/SeoLinkHub";
import RelatedLinks from "@/components/seo/RelatedLinks";
import JsonLd from "@/components/JsonLd";
import { buildCaseStudyMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildMovingCompanySchema } from "@/lib/seo/schema";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for build pre-rendering
export async function generateStaticParams() {
  return caseStudiesData.map((study) => ({
    slug: study.slug,
  }));
}

// Generate unique metadata per case study
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudiesData.find((cs) => cs.slug === slug);
  if (!study) return {};
  return buildCaseStudyMetadata(study);
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = caseStudiesData.find((cs) => cs.slug === slug);

  if (!study) {
    notFound();
  }

  const breadcrumbItems = [
    { name: "ผลงานขนย้ายจริง", item: "/case-studies" },
    { name: study.title.replace(" | MJ-TH Express", ""), item: `/case-studies/${study.slug}` }
  ];

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "หน้าแรก", item: "/" },
    { name: "ผลงานขนย้ายจริง", item: "/case-studies" },
    { name: study.title.replace(" | MJ-TH Express", ""), item: `/case-studies/${study.slug}` }
  ]);

  const companySchema = buildMovingCompanySchema();

  return (
    <>
      <JsonLd data={[breadcrumbSchema, companySchema]} />

      {/* Hero Header */}
      <header className="hero-local text-center py-5 text-white" style={{ background: "var(--blue-gradient)" }}>
        <div className="container py-4">
          <Breadcrumbs items={breadcrumbItems} />
          
          <span className="badge bg-warning text-dark mb-2 px-3 py-2 fw-bold" style={{ fontSize: "0.9rem" }}>
            <i className="bi bi-patch-check-fill me-1"></i> เคสตัวอย่างงานจริง
          </span>
          
          <h1 className="display-5 fw-bold mb-3" style={{ fontFamily: "var(--font-prompt)", lineHeight: "1.3" }}>
            {study.h1}
          </h1>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: "800px", fontSize: "1.15rem", opacity: 0.95 }}>
            {study.intro}
          </p>
        </div>
      </header>

      {/* Main Case Study Layout */}
      <section className="py-5 bg-white">
        <div className="container" style={{ maxWidth: "1000px" }}>
          <div className="row g-5">
            
            {/* Left Column: Details Flow */}
            <div className="col-md-7">
              {/* Challenge */}
              <div className="mb-5">
                <h3 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2" style={{ fontFamily: "var(--font-prompt)", fontSize: "1.4rem" }}>
                  <i className="bi bi-exclamation-octagon-fill text-danger"></i> ความท้าทายของงาน (Challenge)
                </h3>
                <p className="text-secondary leading-relaxed font-sarabun" style={{ fontSize: "1.05rem", lineHeight: "1.75" }}>
                  {study.challenge}
                </p>
              </div>

              {/* Solution */}
              <div className="mb-5">
                <h3 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2" style={{ fontFamily: "var(--font-prompt)", fontSize: "1.4rem" }}>
                  <i className="bi bi-gear-fill text-primary"></i> แผนงานและการปฏิบัติงาน (Solution)
                </h3>
                <p className="text-secondary leading-relaxed font-sarabun" style={{ fontSize: "1.05rem", lineHeight: "1.75" }}>
                  {study.solution}
                </p>
              </div>

              {/* Result */}
              <div className="mb-5">
                <h3 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2" style={{ fontFamily: "var(--font-prompt)", fontSize: "1.4rem" }}>
                  <i className="bi bi-check-circle-fill text-success"></i> ผลลัพธ์ที่ได้ (Result)
                </h3>
                <p className="text-secondary leading-relaxed font-sarabun" style={{ fontSize: "1.05rem", lineHeight: "1.75" }}>
                  {study.result}
                </p>
              </div>
            </div>

            {/* Right Column: Sidebar Specs & Media */}
            <div className="col-md-5">
              <div className="p-4 rounded-4 border bg-light shadow-sm mb-4">
                <h4 className="fw-bold text-secondary mb-3" style={{ fontSize: "1.2rem", fontFamily: "var(--font-prompt)" }}>
                  📊 สรุปข้อมูลงานขนย้าย
                </h4>
                
                <ul className="list-unstyled mb-0 d-flex flex-column gap-3">
                  <li className="border-bottom pb-2">
                    <span className="small text-muted d-block">ประเภทงานบริการ:</span>
                    <strong className="text-dark font-prompt">{study.jobType}</strong>
                  </li>
                  <li className="border-bottom pb-2">
                    <span className="small text-muted d-block">พื้นที่ต้นทาง-ปลายทาง:</span>
                    <strong className="text-dark font-prompt">{study.area}</strong>
                  </li>
                  <li className="border-bottom pb-2">
                    <span className="small text-muted d-block">เส้นทางเดินรถ:</span>
                    <strong className="text-dark font-prompt">{study.route}</strong>
                  </li>
                  <li>
                    <span className="small text-muted d-block">รถกระบะที่ใช้ขนย้าย:</span>
                    <strong className="text-dark font-prompt">{study.vehicle}</strong>
                  </li>
                </ul>
              </div>

              {/* Media */}
              <div className="border rounded-4 overflow-hidden shadow-sm position-relative" style={{ height: "300px" }}>
                <Image
                  src={study.image}
                  alt={study.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-fit-cover"
                />
                <div className="position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-75 text-white p-3 text-center small font-sarabun">
                  📸 ภาพถ่ายบรรยากาศการจัดขนย้ายจริง
                </div>
              </div>
            </div>

          </div>

          <ConversionCTA title="อยากได้บริการขนย้ายแบบมืออาชีพเช่นนี้?" subtitle="ประเมินราคาตามหน้างานจริง สะดวกรวดเร็ว ไม่มีค่าบริการแอบแฝง ไม่มีบวกเพิ่มทีหลัง โทรสายตรงคุยกับทีมงานได้ทันที" />
        </div>
      </section>

      {/* Semantic inter-linking context */}
      <RelatedLinks currentSlug={study.slug} entityType="service" />

      {/* Global Hub */}
      <SeoLinkHub />
    </>
  );
}
