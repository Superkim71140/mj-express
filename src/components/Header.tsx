"use client";

// Header component with hash active state logic
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { areaDropdownLinks } from "@/data/navigation";
import { siteConfig } from "@/data/site";

export default function Header() {
  const pathname = usePathname() || "/";
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState("");

  const toggleNavbar = () => setIsOpen(!isOpen);
  const closeMenu = () => {
    setIsOpen(false);
    setDropdownOpen(false);
  };

  // Hash tracking for active states of in-page anchors
  useEffect(() => {
    // Set initial hash
    setCurrentHash(window.location.hash);

    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);

    // Periodically poll to capture Next.js routing transitions that don't trigger hashchange
    const interval = setInterval(() => {
      if (typeof window !== "undefined" && window.location.hash !== currentHash) {
        setCurrentHash(window.location.hash);
      }
    }, 150);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      clearInterval(interval);
    };
  }, [pathname, currentHash]);

  const isAreaActive = pathname.startsWith("/areas");

  return (
    <>
      <nav className="site-header sticky-top">
        <div className="container header-container">
          {/* Logo */}
          <Link 
            href="/" 
            className="brand-link" 
            onClick={() => {
              setCurrentHash("");
              closeMenu();
            }}
          >
            <Image
              src="/assets/brand/logo_m_j1.webp"
              alt="MJ-TH EXPRESS Logo"
              width={180}
              height={55}
              className="brand-logo"
              priority
            />
          </Link>

          {/* Desktop Navigation Links (>=1200px) */}
          <div className="desktop-nav">
            <ul className="nav-menu">
              <li className="nav-item">
                <Link
                  href="/"
                  className={`nav-link ${pathname === "/" && (!currentHash || currentHash === "") ? "active" : ""}`}
                  onClick={() => {
                    setCurrentHash("");
                    closeMenu();
                  }}
                >
                  หน้าแรก
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/motorcycle-transport"
                  className={`nav-link ${pathname === "/motorcycle-transport" ? "active" : ""}`}
                  onClick={() => {
                    setCurrentHash("");
                    closeMenu();
                  }}
                >
                  ส่งมอเตอร์ไซค์
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/#price"
                  className={`nav-link ${pathname === "/" && currentHash === "#price" ? "active" : ""}`}
                  onClick={() => {
                    setCurrentHash("#price");
                    closeMenu();
                  }}
                >
                  ราคา
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/portfolio"
                  className={`nav-link ${pathname === "/portfolio" ? "active" : ""}`}
                  onClick={() => {
                    setCurrentHash("");
                    closeMenu();
                  }}
                >
                  ผลงาน
                </Link>
              </li>

              {/* Dropdown for Service Areas */}
              <li
                className={`nav-item dropdown ${dropdownOpen ? "show" : ""}`}
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <span
                  className={`nav-link dropdown-toggle ${isAreaActive ? "active" : ""}`}
                  style={{ cursor: "pointer" }}
                >
                  พื้นที่ให้บริการ
                </span>
                <ul className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
                  {areaDropdownLinks.map((item) => {
                    const isActiveArea = pathname === item.path;
                    return (
                      <li key={item.path}>
                        <Link
                          className={`dropdown-item ${isActiveArea ? "active" : ""}`}
                          href={item.path}
                          onClick={() => {
                            setCurrentHash("");
                            closeMenu();
                          }}
                        >
                          {item.iconClass && <i className={item.iconClass}></i>}
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>

            <Link 
              href="/contact" 
              className="btn btn-nav-contact nav-cta"
              onClick={() => {
                setCurrentHash("");
                closeMenu();
              }}
            >
              <i className="bi bi-chat-text-fill me-2"></i> ติดต่อเรา
            </Link>
          </div>

          {/* Mobile Menu Button (<1200px) */}
          <button
            className="mobile-menu-button"
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobileDrawer"
            aria-label="เปิดเมนูนำทาง"
            onClick={toggleNavbar}
          >
            <i className={`bi ${isOpen ? "bi-x-lg" : "bi-list"} fs-1`}></i>
          </button>
        </div>
      </nav>

      {/* Backdrop overlay */}
      {isOpen && <div className="mobile-drawer-backdrop" onClick={closeMenu}></div>}

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${isOpen ? "open" : ""}`} id="mobileDrawer">
        <div className="drawer-header">
          <Link 
            href="/" 
            className="brand-link" 
            onClick={() => {
              setCurrentHash("");
              closeMenu();
            }}
          >
            <Image
              src="/assets/brand/logo_m_j1.webp"
              alt="MJ-TH EXPRESS Logo"
              width={150}
              height={46}
              className="brand-logo"
            />
          </Link>
          <button className="btn-close-drawer" onClick={closeMenu} aria-label="ปิดเมนู">
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="drawer-body">
          <ul className="drawer-nav">
            <li>
              <Link
                href="/"
                className={`drawer-link ${pathname === "/" && (!currentHash || currentHash === "") ? "active" : ""}`}
                onClick={() => {
                  setCurrentHash("");
                  closeMenu();
                }}
              >
                หน้าแรก
              </Link>
            </li>
            <li>
              <Link
                href="/motorcycle-transport"
                className={`drawer-link ${pathname === "/motorcycle-transport" ? "active" : ""}`}
                onClick={() => {
                  setCurrentHash("");
                  closeMenu();
                }}
              >
                ส่งมอเตอร์ไซค์
              </Link>
            </li>
            <li>
              <Link
                href="/#price"
                className={`drawer-link ${pathname === "/" && currentHash === "#price" ? "active" : ""}`}
                onClick={() => {
                  setCurrentHash("#price");
                  closeMenu();
                }}
              >
                ราคา
              </Link>
            </li>
            <li>
              <Link
                href="/portfolio"
                className={`drawer-link ${pathname === "/portfolio" ? "active" : ""}`}
                onClick={() => {
                  setCurrentHash("");
                  closeMenu();
                }}
              >
                ผลงาน
              </Link>
            </li>

            {/* Service Areas inside Drawer */}
            <li className="drawer-section">
              <span className="drawer-section-title">พื้นที่ให้บริการ</span>
              <ul className="drawer-submenu">
                {areaDropdownLinks.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className={`drawer-sublink ${pathname === item.path ? "active" : ""}`}
                      onClick={() => {
                        setCurrentHash("");
                        closeMenu();
                      }}
                    >
                      {item.iconClass && <i className={item.iconClass}></i>}
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>

          <div className="drawer-cta-section">
            <a href={siteConfig.phoneHref} className="btn drawer-cta-btn btn-phone-cta w-100 btn-danger text-white">
              <i className="bi bi-telephone-fill me-2"></i> โทรเลย {siteConfig.phone}
            </a>
            <a
              href={siteConfig.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn drawer-cta-btn btn-line-cta w-100 mt-2 text-white"
            >
              <i className="bi bi-line me-2"></i> LINE: {siteConfig.lineId}
            </a>
            <Link
              href="/contact"
              className="btn drawer-cta-btn btn-nav-contact w-100 mt-2 justify-content-center"
              onClick={() => {
                setCurrentHash("");
                closeMenu();
              }}
            >
              <i className="bi bi-chat-text-fill me-2"></i> ติดต่อเรา
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
