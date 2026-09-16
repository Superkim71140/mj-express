import React from "react";
import Image from "next/image";
import { siteConfig } from "@/lib/seo/site-config";

interface ServiceShowcaseBannerProps {
  areaName?: string;
  className?: string;
}

export default function ServiceShowcaseBanner({
  areaName = "บางแค ฝั่งธนบุรี",
  className = "",
}: ServiceShowcaseBannerProps) {
  return (
    <section className={`mj-service-showcase ${className}`.trim()} aria-label="บริการขนย้ายและขนส่งสินค้า">
      <div className="mj-service-showcase__wrap">
        {/* Worker large on the left, sitting directly against and overlapping the panel */}
        <div className="mj-service-showcase__worker">
          <Image
            src="/assets/images/mjpag.png"
            alt={`ทีมงาน MJ-TH Express ถือกล่องพัสดุ พร้อมบริการรถรับจ้างขนของ ${areaName} และทั่วไทย`}
            width={1086}
            height={1448}
            priority
            className="mj-service-showcase__worker-img"
          />
        </div>

        {/* Clean dark-navy rounded content panel on the right */}
        <div className="mj-service-showcase__panel">
          <h2 className="mj-service-showcase__title" style={{ fontFamily: "var(--font-prompt)" }}>
            สัมผัสบริการขนย้ายที่เหนือกว่า ดูแลทุกชิ้นถึงปลายทาง
          </h2>

          <ul className="mj-service-showcase__checklist">
            <li className="mj-service-showcase__item">
              <span className="mj-service-showcase__icon">
                <i className="bi bi-check-circle-fill"></i>
              </span>
              <span className="mj-service-showcase__text">
                รถกระบะ 4 ล้อตู้ทึบหลังคาสูง กันแดด กันฝน ปลอดภัย 100%
              </span>
            </li>
            <li className="mj-service-showcase__item">
              <span className="mj-service-showcase__icon">
                <i className="bi bi-check-circle-fill"></i>
              </span>
              <span className="mj-service-showcase__text">
                ทีมงานมืออาชีพพร้อมยกของ ดูแลสินค้าทุกชิ้นอย่างระมัดระวัง
              </span>
            </li>
            <li className="mj-service-showcase__item">
              <span className="mj-service-showcase__icon">
                <i className="bi bi-check-circle-fill"></i>
              </span>
              <span className="mj-service-showcase__text">
                พิกัดหลัก {areaName} และพื้นที่ใกล้เคียง บริการวิ่งทั่วไทย 24 ชม.
              </span>
            </li>
            <li className="mj-service-showcase__item">
              <span className="mj-service-showcase__icon">
                <i className="bi bi-check-circle-fill"></i>
              </span>
              <span className="mj-service-showcase__text">
                ประเมินราคาฟรีตามจริง แจ้งราคาก่อนเริ่มงาน ไม่มีบวกเพิ่ม
              </span>
            </li>
          </ul>

          <div className="mj-service-showcase__actions">
            <a
              href={siteConfig.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mj-service-showcase__btn-primary"
              style={{ fontFamily: "var(--font-prompt)" }}
            >
              <i className="bi bi-line text-xl"></i>
              <span>ขอประเมินราคาฟรี</span>
            </a>
            <a
              href={siteConfig.phoneHref}
              className="mj-service-showcase__btn-secondary"
              style={{ fontFamily: "var(--font-prompt)" }}
            >
              <i className="bi bi-telephone-fill"></i>
              <span>โทรเลย {siteConfig.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
