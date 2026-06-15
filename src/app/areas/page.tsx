// Areas index page with Bento Grid layout
import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "พื้นที่ให้บริการรับจ้างขนของ - MJ-TH Express",
  description: "MJ-TH Express ให้บริการครอบคลุมกรุงเทพฯ ปริมณฑล และส่งด่วนข้ามจังหวัดทั่วประเทศ ตรวจสอบพื้นที่และจุดจอดรถของเรา",
};

const zones = [
  {
    title: "ฝั่งธนบุรี & พุทธมณฑล (จุดจอดรถหลัก)",
    description: "พื้นที่สแตนบายหลัก รถเข้าถึงหน้างานไวภายใน 30-45 นาที",
    icon: "bi-building-fill-check",
    accent: "#ffd700", // Gold
    areas: [
      { name: "พุทธมณฑล สาย 1-8", link: "/areas/phutthamonthon-transport" },
      { name: "ศาลายา", link: "/areas/phutthamonthon-transport" },
      { name: "หนองแขม", link: "/areas/nongkhaem-transport" },
      { name: "เพชรเกษม", link: "/areas/nongkhaem-transport" },
      { name: "พระราม 2", link: "/areas/rama2-bangbon-transport" },
      { name: "บางบอน", link: "/areas/rama2-bangbon-transport" },
      { name: "บางแค", link: "/areas/nongkhaem-transport" },
      { name: "ตลิ่งชัน", link: "/areas/phra-nakhon-transport" },
    ],
    gridArea: "zone-1"
  },
  {
    title: "กรุงเทพฯ ชั้นใน & ศูนย์กลางธุรกิจ",
    description: "บริการขนย้ายเข้า-ออกคอนโด สำนักงาน กลางใจเมือง",
    icon: "bi-buildings-fill",
    accent: "#0d6efd", // Blue
    areas: [
      { name: "สาทร / สีลม", link: "/areas/phra-nakhon-transport" },
      { name: "สุขุมวิท / อโศก", link: "/areas/phra-nakhon-transport" },
      { name: "พระนคร / เยาวราช", link: "/areas/phra-nakhon-transport" },
      { name: "ดินแดง / ห้วยขวาง", link: "/areas/phra-nakhon-transport" },
      { name: "จตุจักร / ลาดพร้าว", link: "/areas/phra-nakhon-transport" },
    ],
    gridArea: "zone-2"
  },
  {
    title: "เขตปริมณฑล & นิคมอุตสาหกรรม",
    description: "รองรับการย้ายบ้าน ขนส่งสินค้าโรงงาน พัสดุชิ้นใหญ่",
    icon: "bi-cone-striped",
    accent: "#198754", // Success Green
    areas: [
      { name: "สมุทรสาคร (มหาชัย)", link: "/areas/samut-sakhon-transport" },
      { name: "นครปฐม", link: "/areas/phutthamonthon-transport" },
      { name: "นนทบุรี", link: "/areas/phra-nakhon-transport" },
      { name: "ปทุมธานี", link: "/areas/phra-nakhon-transport" },
      { name: "สมุทรปราการ", link: "/areas/phra-nakhon-transport" },
    ],
    gridArea: "zone-3"
  },
  {
    title: "ต่างจังหวัด & ข้ามภูมิภาค",
    description: "รับเหมาคันไปต่างจังหวัด ส่งมอเตอร์ไซค์ ขนย้ายข้ามภาค",
    icon: "bi-sign-turn-right-fill",
    accent: "#dc3545", // Red
    areas: [
      { name: "ภาคเหนือ (เชียงใหม่, พิษณุโลก ฯลฯ)", link: "/motorcycle-transport" },
      { name: "ภาคอีสาน (โคราช, ขอนแก่น ฯลฯ)", link: "/motorcycle-transport" },
      { name: "ภาคตะวันออก (ชลบุรี, ระยอง ฯลฯ)", link: "/motorcycle-transport" },
      { name: "ภาคใต้ (ภูเก็ต, สุราษฎร์ฯ ฯลฯ)", link: "/motorcycle-transport" },
    ],
    gridArea: "zone-4"
  }
];

