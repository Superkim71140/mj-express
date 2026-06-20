import React from "react";
import Link from "next/link";
import { localAreas } from "@/data/areas";
import { servicesData } from "@/data/services";
import { routesData } from "@/data/routes";
import { siteConfig } from "@/data/site";
import styles from "./SeoLinkHub.module.css";

interface SeoLinkHubProps {
  excludeSlug?: string;
}

export default function SeoLinkHub({ excludeSlug }: SeoLinkHubProps) {
  // Filter active records to avoid self-linking
  const otherAreas = localAreas.filter((area) => area.slug !== excludeSlug);
  const otherServices = servicesData.filter((service) => service.slug !== excludeSlug);
  const otherRoutes = routesData.filter((route) => route.slug !== excludeSlug);

  // SEO Internal Linking Graph Injection for Salaya
  if (excludeSlug === "salaya") {
    const priorityAreas = ["phutthamonthon", "borommaratchachonnani"];
    otherAreas.sort((a, b) => {
      const aPriority = priorityAreas.includes(a.slug) ? 1 : 0;
      const bPriority = priorityAreas.includes(b.slug) ? 1 : 0;
      return bPriority - aPriority; // higher priority goes first
    });
  }

  return (
    <section className={styles.relatedServicesSection}>
      <div className="container" style={{ maxWidth: "1200px" }}>
        
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.headerIconBadge}>
            <i className="bi bi-link-45deg"></i>
          </div>
          <h2 className={styles.headerTitle}>
            บริการรับงานและพื้นที่รับย้ายอื่น ๆ ของเรา
          </h2>
          <div className={styles.underline}></div>
          <p className={styles.headerDesc}>
            รวมบริการรถรับจ้าง ย้ายบ้าน ย้ายคอนโด ส่งมอเตอร์ไซค์ และเส้นทางยอดนิยม เพื่อให้ลูกค้าเลือกบริการที่ตรงกับงานได้เร็วขึ้น
          </p>
        </div>

        {/* 4-Column Bento Grid */}
        <div className={styles.relatedServicesGrid}>
          
          {/* Card 1: บริการยอดนิยม */}
          <div className={styles.relatedServiceCard}>
            <div className={styles.cardHeader}>
              <div className={`${styles.relatedServiceIcon} ${styles.iconBlue}`}>
                <i className="bi bi-box-seam-fill"></i>
              </div>
              <h3 className={styles.cardTitle}>บริการยอดนิยม</h3>
            </div>
            <p className={styles.cardIntro}>ขนส่งด่วน ย้ายของมีคนช่วยยก</p>
            
            <div className={styles.relatedServiceList}>
              {/* Static motorcycle transport link */}
              {excludeSlug !== "motorcycle-transport" && (
                <Link href="/motorcycle-transport" className={styles.linkItem}>
                  <span className={styles.linkTitle}>
                    <i className="bi bi-motorcycle text-primary"></i> ส่งมอเตอร์ไซค์ทั่วไทย
                  </span>
                  <span className={styles.linkDesc}>ขนส่งบิ๊กไบค์ รถเล็ก รับ-ส่งถึงหน้าบ้านปลอดภัย</span>
                </Link>
              )}

              {/* Dynamic services */}
              {otherServices.map((service) => (
                <Link href={`/services/${service.slug}`} className={styles.linkItem} key={service.slug}>
                  <span className={styles.linkTitle}>
                    <i className="bi bi-truck text-primary"></i> {service.serviceName}
                  </span>
                  <span className={styles.linkDesc}>{service.suitableFor.slice(0, 2).join(", ")} พร้อมคนยกของ</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Card 2: เส้นทางยอดนิยม */}
          <div className={styles.relatedServiceCard}>
            <div className={styles.cardHeader}>
              <div className={`${styles.relatedServiceIcon} ${styles.iconGreen}`}>
                <i className="bi bi-compass-fill"></i>
              </div>
              <h3 className={styles.cardTitle}>เส้นทางยอดนิยม</h3>
            </div>
            <p className={styles.cardIntro}>เส้นทางวิ่งตรงด่วนแบบเหมาคัน</p>

            <div className={styles.relatedServiceList}>
              {otherRoutes.map((route) => (
                <Link href={`/routes/${route.slug}`} className={styles.linkItem} key={route.slug}>
                  <span className={styles.linkTitle}>
                    <i className="bi bi-signpost-split text-success"></i> {route.origin} <i className="bi bi-arrow-right-short text-muted"></i> {route.destination}
                  </span>
                  <span className={styles.linkDesc}>{route.distanceEstimate.split("ใช้เวลา")[0]} วิ่งตรงด่วนเหมาคัน</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Card 3: พื้นที่ให้บริการ */}
          <div className={styles.relatedServiceCard}>
            <div className={styles.cardHeader}>
              <div className={`${styles.relatedServiceIcon} ${styles.iconYellow}`}>
                <i className="bi bi-geo-alt-fill"></i>
              </div>
              <h3 className={styles.cardTitle}>พื้นที่ให้บริการ</h3>
            </div>
            <p className={styles.cardIntro}>เรียกรถกระบะรับจ้างเข้ารับของด่วนได้</p>
            
            <div className={styles.areaLinkGroup}>
              {otherAreas.map((area) => {
                const displayLabel = area.label || area.badgeText.replace("พื้นที่ ", "");
                return (
                  <Link href={`/areas/${area.slug}`} className={styles.areaLinkBtn} key={area.slug}>
                    <i className={`bi bi-geo-alt ${styles.areaIcon}`}></i> รถรับจ้าง{displayLabel}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Card 4: ติดต่อและรีวิว */}
          <div className={styles.relatedServiceCard}>
            <div className={styles.cardHeader}>
              <div className={`${styles.relatedServiceIcon} ${styles.iconRed}`}>
                <i className="bi bi-telephone-fill"></i>
              </div>
              <h3 className={styles.cardTitle}>ติดต่อและรีวิว</h3>
            </div>
            <p className={styles.cardIntro}>ช่องทางคุยตรงทีมงานและดูผลงาน</p>

            <div className={styles.relatedServiceList}>
              <Link href="/portfolio" className={styles.linkItem}>
                <span className={styles.linkTitle}>
                  <i className="bi bi-images text-danger"></i> รีวิวภาพถ่ายหน้างานจริง
                </span>
                <span className={styles.linkDesc}>การันตีคุณภาพย้ายบ้าน ย้ายคอนโด ส่งรถมอไซค์</span>
              </Link>

              <Link href="/contact" className={styles.linkItem}>
                <span className={styles.linkTitle}>
                  <i className="bi bi-headset text-danger"></i> ขอใบเสนอราคาขนส่งฟรี
                </span>
                <span className={styles.linkDesc}>ประเมินราคาตามจุดรับส่งแผนที่ ไม่มีบวกเพิ่ม</span>
              </Link>

              <div className={styles.callActionGroup}>
                <a href={siteConfig.phoneHref} className={styles.btnRedCall}>
                  <i className="bi bi-phone-vibrate-fill"></i> โทรคุยเลย: {siteConfig.phone}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom CTA Banner */}
        <div className={styles.relatedCtaBanner}>
          <div className={styles.bannerDecor}>
            <i className="bi bi-geo-alt-fill"></i>
          </div>
          
          <div className={styles.bannerContent}>
            <h4 className={styles.bannerTitle}>ไม่แน่ใจว่าพื้นที่ของคุณอยู่ในโซนบริการไหม?</h4>
            <p className={styles.bannerText}>
              ส่งต้นทาง–ปลายทางให้ทีมงานเช็คราคาและรถที่เหมาะกับงานได้ทันที
            </p>
          </div>

          <div className={styles.bannerButtons}>
            <a 
              href={siteConfig.lineUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.bannerLineBtn}
            >
              <i className="bi bi-line"></i> เช็คพื้นที่ผ่าน LINE
            </a>
            <a 
              href={siteConfig.phoneHref} 
              className={styles.bannerPhoneBtn}
            >
              <i className="bi bi-telephone-fill"></i> โทร {siteConfig.phone}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
