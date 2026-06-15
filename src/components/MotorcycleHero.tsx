import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import styles from "./MotorcycleHero.module.css";

export default function MotorcycleHero() {
  return (
    <section className={styles.heroSection}>
      {/* Background Glow Effects */}
      <div className={styles.heroGlow}></div>
      <div className={styles.heroGlowRight}></div>

      <div className="container position-relative z-1 py-5">
        {/* Breadcrumbs */}
        <div className="page-breadcrumb mb-4 d-flex justify-content-center justify-content-lg-start align-items-center gap-2" style={{ fontSize: "0.95rem" }}>
          <Link href="/" className="text-white-50 text-decoration-none">หน้าแรก</Link>
          <span className="text-white-50">/</span>
          <span className="text-warning fw-semibold">ส่งมอเตอร์ไซค์</span>
        </div>

        <div className="row align-items-center gy-5">
          {/* Left Side: Copy & CTA */}
          <div className="col-lg-6 text-center text-lg-start">
            <div className={`${styles.glassBadge} mb-4`}>
              <i className="bi bi-geo-alt-fill"></i>
              <span className="font-prompt">บริการส่งมอเตอร์ไซค์ทั่วไทย 24 ชั่วโมง</span>
            </div>

            <h1 className="display-4 fw-bold mb-4 lh-base" style={{ fontFamily: "var(--font-prompt)", wordBreak: "keep-all" }}>
              รับส่งมอเตอร์ไซค์ถึงหน้าบ้าน <span className={styles.textGradientGold}>ส่งบิ๊กไบค์</span> รถเล็ก ข้ามจังหวัด <span className={styles.textGradientGold}>ปลอดภัย</span>
            </h1>

            <p className="lead text-white-50 mb-5 mx-auto mx-lg-0" style={{ maxWidth: "600px", fontSize: "1.1rem", lineHeight: "1.8" }}>
              {siteConfig.businessName} ให้บริการขนส่งมอเตอร์ไซค์และ BigBike รับรถถึงจุดนัดหมาย ห่อหุ้มกันรอย 3 ชั้น รัดแน่น ปลอดภัย ด้วยรถกระบะตู้ทึบหลังคาสูงกันฝน 100% พร้อมประเมินราคาฟรี
            </p>

            {/* CTA Buttons */}
            <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start gap-3">
              <a href={siteConfig.phoneHref} className={`btn btn-lg rounded-pill px-4 py-3 fw-bold d-flex align-items-center justify-content-center gap-2 ${styles.btnPremiumCall}`}>
                <i className="bi bi-telephone-fill"></i> โทรด่วน: {siteConfig.phone}
              </a>
              <a href={siteConfig.lineUrl} target="_blank" rel="noopener noreferrer" className={`btn btn-lg rounded-pill px-4 py-3 fw-bold d-flex align-items-center justify-content-center gap-2 ${styles.btnPremiumLine}`}>
                <i className="bi bi-line fs-5"></i> ประเมินราคาผ่าน LINE
              </a>
            </div>
            
            <div className="mt-4 pt-3 border-top border-secondary d-none d-lg-block opacity-75">
               <Link href="/portfolio" className="text-white-50 text-decoration-none d-inline-flex align-items-center gap-2">
                 <i className="bi bi-images text-warning"></i> ดูภาพผลงานการจัดส่งมอเตอร์ไซค์จริง
               </Link>
            </div>
          </div>

          {/* Right Side: Showcase Image & Glassmorphism Badges */}
          <div className="col-lg-6 position-relative mt-5 mt-lg-0">
            <div className="d-none d-lg-block">
                {/* Desktop Floating Badges */}
                <div className={`${styles.glassCard} ${styles.floating}`} style={{ top: "-12%", left: "-2%" }}>
                  <div className={`${styles.iconCircle} ${styles.green}`}><i className="bi bi-house-door-fill"></i></div>
                  <div>
                    <div className="fw-bold fs-6">รับถึงหน้าบ้าน</div>
                    <div className="small text-white-50">Door-to-Door Service</div>
                  </div>
                </div>

                <div className={`${styles.glassCard} ${styles.floatingDelay1}`} style={{ top: "15%", right: "-8%" }}>
                  <div className={`${styles.iconCircle} ${styles.yellow}`}><i className="bi bi-box-seam-fill"></i></div>
                  <div>
                    <div className="fw-bold fs-6">ห่อกันรอย 3 ชั้น</div>
                    <div className="small text-white-50">ป้องกันรอยขีดข่วน 100%</div>
                  </div>
                </div>

                <div className={`${styles.glassCard} ${styles.floatingDelay2}`} style={{ bottom: "-12%", left: "15%" }}>
                  <div className={`${styles.iconCircle} ${styles.red}`}><i className="bi bi-shield-fill-check"></i></div>
                  <div>
                    <div className="fw-bold fs-6">มีประกันสินค้า</div>
                    <div className="small text-white-50">มั่นใจตลอดการเดินทาง</div>
                  </div>
                </div>
            </div>

            <div className={styles.imageWrapper}>
              <div className={styles.innerImage}>
                <Image
                  src="/assets/images/Mjexpress1.png"
                  alt="ส่งมอเตอร์ไซค์ BigBike"
                  fill
                  quality={100}
                  priority={true}
                  unoptimized={true}
                  sizes="(max-width: 992px) 100vw, 500px"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
            
            {/* Mobile Feature List (Shows below image on mobile) */}
            <div className="d-lg-none mt-4 row g-3">
                <div className="col-12 col-sm-6">
                    <div className={styles.glassCard}>
                        <div className={`${styles.iconCircle} ${styles.green}`}><i className="bi bi-house-door-fill"></i></div>
                        <div>
                            <div className="fw-bold fs-6">รับถึงหน้าบ้าน</div>
                            <div className="small text-white-50">Door-to-Door Service</div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-6">
                    <div className={styles.glassCard}>
                        <div className={`${styles.iconCircle} ${styles.yellow}`}><i className="bi bi-box-seam-fill"></i></div>
                        <div>
                            <div className="fw-bold fs-6">ห่อกันรอย 3 ชั้น</div>
                            <div className="small text-white-50">ป้องกันรอยขีดข่วน</div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-6">
                    <div className={styles.glassCard}>
                        <div className={`${styles.iconCircle} ${styles.red}`}><i className="bi bi-shield-fill-check"></i></div>
                        <div>
                            <div className="fw-bold fs-6">มีประกันสินค้า</div>
                            <div className="small text-white-50">มั่นใจทุกเส้นทาง</div>
                        </div>
                    </div>
                </div>
                 <div className="col-12 col-sm-6">
                    <div className={styles.glassCard}>
                        <div className={`${styles.iconCircle} ${styles.blue}`}><i className="bi bi-truck"></i></div>
                        <div>
                            <div className="fw-bold fs-6">ส่งข้ามจังหวัด</div>
                            <div className="small text-white-50">ทั่วประเทศไทย</div>
                        </div>
                    </div>
                </div>
            </div>

          </div>
        </div>
      </div>

      {/* Service Snapshot Strip */}
      <div className={styles.snapshotStrip}>
        <div className="container">
          <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 gap-md-5">
            <div className={styles.snapshotItem}><i className="bi bi-check2-circle text-warning"></i> รถเล็ก</div>
            <div className={styles.snapshotItem}><i className="bi bi-check2-circle text-warning"></i> BigBike</div>
            <div className={styles.snapshotItem}><i className="bi bi-check2-circle text-warning"></i> รับ-ส่งหน้าบ้าน</div>
            <div className={styles.snapshotItem}><i className="bi bi-check2-circle text-warning"></i> ข้ามจังหวัด</div>
            <div className={styles.snapshotItem}><i className="bi bi-check2-circle text-warning"></i> เหมาคัน</div>
            <div className={styles.snapshotItem}><i className="bi bi-check2-circle text-warning"></i> ประเมินราคาฟรี</div>
          </div>
        </div>
      </div>
    </section>
  );
}
