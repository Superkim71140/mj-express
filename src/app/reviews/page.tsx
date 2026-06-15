import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import ConversionCTA from "@/components/seo/ConversionCTA";
import SeoLinkHub from "@/components/seo/SeoLinkHub";
import JsonLd from "@/components/JsonLd";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildReviewSchema, buildMovingCompanySchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildPageMetadata({
  title: "รีวิวความเห็นลูกค้า ย้ายบ้าน คอนโด ส่งมอเตอร์ไซค์ | MJ-TH Express",
  description: "อ่านรีวิวความเห็นและความพึงพอใจของลูกค้าที่เลือกใช้บริการรถกระบะรับจ้างขนของ ย้ายหอพัก คอนโด และขนส่งรถมอเตอร์ไซค์ทั่วไทยกับ MJ-TH Express การันตี 5 ดาวเต็ม",
  canonicalPath: "/reviews",
});

const allReviews = [
  {
    author: "คุณ Kamolwan Pongnil",
    location: "ลูกค้าทาง Facebook",
    image: "/assets/images/รีวิว ผู้ชายจริง 1.webp",
    ratingValue: 5,
    datePublished: "2026-05-12",
    reviewBody: "รถมอไซค์จากปทุมธานี กลับชุมพร ไม่ถึง 24 ชั่วโมง รถถึงแล้ว ประทับใจมากก มากกว่าการประทับใจคือบริการดีมากๆ ค่ะ เจ้าหน้าที่ทุกคนพูดจาดีสุดๆ ชอบบบบ อยากให้ทุกคนมาใช้บริการกันเยอะๆ ค้าบ ดีจริง!!!"
  },
  {
    author: "คุณ Mim Mim",
    location: "ลูกค้าทาง Facebook",
    image: "/assets/images/รีวิว ผู้ชายจริง 2.webp",
    ratingValue: 5,
    datePublished: "2026-05-28",
    reviewBody: "บริการดีประทับใจมาก ราคาถูกบริการดีมีที่นี่ พนักงานพูดจาเพราะ ตอบแชทไวมาก 💖 ย้ายหอขนของเยอะแต่พนักงานยกจัดวางเป็นระเบียบเรียบร้อยมากค่ะ"
  },
  {
    author: "คุณ ซุปเปอร์ คิม",
    location: "ลูกค้าทาง Facebook",
    image: "/assets/images/รีวืวผู้ใช้งานจริง.webp",
    ratingValue: 5,
    datePublished: "2026-06-02",
    reviewBody: "เพจนี้ทีมงานสุภาพ ส่งของให้จริง เราใช้บริการส่งมอไซค์กลับต่างจังหวัด ปลายทางได้รับของจริงค่า แนะนำทักคุยที่เพจนี้ก่อนเลย จัดส่งด่วนตู้อลูมิเนียมกันแดดกันฝนปลอดภัยหายห่วง"
  },
  {
    author: "คุณ อัญชลี รักษ์ดี",
    location: "ลูกค้าทาง Line",
    image: "/assets/images/รีวิว ผู้ชายจริง 1.webp", // fallback avatar
    ratingValue: 5,
    datePublished: "2026-06-05",
    reviewBody: "ประทับใจบริการย้ายบ้านบางแคไปนครปฐมมากค่ะ มีคนยกของมาด้วย 2 คน ทำงานไว เป็นกันเอง สุภาพเรียบร้อยมาก ไม่มีของชิ้นไหนเสียหายเลย ประเมินราคาก่อนเริ่มงานไม่มีบวกเพิ่มหน้างานจริง แนะนำเลยค่ะ"
  },
  {
    author: "คุณ ณัฐวุฒิ สมบูรณ์",
    location: "ลูกค้าทาง Facebook",
    image: "/assets/images/รีวิว ผู้ชายจริง 2.webp",
    ratingValue: 5,
    datePublished: "2026-06-10",
    reviewBody: "ส่งบิ๊กไบค์ Kawasaki Z900 ไปเชียงใหม่ พี่คนขับรัดล้อแน่นหนามาก มีผ้าหุ้มเบาะหุ้มถังน้ำมันกันเป็นรอย VIP สมราคาครับ รถไม่มีรอยแม้แต่นิดเดียว ถึงหน้าบ้านเชียงใหม่ปลอดภัยรวดเร็ว แนะนำเพจนี้ครับ"
  },
  {
    author: "คุณ ศิริพร พรมมา",
    location: "ลูกค้าทาง Line",
    image: "/assets/images/รีวืวผู้ใช้งานจริง.webp",
    ratingValue: 5,
    datePublished: "2026-06-14",
    reviewBody: "ย้ายห้องจากหอพักแถวศาลายาไปคอนโดแถวสุขุมวิทค่ะ ทีมงานช่วยยกลงตึกสูงไม่มีลิฟต์อย่างกระฉับกระเฉง รวดเร็วมาก ราคาดี เหมาะกับนักศึกษา พนักงานสุภาพดีค่ะ"
  }
];

