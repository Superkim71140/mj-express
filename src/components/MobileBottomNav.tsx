"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/site";

export default function MobileBottomNav() {
  const pathname = usePathname() || "/";

  // Check if we are on the motorcycle transport page to display the Facebook item
  const isMotorcyclePage = pathname === "/motorcycle-transport";

  return (
    <div className="mobile-bottom-nav d-md-none">
      <Link href="/" className={`mobile-nav-item ${pathname === "/" ? "active" : ""}`}>
        <i className="bi bi-house-door-fill"></i>
        <span>หน้าแรก</span>
      </Link>

      <a href={siteConfig.phoneHref} className="mobile-nav-item highlight-call">
        <i className="bi bi-telephone-fill"></i>
        <span>โทรเลย</span>
      </a>

      <a href={siteConfig.lineUrl} target="_blank" rel="noopener noreferrer" className="mobile-nav-item highlight-line">
        <i className="bi bi-line"></i>
        <span>แอดไลน์</span>
      </a>

      {isMotorcyclePage ? (
        <a
          href={siteConfig.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-nav-item"
        >
          <i className="bi bi-facebook"></i>
          <span>แฟนเพจ</span>
        </a>
      ) : (
        <Link
          href="/contact"
          className={`mobile-nav-item ${pathname === "/contact" ? "active" : ""}`}
        >
          <i className="bi bi-info-circle"></i>
          <span>ติดต่อ</span>
        </Link>
      )}
    </div>
  );
}
