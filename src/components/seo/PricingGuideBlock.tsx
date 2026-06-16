import React from "react";
import styles from "./PricingGuideBlock.module.css";
import { siteConfig } from "@/data/site";

export interface PriceEstimateItem {
  label: string;
  priceStart: string;
  details: string;
  recommendFor: string;
}

interface PricingGuideBlockProps {
  title?: string;
  subtitle?: string;
  customPrices?: PriceEstimateItem[];
  priceNotes?: string;
}

export default function PricingGuideBlock({
  title = "ตารางอัตราค่าบริการและราคาประมาณการ",
  subtitle = "ค่าบริการคิดจริงตามระยะทางและประเภทรถ ไม่บวกเพิ่ม ไม่มีค่าใช้จ่ายแอบแฝง",
  customPrices,
  priceNotes
}: PricingGuideBlockProps) {
  const defaultPrices: PriceEstimateItem[] = [
    {
      label: "รถกระบะตู้ทึบ (เฉพาะตัวรถ)",
      priceStart: "เริ่มต้น 1,000 บาท",
      details: "สำหรับลูกค้าที่มีคนช่วยยกของเอง หรือของน้อยชิ้น",
      recommendFor: "ย้ายหอพักขนาดเล็ก, ขนเครื่องใช้ไฟฟ้า, ขนมอเตอร์ไซค์"
    },
    {
      label: "รถกระบะตู้ทึบ + คนยกของ 1 คน",
      priceStart: "เริ่มต้น 1,500 บาท",
      details: "คนขับหรือทีมงาน 1 คนช่วยยกและประคองสินค้าอย่างระมัดระวัง",
      recommendFor: "ย้ายคอนโดสตูดิโอ, ขนเฟอร์นิเจอร์ชิ้นใหญ่ 1-2 ชิ้น"
    },
    {
      label: "รถกระบะตู้ทึบ + คนยกของ 2 คน",
      priceStart: "เริ่มต้น 2,000 บาท",
      details: "ทีมงานยกและจัดเรียงของในตู้ทึบเสร็จสรรพ ลูกค้าไม่ต้องเหนื่อย",
      recommendFor: "ย้ายบ้านเดี่ยว, ย้ายทาวน์โฮม, ขนสำนักงาน/ออฟฟิศ"
    },
    {
      label: "บริการส่งมอเตอร์ไซค์ทั่วไทย",
      priceStart: "เริ่มต้น 1,200 บาท (ตามระยะทาง)",
      details: "ขนส่งระบบปิดตู้ทึบ ผูกมัดแน่นหนาพิเศษ มารับถึงที่ส่งถึงหน้าบ้าน",
      recommendFor: "มอเตอร์ไซค์ทั่วไป, บิ๊กไบค์ (Big Bike), รถคลาสสิค"
    }
  ];

  const displayPrices = customPrices || defaultPrices;

  return (
    <section className={styles.pricingSection}>
      <div className="container" style={{ maxWidth: "900px" }}>
        <div className={styles.header}>
          <h2 className={`${styles.title} font-prompt`}>{title}</h2>
          <div className={styles.underline}></div>
          <p className={`${styles.subtitle} font-sarabun`}>{subtitle}</p>
        </div>

        <div className={styles.tableResponsive}>
          <table className={`table table-hover align-middle mb-0 ${styles.pricingTable}`}>
            <thead>
              <tr>
                <th className="font-prompt">ประเภทบริการขนย้าย</th>
                <th className="text-center font-prompt">ราคาประมาณการ</th>
                <th className="font-prompt">คำแนะนำ/รายละเอียด</th>
              </tr>
            </thead>
            <tbody>
              {displayPrices.map((item, idx) => (
                <tr key={idx}>
                  <td className={styles.serviceNameCol}>
                    <div className={`${styles.serviceName} font-prompt`}>{item.label}</div>
                    <div className={`${styles.serviceSub} font-sarabun`}>{item.recommendFor}</div>
                  </td>
                  <td className={`${styles.priceCol} text-center`}>
                    <span className={`badge rounded-pill bg-primary bg-opacity-10 text-primary px-4 py-2 border-0 fw-bold font-prompt ${styles.priceBadge}`}>
                      {item.priceStart}
                    </span>
                  </td>
                  <td className={`${styles.descCol} font-sarabun`}>{item.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.pricingNotes}>
          <div className={styles.notesHeader}>
            <i className="bi bi-info-circle-fill text-primary"></i>
            <span className="font-prompt">หมายเหตุและปัจจัยการคำนวณราคา:</span>
          </div>
          {priceNotes ? (
            <p className={`${styles.notesText} font-sarabun`}>{priceNotes}</p>
          ) : (
            <p className={`${styles.notesText} font-sarabun`}>
              อัตราค่าบริการเริ่มต้นที่ 1,000 บาท และประเมินราคารวมคนยกตามความเหมาะสมของปริมาณของและสถานที่หน้างานจริง ไม่มีบวกราคาแอบแฝง
            </p>
          )}
        </div>

        <div className={styles.quickCta}>
          <span className="font-prompt">ต้องการราคาที่แน่นอนสำหรับงานของคุณใช่ไหม?</span>
          <a href={siteConfig.lineUrl} target="_blank" rel="noopener noreferrer" className={`${styles.ctaLink} font-prompt`}>
            <i className="bi bi-chat-dots-fill"></i> ประเมินราคาผ่าน Line ฟรี
          </a>
        </div>
      </div>
    </section>
  );
}
