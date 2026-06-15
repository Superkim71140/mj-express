"use client";

// Header component with hash active state logic
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { areaDropdownLinks, headerNavLinks } from "@/data/navigation";
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
    const handleHashChange = () => {
      if (typeof window !== "undefined") {
        setCurrentHash(window.location.hash);
      }
    };

    // Use a short timeout to prevent synchronous cascading renders (ESLint fix)
    const timeoutId = setTimeout(() => {
      handleHashChange();
    }, 10);

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      clearTimeout(timeoutId);
    };
  }, [pathname]);

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
              {headerNavLinks.map((link) => {
                const isActive = pathname === link.path && (!currentHash || currentHash === "");
                const isHashActive = pathname === "/" && link.path.startsWith("/#") && currentHash === link.path.substring(1);
                
                return (
                  <li className="nav-item" key={link.path}>
                    <Link
                      href={link.path}
                      className={`nav-link ${isActive || isHashActive ? "active" : ""}`}
                      onClick={() => {
                        if (link.path.startsWith("/#")) {
                          setCurrentHash(link.path.substring(1));
                        } else {
                          setCurrentHash("");
                        }
                        closeMenu();
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}

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
            {headerNavLinks.map((link) => {
              const isActive = pathname === link.path && (!currentHash || currentHash === "");
              const isHashActive = pathname === "/" && link.path.startsWith("/#") && currentHash === link.path.substring(1);
              
              return (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className={`drawer-link ${isActive || isHashActive ? "active" : ""}`}
                    onClick={() => {
                      if (link.path.startsWith("/#")) {
                        setCurrentHash(link.path.substring(1));
                      } else {
                        setCurrentHash("");
                      }
                      closeMenu();
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}

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
