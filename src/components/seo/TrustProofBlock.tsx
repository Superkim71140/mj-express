import React from "react";
import styles from "./TrustProofBlock.module.css";

interface TrustProofBlockProps {
  title?: string;
  subtitle?: string;
}

export default function TrustProofBlock({ title, subtitle }: TrustProofBlockProps) {
  const proofs = [
    {
      icon: "bi-shield-fill-check",
      title: "ตู้ทึบกันฝน 100%",
      desc: "รถกระบะหลังคาสูงตู้ทึบ ป้องกันฝน ลม แดด ฝุ่นละออง และสิ่งของร่วงหล่นตลอดการเดินทางอย่างปลอดภัย",
      colorClass: styles.iconRed
    },
    {
      icon: "bi-tag-fill",
      title: "ราคาโปร่งใส ไม่มีบวกเพิ่ม",
      desc: "ประเมินราคาตามจริงจากระยะทางและของที่ขนย้าย ไม่มีค่าใช้จ่ายแอบแฝงหรือตุกติกหน้างานชัวร์",
      colorClass: styles.iconYellow
    },
    {
      icon: "bi-people-fill",
      title: "ทีมงานยกของมืออาชีพ",
      desc: "มีคนยกของสุภาพ แข็งแรง ผ่านการอบรมการแพ็คและยกย้ายของชิ้นใหญ่ ป้องกันริ้วรอยบนเฟอร์นิเจอร์",
      colorClass: styles.iconBlue
    },
    {
      icon: "bi-clock-fill",
      title: "ตรงเวลา บริการ 24 ชม.",
      desc: "รักษาเวลา นัดหมายตรงคิว พร้อมดูแลลูกค้าตลอด 24 ชั่วโมง ทั้งงานด่วน งานกลางวัน หรือย้ายรอบดึก",
      colorClass: styles.iconGreen
    }
  ];

  return (
    <section className={styles.trustSection}>
      <div className="container" style={{ maxWidth: "1200px" }}>
        {(title || subtitle) && (
          <div className={styles.header}>
            {title && <h2 className={styles.title}>{title}</h2>}
            <div className={styles.underline}></div>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        )}

        <div className={styles.grid}>
          {proofs.map((proof, idx) => (
            <div className={styles.card} key={idx}>
              <div className={`${styles.iconWrapper} ${proof.colorClass}`}>
                <i className={`bi ${proof.icon}`}></i>
              </div>
              <h3 className={styles.cardTitle}>{proof.title}</h3>
              <p className={styles.cardDesc}>{proof.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
