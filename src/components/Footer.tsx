import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="row gy-4">
          {/* Column 1: Brand & Socials */}
          <div className="col-lg-3 col-md-12">
            <h3 className="footer-brand fw-bold mb-3">{siteConfig.businessName}</h3>
            <p className="footer-desc opacity-75 pe-lg-4" style={{ fontSize: "0.95rem" }}>
              ผู้ให้บริการรถรับจ้างขนของทั่วไป ขนย้ายบ้าน คอนโด สำนักงาน 
              และบริการขนส่งรถมอเตอร์ไซค์ไปต่างจังหวัดทั่วไทย ดูแลด้วยมืออาชีพ ปลอดภัย 100%
            </p>
            <div className="social-links d-flex gap-2 mt-4">
              <a
                href={siteConfig.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-circle"
                title="Facebook"
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href={siteConfig.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-circle"
                title="LINE"
              >
                <i className="bi bi-line"></i>
              </a>
            </div>
          </div>

          {/* Column 2: Services Quick Links */}
          <div className="col-lg-2 col-md-4 col-6">
            <h5 className="footer-title fw-bold mb-4">บริการของเรา</h5>
            <ul className="footer-links list-unstyled d-flex flex-column gap-2" style={{ fontSize: "0.95rem" }}>
              <li>
                <Link href="/services/moving-house">รถรับจ้างย้ายบ้าน</Link>
              </li>
              <li>
                <Link href="/services/condo-moving">รถรับจ้างย้ายคอนโด</Link>
              </li>
              <li>
                <Link href="/services/dorm-moving">รถรับจ้างย้ายหอพัก</Link>
              </li>
              <li>
                <Link href="/motorcycle-transport">ส่งมอเตอร์ไซค์ทั่วไป</Link>
              </li>
              <li>
                <Link href="/services/motorcycle-transport">ส่งบิ๊กไบค์ข้ามจังหวัด</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Routes Quick Links */}
          <div className="col-lg-2 col-md-4 col-6">
            <h5 className="footer-title fw-bold mb-4">เส้นทางยอดนิยม</h5>
            <ul className="footer-links list-unstyled d-flex flex-column gap-2" style={{ fontSize: "0.95rem" }}>
              <li>
                <Link href="/routes/bangkok-to-chiang-mai">กรุงเทพฯ ⇄ เชียงใหม่</Link>
              </li>
              <li>
                <Link href="/routes/bangkok-to-phuket">กรุงเทพฯ ⇄ ภูเก็ต</Link>
              </li>
              <li>
                <Link href="/routes/bangkok-to-khon-kaen">กรุงเทพฯ ⇄ ขอนแก่น</Link>
              </li>
              <li>
                <Link href="/case-studies">ผลงานย้ายจริง</Link>
              </li>
              <li>
                <Link href="/reviews">รีวิวจากลูกค้า</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Area Quick Links */}
          <div className="col-lg-2 col-md-4 col-6">
            <h5 className="footer-title fw-bold mb-4">พื้นที่ให้บริการ</h5>
            <ul className="footer-links list-unstyled d-flex flex-column gap-2" style={{ fontSize: "0.95rem" }}>
              <li>
                <Link href="/areas/bang-khae">บางแค / เพชรเกษม</Link>
              </li>
              <li>
                <Link href="/areas/nong-khaem">หนองแขม / พุทธมณฑล</Link>
              </li>
              <li>
                <Link href="/areas/rama-2">พระราม 2 / บางบอน</Link>
              </li>
              <li>
                <Link href="/areas/phra-nakhon">ฝั่งพระนคร</Link>
              </li>
              <li>
                <Link href="/areas/samut-sakhon">สมุทรสาคร</Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact Info */}
          <div className="col-lg-3 col-md-4 col-12">
            <h5 className="footer-title fw-bold mb-4">ติดต่อสอบถาม</h5>
            <ul className="footer-contact-list list-unstyled d-flex flex-column gap-3" style={{ fontSize: "0.95rem" }}>
              <li className="d-flex align-items-center gap-3">
                <div className="contact-icon-circle">
                  <i className="bi bi-telephone-fill"></i>
                </div>
                <a href={siteConfig.phoneHref} className="text-decoration-none text-white">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="d-flex align-items-center gap-3">
                <div className="contact-icon-circle">
                  <i className="bi bi-line"></i>
                </div>
                <a
                  href={siteConfig.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-white"
                >
                  LINE ID: {siteConfig.lineId}
                </a>
              </li>
              <li className="d-flex align-items-start gap-3">
                <div className="contact-icon-circle mt-1">
                  <i className="bi bi-geo-alt-fill"></i>
                </div>
                <span className="opacity-85">
                  {siteConfig.address.streetAddress} {siteConfig.address.addressLocality}{" "}
                  {siteConfig.address.addressRegion} {siteConfig.address.postalCode}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="footer-divider my-4" />

        <div className="footer-bottom d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 text-center text-md-start">
          <div className="copyright small opacity-50">
            © {new Date().getFullYear()} {siteConfig.businessName} เอ็มเจ-ทีเอช เอ็กซ์เพรส. All Rights Reserved.
          </div>
          <div className="developer small opacity-50">
            Developed by{" "}
            <a
              href="https://kimx-wed.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="developer-link"
            >
              kimx-wed
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
