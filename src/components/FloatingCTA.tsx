"use client";

import React, { useState } from "react";
import { siteConfig } from "@/data/site";

export default function FloatingCTA() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="floating-container">
      <button
        className={`float-toggle ${showMenu ? "active" : ""}`}
        onClick={toggleMenu}
        id="mainToggle"
        aria-label="ติดต่อเราช่องทางด่วน"
        aria-expanded={showMenu}
      >
        <i className={`bi ${showMenu ? "bi-x-lg" : "bi-arrows-angle-expand"}`}></i>
      </button>

      <div className={`float-menu ${showMenu ? "show" : ""}`} id="floatMenu">
        <a
          href={siteConfig.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="float-item btn-msg-app"
          title="ติดต่อทาง Messenger"
        >
          <i className="bi bi-messenger"></i>
        </a>
        <a
          href={siteConfig.phoneHref}
          className="float-item btn-phone-app"
          title="โทรติดต่อด่วน"
        >
          <i className="bi bi-telephone-fill"></i>
        </a>
        <a
          href={siteConfig.lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="float-item btn-line-app"
          title="แอดไลน์สอบถาม"
        >
          <i className="bi bi-line"></i>
        </a>
      </div>
    </div>
  );
}
