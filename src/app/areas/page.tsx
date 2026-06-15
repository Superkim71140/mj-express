// Areas index page with dynamic search, tabs, and Pro Max UI
import React from "react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { localAreas } from "@/data/areas";
import AreaSearchFilter from "@/components/AreaSearchFilter";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = buildPageMetadata({
  title: "พื้นที่ให้บริการรถรับจ้างขนของ ทั่วไทย 24 ชม. | MJ-TH Express",
  description: "บริการรถรับจ้างขนของ ย้ายบ้าน คอนโด หอพัก ส่งมอเตอร์ไซค์ สแตนบายทั่วกรุงเทพฯ ฝั่งธนฯ เพชรเกษม บางแค หนองแขม พุทธมณฑล พระราม 2 และปริมณฑล โทร 095-583-0371",
  canonicalPath: "/areas",
});

export default function AreasIndexPage() {
  return (
    <main style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* 1) Premium Corporate Hero Section */}
      <section 
        className="position-relative overflow-hidden" 
        style={{ 
          background: "linear-gradient(135deg, #0b2e59 0%, #061830 100%)", 
          minHeight: "45vh", 
          display: "flex", 
          alignItems: "center" 
        }}
      >
        {/* Subtle Map Pattern / Glow */}
        <div 
          className="position-absolute top-0 start-0 w-100 h-100 opacity-25" 
          style={{ 
            backgroundImage: "radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.15) 0%, transparent 40%), radial-gradient(circle at 20% 80%, rgba(13, 110, 253, 0.2) 0%, transparent 40%)" 
          }}
        ></div>

        <div className="container position-relative z-3 py-5 mt-4 text-center">
          <span 
            className="badge border border-warning text-warning px-3 py-2 rounded-pill mb-3 fw-medium font-prompt animate-pulse-badge" 
            style={{ background: "rgba(255,215,0,0.1)", backdropFilter: "blur(4px)" }}
          >
            <i className="bi bi-map-fill me-2"></i> Service Area Coverage
          </span>
          <h1 className="display-4 fw-bold text-white mb-3 font-prompt text-shadow-sm">
            พื้นที่ให้บริการ <span className="text-warning">รถรับจ้างขนของ</span>
          </h1>
          <p className="lead text-white-50 mx-auto" style={{ maxWidth: "720px", fontFamily: "var(--font-sarabun)" }}>
            MJ-TH Express บริการรถกระบะรับจ้างขนของ ย้ายบ้าน ย้ายหอพักคอนโด ส่งมอเตอร์ไซค์ด่วน ครอบคลุมทั่วกรุงเทพฯ ปริมณฑล และจัดส่งข้ามจังหวัดทั่วประเทศ สแตนบายพร้อมรับงานตลอด 24 ชั่วโมง
          </p>
        </div>
      </section>

      {/* 2) Interactive Filtering and Search Area */}
      <section className="py-5" style={{ position: "relative", zIndex: 10 }}>
        <div className="container" style={{ marginTop: "-80px" }}>
          <AreaSearchFilter localAreas={localAreas} />
        </div>
      </section>

      {/* 3) Service Areas FAQ Block */}
      <section className="py-5 bg-white border-top">
        <div className="container" style={{ maxWidth: "900px" }}>
          <div className="text-center mb-5">
            <span className="text-primary fw-bold font-prompt text-uppercase tracking-wider small">FAQ</span>
            <h2 className="fw-bold font-prompt text-dark mt-2">คำถามที่พบบ่อยเกี่ยวกับพื้นที่ให้บริการ</h2>
            <p className="text-muted font-sarabun">ไขข้อข้องใจเรื่องจุดจอด สัญญารับงาน และขั้นตอนเข้าบริการขนย้าย</p>
          </div>

          <div className="accordion font-sarabun" id="areasFaq">
            {/* FAQ 1 */}
            <div className="accordion-item border rounded-3 mb-3 overflow-hidden">
              <h3 className="accordion-header" id="faqHeadingOne">
                <button 
                  className="accordion-button fw-bold text-dark font-prompt py-3" 
                  type="button" 
                  data-bs-toggle="collapse" 
                  data-bs-target="#faqCollapseOne" 
                  aria-expanded="true" 
                  aria-controls="faqCollapseOne"
                  style={{ background: "#f8fafc" }}
                >
                  📍 MJ-TH Express ให้บริการครอบคลุมพื้นที่ใดบ้าง?
                </button>
              </h3>
              <div 
                id="faqCollapseOne" 
                className="accordion-collapse collapse show" 
                aria-labelledby="faqHeadingOne" 
                data-bs-parent="#areasFaq"
              >
                <div className="accordion-body text-secondary" style={{ lineHeight: "1.7" }}>
                  เราให้บริการหลักทั่วกรุงเทพฯ และปริมณฑล โดยมีจุดสแตนบายสำคัญในฝั่งธนบุรี (บางแค, หนองแขม, พุทธมณฑล, เพชรเกษม, พระราม 2, บางบอน) และในเมืองชั้นใน เช่น สาทร, สุขุมวิท, พระนคร รวมถึงจังหวัดปริมณฑล (สมุทรสาคร, นครปฐม, นนทบุรี, ปทุมธานี, สมุทรปราการ) นอกจากนี้ เรายังมีบริการรับเหมาคันส่งของและขนส่งมอเตอร์ไซค์ข้ามจังหวัดทั่วประเทศ (เหนือ, อีสาน, ใต้, ตะวันออก) ตลอด 24 ชั่วโมง
                </div>
              </div>
            </div>

            {/* FAQ 2 */}
            <div className="accordion-item border rounded-3 mb-3 overflow-hidden">
              <h3 className="accordion-header" id="faqHeadingTwo">
                <button 
                  className="accordion-button collapsed fw-bold text-dark font-prompt py-3" 
                  type="button" 
                  data-bs-toggle="collapse" 
                  data-bs-target="#faqCollapseTwo" 
                  aria-expanded="false" 
                  aria-controls="faqCollapseTwo"
                  style={{ background: "#f8fafc" }}
                >
                  ⚡ ในกรณีเรียกใช้งานด่วน จะใช้เวลาเดินทางถึงหน้างานกี่นาที?
                </button>
              </h3>
              <div 
                id="faqCollapseTwo" 
                className="accordion-collapse collapse" 
                aria-labelledby="faqHeadingTwo" 
                data-bs-parent="#areasFaq"
              >
                <div className="accordion-body text-secondary" style={{ lineHeight: "1.7" }}>
                  สำหรับลูกค้าในพื้นที่สแตนบายหลัก เช่น เขตบางแค, หนองแขม, พุทธมณฑลสาย 1-5, เพชรเกษม, พระราม 2, มหาชัย, และสามพราน เราสามารถส่งรถกระบะตู้อลูมิเนียมทึบเข้ารับสินค้าถึงหน้างานได้ภายใน 30-45 นาทีหลังสรุปยอดและยืนยันคิวงาน สำหรับพื้นที่ในเมืองชั้นในอาจใช้เวลาประมาณ 45-60 นาที ขึ้นอยู่กับสภาพการจราจรขณะนั้น
                </div>
              </div>
            </div>

            {/* FAQ 3 */}
            <div className="accordion-item border rounded-3 mb-3 overflow-hidden">
              <h3 className="accordion-header" id="faqHeadingThree">
                <button 
                  className="accordion-button collapsed fw-bold text-dark font-prompt py-3" 
                  type="button" 
                  data-bs-toggle="collapse" 
                  data-bs-target="#faqCollapseThree" 
                  aria-expanded="false" 
                  aria-controls="faqCollapseThree"
                  style={{ background: "#f8fafc" }}
                >
                  📦 รถขนของเป็นประเภทไหน และป้องกันของเปียกน้ำฝนได้จริงไหม?
                </button>
              </h3>
              <div 
                id="faqCollapseThree" 
                className="accordion-collapse collapse" 
                aria-labelledby="faqHeadingThree" 
                data-bs-parent="#areasFaq"
              >
                <div className="accordion-body text-secondary" style={{ lineHeight: "1.7" }}>
                  รถให้บริการหลักของเราเป็น รถกระบะ 4 ล้อใหญ่ ตู้ทึบอลูมิเนียม สูง 2.10 เมตร (วัดจากพื้นกระบะ) ซึ่งมีคุณสมบัติป้องกันฝนตกหนัก พายุ ลมแรง ฝุ่นละออง และป้องกันสิ่งของตกหล่นสูญหายได้ 100% เหมาะสำหรับงานขนย้ายของสำคัญ เช่น ที่นอน, ตู้เสื้อผ้า, ทีวี, เครื่องใช้ไฟฟ้า, เอกสารสำนักงาน และรถจักรยานยนต์ทุกประเภท
                </div>
              </div>
            </div>

            {/* FAQ 4 */}
            <div className="accordion-item border rounded-3 mb-3 overflow-hidden">
              <h3 className="accordion-header" id="faqHeadingFour">
                <button 
                  className="accordion-button collapsed fw-bold text-dark font-prompt py-3" 
                  type="button" 
                  data-bs-toggle="collapse" 
                  data-bs-target="#faqCollapseFour" 
                  aria-expanded="false" 
                  aria-controls="faqCollapseFour"
                  style={{ background: "#f8fafc" }}
                >
                  🤝 มีคนช่วยยกของขึ้นตึกสูงหรือคอนโดไหม และคิดราคาอย่างไร?
                </button>
              </h3>
              <div 
                id="faqCollapseFour" 
                className="accordion-collapse collapse" 
                aria-labelledby="faqHeadingFour" 
                data-bs-parent="#areasFaq"
              >
                <div className="accordion-body text-secondary" style={{ lineHeight: "1.7" }}>
                  มีแน่นอนครับ! MJ-TH Express มีบริการทีมงานช่วยขนย้ายมืออาชีพ ทั้งพนักงานขับรถช่วยยก และพนักงานยกเพิ่มเติมตามปริมาณของของท่าน โดยผ่านการอบรมยกของหนักอย่างระมัดระวัง ขนย้ายผ่านลิฟต์โดยสารของคอนโดหรือยกขึ้นบันไดอพาร์ทเม้นต์ได้อย่างชำนาญการ โดยคิดค่าใช้จ่ายพนักงานยกอย่างเหมาะสม เป็นธรรม และแจ้งราคาสุทธิล่วงหน้าก่อนทำงาน ไม่มีเก็บเพิ่มยิบย่อยหน้างานครับ
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4) Pro Max Conversion Banner */}
      <section className="py-5 text-white" style={{ background: "linear-gradient(135deg, #061830 0%, #0b2e59 100%)" }}>
        <div className="container py-4 text-center">
          <h2 className="fw-bold font-prompt mb-3">ต้องการเรียกใช้งาน รถรับจ้างขนของ ด่วน?</h2>
          <p className="lead opacity-75 mx-auto font-sarabun mb-4" style={{ maxWidth: "650px" }}>
            เช็คจุดสแตนบายรถด่วนในพื้นที่ของคุณ พร้อมรับประเมินราคาฟรีทันที ไม่มีค่าใช้จ่ายแอบแฝง
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <a 
              href={siteConfig.lineUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-warning btn-lg px-4 py-3 rounded-pill fw-bold font-prompt text-dark"
              style={{ boxShadow: "0 8px 20px rgba(255,215,0,0.25)" }}
            >
              <i className="bi bi-line me-2"></i> แชทประเมินราคาทาง LINE
            </a>
            <a 
              href={siteConfig.phoneHref} 
              className="btn btn-outline-light btn-lg px-4 py-3 rounded-pill fw-bold font-prompt"
            >
              <i className="bi bi-telephone-fill me-2"></i> โทรสายด่วน: {siteConfig.phone}
            </a>
          </div>
          <span className="d-block mt-3 font-sarabun text-white-50 small">
            * สแตนบายดูแล 24 ชั่วโมง ทุกวันไม่เว้นวันหยุดราชการ
          </span>
        </div>
      </section>

      {/* Styles for pulse glow and shadows */}
      <style dangerouslySetInnerHTML={{__html: `
        .text-shadow-sm {
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }

        .animate-pulse-badge {
          animation: pulseGlow 2s infinite ease-in-out;
        }

        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 0 0px rgba(255, 215, 0, 0.4);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(255, 215, 0, 0);
          }
        }
      `}} />
    </main>
  );
}
