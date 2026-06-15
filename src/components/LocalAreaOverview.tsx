import React from "react";
import { siteConfig } from "@/data/site";
import { LocalArea } from "@/data/areas";
import styles from "./LocalAreaOverview.module.css";

interface LocalAreaOverviewProps {
  area: LocalArea;
}

export default function LocalAreaOverview({ area }: LocalAreaOverviewProps) {
  // Safe fallbacks for missing list items to prevent rendering issues
  const localProblems = area.localProblems || [
    "การจราจรติดขัดในชั่วโมงเร่งด่วน",
    "ทางเข้าซอยแคบหอพักหรือคอนโดเข้าถึงลำบาก",
    "ฝนตกแดดแรงที่ทำให้สิ่งของเสียหายหากไม่มีการคลุมที่ดี"
  ];
  
  const serviceAreas = area.serviceAreas || area.areaServed || [];
  const popularRoutes = area.popularRoutes || [];
  const nearbyAreas = area.nearbyAreas || [];

  return (
    <section className={styles.serviceAreaSection}>
      <div className="container" style={{ maxWidth: "1200px" }}>
        {/* Section Header */}
        <div className={styles.serviceAreaHeader}>
          <div className={styles.serviceAreaEyebrow}>
            <i className="bi bi-geo-alt-fill"></i> พื้นที่ให้บริการด่วน
          </div>
          <h2 className={styles.sectionTitle}>
            🚚 รถรับจ้าง{area.h1} เพื่อความสะดวกในการขนของและย้ายที่อยู่
          </h2>
          <p className={styles.sectionIntro}>
            {area.intro}
          </p>
        </div>

        {/* Local Problems Solver Banner */}
        <div className={styles.problemsCard}>
          <h4 className={styles.problemsTitle}>
            <i className="bi bi-exclamation-triangle-fill text-warning"></i> ปัญหาขนย้ายในพื้นที่ ที่เราแก้ไขให้คุณได้:
          </h4>
          <ul className={styles.problemsList}>
            {localProblems.map((prob, idx) => (
              <li key={idx} className={styles.problemItem}>
                <i className={`bi bi-x-circle-fill ${styles.problemIcon}`}></i>
                <span>{prob}</span>
              </li>
            ))}
          </ul>
          <div className={styles.problemsFooter}>
            <i className="bi bi-shield-fill-check fs-5"></i>
            <span>MJ-TH Express จัดการทุกปัญหาด้วยทีมงานมืออาชีพและรถตู้ทึบกันน้ำ 100%</span>
          </div>
        </div>

        {/* Premium Service Area Command Card */}
        <div className={styles.serviceAreaCommandCard}>
          <div className={styles.serviceAreaGrid}>
            
            {/* Left Column (60% on Desktop) */}
            <div className={styles.leftColumn}>
              {/* 1. จุดรับงานหลัก */}
              <div className={styles.contentBlock}>
                <h3 className={styles.blockTitle}>
                  <i className="bi bi-compass-fill text-primary"></i> จุดรับงานหลัก
                </h3>
                <div className={styles.locationChipGrid}>
                  {serviceAreas.map((subArea) => (
                    <span className={styles.locationChip} key={subArea}>
                      <i className={`bi bi-geo-alt-fill ${styles.chipIcon}`}></i>
                      {subArea}
                    </span>
                  ))}
                </div>
              </div>

              {/* 2. เส้นทางและจุดจัดส่งยอดนิยม */}
              {popularRoutes.length > 0 && (
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>
                    <i className="bi bi-signpost-split-fill text-warning"></i> เส้นทางและจุดจัดส่งยอดนิยม
                  </h3>
                  <div className={styles.routeList}>
                    {popularRoutes.map((route, idx) => {
                      // Parse origin and destination for beautiful output
                      const parts = route.split(/\s*[-→]\s*/);
                      const origin = parts[0] || route;
                      const destination = parts[1] || "";
                      
                      // Determine custom badges or descriptions
                      const showBadge = idx === 0 || idx === 1;
                      const badgeText = idx === 0 ? "ยอดนิยม" : "ด่วน";
                      const helperText = idx % 2 === 0 ? "ขนย้ายด่วนเหมาคัน" : "รับส่งถึงหน้าบ้านปลอดภัย";

                      return (
                        <div key={idx} className={styles.routeItem}>
                          <div className={styles.routeIconWrapper}>
                            <i className="bi bi-arrow-right-short"></i>
                          </div>
                          <div className={styles.routeContent}>
                            <div className={styles.routeTitle}>
                              {destination ? (
                                <>
                                  {origin} <i className="bi bi-arrow-right text-muted mx-1" style={{ fontSize: "0.8rem" }}></i> {destination}
                                </>
                              ) : (
                                origin
                              )}
                              {showBadge && (
                                <span className={styles.routeBadge}>{badgeText}</span>
                              )}
                            </div>
                            <p className={styles.routeSub}>{helperText}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 3. เขตปริมณฑล/พื้นที่ข้างเคียง */}
              {nearbyAreas.length > 0 && (
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>
                    <i className="bi bi-pin-angle-fill text-secondary"></i> เขตปริมณฑล/พื้นที่ข้างเคียง
                  </h3>
                  <div className={styles.areaBadgeGrid}>
                    {nearbyAreas.map((nearby) => (
                      <span key={nearby} className={styles.areaBadge}>
                        {nearby}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column (40% on Desktop) */}
            <div className={styles.rightColumn}>
              {/* Map background decoration */}
              <div className={styles.mapDecoration}>
                <i className="bi bi-geo-alt-fill" style={{ fontSize: "16rem" }}></i>
              </div>

              <div className={styles.dispatchPanel}>
                <div>
                  <div className={styles.dispatchBadge}>
                    <i className="bi bi-patch-check-fill"></i> พร้อมรับงานวันนี้
                  </div>
                  
                  <div className={styles.dispatchHeader}>
                    <div className={styles.dispatchMetric}>30–60 นาที</div>
                    <p className={styles.dispatchLabel}>ประเมินราคาพร้อมเข้าหน้างานทันที</p>
                  </div>

                  <ul className={styles.trustList}>
                    <li className={styles.trustItem}>
                      <i className={`bi bi-check-circle-fill ${styles.trustIcon}`}></i>
                      <span>ประเมินราคาก่อนเริ่มงานชัดเจน</span>
                    </li>
                    <li className={styles.trustItem}>
                      <i className={`bi bi-check-circle-fill ${styles.trustIcon}`}></i>
                      <span>มีรถหลายขนาดให้เลือกตามความเหมาะสม</span>
                    </li>
                    <li className={styles.trustItem}>
                      <i className={`bi bi-check-circle-fill ${styles.trustIcon}`}></i>
                      <span>รับงานด่วนและงานจองล่วงหน้า 24 ชม.</span>
                    </li>
                    <li className={styles.trustItem}>
                      <i className={`bi bi-check-circle-fill ${styles.trustIcon}`}></i>
                      <span>ดูแลของขนย้ายด้วยทีมงานมืออาชีพ</span>
                    </li>
                  </ul>
                </div>

                <div className={styles.ctaContainer}>
                  <a 
                    href={siteConfig.lineUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.primaryBtn}
                  >
                    <i className="bi bi-line"></i> เช็คราคาด่วนในพื้นที่นี้
                  </a>
                  <a 
                    href={siteConfig.phoneHref} 
                    className={styles.secondaryBtn}
                  >
                    <i className="bi bi-telephone-fill"></i> โทรคุยเลย: {siteConfig.phone}
                  </a>
                  <span className={styles.phoneMeta}>
                    โทรด่วนสอบถามฟรี ตลอด 24 ชม. สายด่วน <a href={siteConfig.phoneHref} className={styles.phoneLink}>{siteConfig.phone}</a>
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