export default function AreasIndexPage() {
  return (
    <main style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* 1) Premium Corporate Hero Section */}
      <section className="position-relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0b2e59 0%, #061830 100%)", minHeight: "45vh", display: "flex", alignItems: "center" }}>
        
        {/* Subtle Map Pattern / Glow */}
        <div className="position-absolute top-0 start-0 w-100 h-100 opacity-25" style={{ 
          backgroundImage: "radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.15) 0%, transparent 40%), radial-gradient(circle at 20% 80%, rgba(13, 110, 253, 0.2) 0%, transparent 40%)" 
        }}></div>

        <div className="container position-relative z-1 py-5 mt-4 text-center">
          <span className="badge border border-warning text-warning px-3 py-2 rounded-pill mb-3 fw-medium font-prompt animate-pulse-badge" style={{ background: "rgba(255,215,0,0.1)", backdropFilter: "blur(4px)" }}>
            <i className="bi bi-map-fill me-2"></i> Service Coverage
          </span>
          <h1 className="display-4 fw-bold text-white mb-3 font-prompt text-shadow-sm">
            พื้นที่ให้บริการ <span className="text-warning">ครอบคลุมทั่วไทย</span>
          </h1>
          <p className="lead text-white-50 mx-auto" style={{ maxWidth: "700px", fontFamily: "var(--font-sarabun)" }}>
            MJ-TH Express มีจุดสแตนบายกระจายทั่วกรุงเทพฯ และปริมณฑล ทำให้เราเข้าถึงหน้างานได้รวดเร็วทันใจ พร้อมให้บริการขนย้าย ขนของ และส่งมอเตอร์ไซค์ข้ามจังหวัดตลอด 24 ชั่วโมง
          </p>
        </div>
      </section>

      {/* 2) Bento Grid Layout */}
      <section className="py-5">
        <div className="container" style={{ marginTop: "-60px", position: "relative", zIndex: 10 }}>
          
          <div className="bento-grid">
            {zones.map((zone, idx) => (
              <div 
                className="bento-card bg-white rounded-4 shadow-sm border-0 overflow-hidden premium-card-hover" 
                style={{ 
                  gridArea: zone.gridArea, 
                  transition: "all 0.35s cubic-bezier(0.165, 0.84, 0.44, 1)",
                  border: "1px solid rgba(0,0,0,0.06)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "between"
                }} 
                key={idx}
              >
                {/* Header card info */}
                <div className="p-4" style={{ background: `linear-gradient(180deg, ${zone.accent}0a 0%, rgba(255,255,255,0) 100%)` }}>
                  <div className="d-flex align-items-center gap-3">
                    <div 
                      className="text-white rounded-3 d-flex align-items-center justify-content-center shadow-sm" 
                      style={{ 
                        width: "50px", 
                        height: "50px", 
                        fontSize: "1.5rem",
                        backgroundColor: zone.gridArea === "zone-1" ? "#cfa600" : zone.accent,
                        boxShadow: `0 8px 20px ${zone.accent}22`
                      }}
                    >
                      <i className={`bi ${zone.icon}`}></i>
                    </div>
                    <div>
                      <h3 className="fw-bold text-dark mb-1 font-prompt fs-5">{zone.title}</h3>
                      <p className="text-muted small mb-0 font-sarabun">{zone.description}</p>
                    </div>
                  </div>
                </div>

                {/* Badge list */}
                <div className="p-4 pt-0 flex-grow-1">
                  <div className="d-flex flex-wrap gap-2">
                    {zone.areas.map((area, aIdx) => (
                      <Link href={area.link} key={aIdx} className="text-decoration-none">
                        <span 
                          className="district-badge d-inline-flex align-items-center border px-3 py-2 rounded-pill text-secondary font-prompt bg-light"
                          style={{
                            fontSize: "0.875rem",
                            border: "1px solid #e2e8f0"
                          }}
                        >
                          <i 
                            className="bi bi-geo-alt-fill me-1" 
                            style={{ 
                              color: zone.gridArea === "zone-1" ? "#cfa600" : zone.accent 
                            }}
                          ></i>
                          {area.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Embedded Styles for Pro Max UI */}
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
        
        /* Bento Grid Specific Structure */
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 24px;
        }

        @media (min-width: 992px) {
          .bento-grid {
            grid-template-areas: 
              "zone-1 zone-1 zone-1 zone-1 zone-1 zone-1 zone-1 zone-2 zone-2 zone-2 zone-2 zone-2"
              "zone-3 zone-3 zone-3 zone-3 zone-3 zone-4 zone-4 zone-4 zone-4 zone-4 zone-4 zone-4";
          }
        }

        @media (max-width: 991px) {
          .bento-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-areas: 
              "zone-1 zone-2"
              "zone-3 zone-4";
          }
        }

        @media (max-width: 767px) {
          .bento-grid {
            grid-template-columns: 1fr;
            grid-template-areas: none;
            gap: 16px;
          }
          .bento-card {
            grid-area: auto !important;
          }
        }

        .premium-card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(11, 46, 89, 0.08) !important;
          border-color: rgba(11, 46, 89, 0.15) !important;
        }

        .district-badge {
          transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
        }

        .district-badge:hover {
          transform: translateY(-3px);
          background-color: #ffffff !important;
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.05);
          border-color: #0b2e59 !important;
          color: #0b2e59 !important;
        }
        
        .district-badge:hover i {
          animation: pinBounce 0.6s ease infinite alternate;
        }

        @keyframes pinBounce {
          0% { transform: translateY(0); }
          100% { transform: translateY(-4px) scale(1.15); }
        }
      `}} />
    </main>
  );
}
