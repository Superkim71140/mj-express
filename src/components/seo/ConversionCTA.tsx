import React from "react";
import { siteConfig } from "@/data/site";
import styles from "./ConversionCTA.module.css";

interface ConversionCTAProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function ConversionCTA({ title, subtitle, className = "" }: ConversionCTAProps) {
  return (
    <div className={`${styles.ctaContainer} ${className}`}>
      {title && <h3 className={styles.ctaTitle}>{title}</h3>}
      {subtitle && <p className={styles.ctaSubtitle}>{subtitle}</p>}
      
      <div className={styles.buttonGroup}>
        <a href={siteConfig.phoneHref} className={`${styles.ctaButton} ${styles.phoneBtn}`}>
          <i className="bi bi-telephone-fill"></i>
          <span className={styles.btnText}>
            <span className={styles.btnLabel}>โทรจองคิว / ปรึกษาฟรี</span>
            <span className={styles.btnValue}>{siteConfig.phone}</span>
          </span>
        </a>
        
        <a 
          href={siteConfig.lineUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`${styles.ctaButton} ${styles.lineBtn}`}
        >
          <i className="bi bi-line"></i>
          <span className={styles.btnText}>
            <span className={styles.btnLabel}>เช็คราคาทาง LINE</span>
            <span className={styles.btnValue}>ID: @{siteConfig.lineId}</span>
          </span>
        </a>
      </div>

      <div className={styles.metaInfo}>
        <span className={styles.metaItem}>
          <i className="bi bi-clock-history"></i> บริการด่วนตลอด 24 ชั่วโมง
        </span>
        <span className={styles.metaDivider}>•</span>
        <span className={styles.metaItem}>
          <i className="bi bi-check-circle-fill text-success"></i> ประเมินราคาฟรีไม่มีข้อผูกมัด
        </span>
      </div>
    </div>
  );
}
