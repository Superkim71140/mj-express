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
      priceStart: "เริ่มต้น 300 - 500 บาท",
      details: "สำหรับลูกค้าที่มีคนช่วยยกของเอง หรือของน้อยชิ้น",
      recommendFor: "ย้ายหอพักขนาดเล็ก, ขนเครื่องใช้ไฟฟ้า, ขนมอเตอร์ไซค์"
    },
    {
      label: "รถกระบะตู้ทึบ + คนยกของ 1 คน",
      priceStart: "เริ่มต้น 700 - 900 บาท",
      details: "คนขับช่วยยกของประคองสินค้าอย่างระมัดระวัง",
      recommendFor: "ย้ายคอนโดสตูดิโอ, ขนเฟอร์นิเจอร์ชิ้นใหญ่ 1-2 ชิ้น"
    },
    {
      label: "รถกระบะตู้ทึบ + คนยกของ 2 คน",
      priceStart: "เริ่มต้น 1,000 - 1,200 บาท",
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
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.underline}></div>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        <div className={styles.tableResponsive}>
          <table className={styles.pricingTable}>
            <thead>
              <tr>
                <th>ประเภทบริการขนย้าย</th>
                <th className="text-center">ราคาประมาณการ</th>
                <th>คำแนะนำ/รายละเอียด</th>
              </tr>
            </thead>
            <tbody>
              {displayPrices.map((item, idx) => (
                <tr key={idx}>
                  <td className={styles.serviceNameCol}>
                    <div className={styles.serviceName}>{item.label}</div>
                    <div className={styles.serviceSub}>{item.recommendFor}</div>
                  </td>
                  <td className={styles.priceCol}>
                    <span className={styles.priceBadge}>{item.priceStart}</span>
                  </td>
                  <td className={styles.descCol}>{item.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.pricingNotes}>
          <div className={styles.notesHeader}>
            <i className="bi bi-info-circle-fill text-primary"></i>
            <span>หมายเหตุและปัจจัยการคำนวณราคา:</span>
          </div>
          {priceNotes ? (
            <p className={styles.notesText}>{priceNotes}</p>
          ) : (
            <ul className={styles.notesList}>
              <li>ราคาเริ่มต้นคิดตามระยะทางกิโลเมตรแรก และเพิ่มขึ้นตามระยะทางจริง (กิโลเมตรละประมาณ 10-15 บาท)</li>
              <li>กรณีมีจุดรับหรือส่งเพิ่ม (หลายจุด) จะมีค่าบริการจุดแวะเพิ่มจุดละ 100 - 200 บาท</li>
              <li>การขึ้นชั้นสูง (ชั้น 3 ขึ้นไปที่ไม่มีลิฟต์) หรือระยะเดินแบกห่างจากรถเกิน 50 เมตร อาจมีค่าล่วงเวลาคนยกเล็กน้อย</li>
              <li>เปิดบริการทุกวัน 24 ชม. ไม่มีบวกเพิ่มราคาช่วงกลางคืนหรือวันหยุดนักขัตฤกษ์ (กรุณาจองคิวล่วงหน้า)</li>
            </ul>
          )}
        </div>

        <div className={styles.quickCta}>
          <span>ต้องการราคาที่แน่นอนสำหรับงานของคุณใช่ไหม?</span>
          <a href={siteConfig.lineUrl} target="_blank" rel="noopener noreferrer" className={styles.ctaLink}>
            <i className="bi bi-chat-dots-fill"></i> ประเมินราคาผ่าน Line ฟรี
          </a>
        </div>
      </div>
    </section>
  );
}