export default function ReviewsPage() {
  const breadcrumbItems = [
    { name: "รีวิวความเห็นลูกค้า", item: "/reviews" }
  ];

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "หน้าแรก", item: "/" },
    { name: "รีวิวความเห็นลูกค้า", item: "/reviews" }
  ]);

  const movingCompanySchema = buildMovingCompanySchema();
  // Inject aggregate rating into moving company schema
  const companyWithRatingSchema = {
    ...movingCompanySchema,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": allReviews.length.toString(),
      "bestRating": "5",
      "worstRating": "4"
    }
  };

  const reviewSchema = buildReviewSchema(allReviews);

  return (
    <>
      <JsonLd data={[breadcrumbSchema, companyWithRatingSchema, reviewSchema]} />

      <header className="hero-local text-center py-5 text-white" style={{ background: "var(--blue-gradient)" }}>
        <div className="container py-4">
          <Breadcrumbs items={breadcrumbItems} />
          <h1 className="display-4 fw-bold mb-3" style={{ fontFamily: "var(--font-prompt)" }}>
            รีวิวความเห็นและผลตอบรับจากลูกค้าจริง
          </h1>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: "800px", opacity: 0.95 }}>
            การันตีคุณภาพและความพึงพอใจ 5 ดาวเต็มจากผู้ใช้บริการขนย้ายและส่งมอเตอร์ไซค์จริงทั่วประเทศ
          </p>
          <div className="d-inline-flex align-items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-pill backdrop-blur">
            <span className="text-warning fw-bold fs-4">★★★★★</span>
            <span className="text-white small fw-bold">4.9 / 5.0 คะแนนความพึงพอใจ</span>
          </div>
        </div>
      </header>

      <section className="py-5 bg-white">
        <div className="container" style={{ maxWidth: "1000px" }}>
          
          <div className="row g-4">
            {allReviews.map((review, idx) => (
              <div className="col-md-6" key={idx}>
                <div className="p-4 rounded-4 border bg-light h-100 d-flex flex-column" style={{ position: "relative" }}>
                  <i className="bi bi-quote text-primary opacity-25 position-absolute top-0 end-0" style={{ fontSize: "5rem", marginTop: "-10px", marginRight: "10px" }}></i>
                  
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="position-relative" style={{ width: "60px", height: "60px" }}>
                      <Image
                        src={review.image}
                        alt={review.author}
                        fill
                        className="rounded-circle object-fit-cover border border-2 border-white shadow-sm"
                        sizes="60px"
                      />
                    </div>
                    <div>
                      <h4 className="fw-bold mb-0 text-dark" style={{ fontSize: "1rem", fontFamily: "var(--font-prompt)" }}>
                        {review.author}
                      </h4>
                      <span className="small text-muted">{review.location}</span>
                    </div>
                  </div>

                  <div className="text-warning mb-2" style={{ fontSize: "1.1rem" }}>
                    {Array.from({ length: review.ratingValue }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>

                  <p className="text-secondary small font-sarabun leading-relaxed flex-grow-1" style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
                    {review.reviewBody}
                  </p>
                  
                  <span className="text-muted small mt-3 block align-self-end">
                    📅 รีวิวเมื่อ: {review.datePublished}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <ConversionCTA title="อยากสัมผัสบริการระดับ 5 ดาวด้วยตัวเอง?" subtitle="แอดไลน์ส่งของที่ต้องการขนย้าย เช็คราคาก่อนเริ่มงานได้เลยฟรี ตลอด 24 ชม." />
        </div>
      </section>

      <SeoLinkHub />
    </>
  );
}
