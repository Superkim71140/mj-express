import React from "react";
import { siteConfig } from "@/data/site";

export default function TopBar() {
  return (
    <div className="top-bar d-none d-md-block">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <i className="bi bi-clock-fill text-warning me-2"></i>
          <span>เปิดบริการทุกวัน ตลอด 24 ชั่วโมง</span>
        </div>
        <div className="d-flex align-items-center">
          <a href={siteConfig.phoneHref}>
            <i className="bi bi-telephone-fill me-2"></i> {siteConfig.phone}
          </a>
          <span className="top-bar-divider"></span>
          <a href={siteConfig.lineUrl} target="_blank" rel="noopener noreferrer">
            <i className="bi bi-line me-2"></i> LINE: {siteConfig.lineId}
          </a>
        </div>
      </div>
    </div>
  );
}
