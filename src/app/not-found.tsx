import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center px-3" style={{ minHeight: "75vh", backgroundColor: "var(--light-bg)" }}>
      <div className="p-5 rounded-4 shadow bg-white border" style={{ maxWidth: "550px" }}>
        <div className="mb-4 text-warning">
          <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: "5rem" }}></i>
        </div>
        <h1 className="fw-bold text-secondary mb-3" style={{ fontFamily: "var(--font-prompt)", fontSize: "2.2rem" }}>
          404 - ไม่พบหน้าเว็บที่คุณต้องการ
        </h1>
        <p className="text-muted mb-4" style={{ fontFamily: "var(--font-sarabun)", fontSize: "1.05rem", lineHeight: "1.7" }}>
          ขออภัยด้วยครับ หน้าเว็บที่คุณกำลังพยายามเข้าถึงอาจถูกลบ ย้ายชื่อ หรือไม่มีอยู่ตั้งแต่แรก 
          คุณสามารถเลือกกลับสู่หน้าแรกเพื่อค้นหาบริการ หรือติดต่อเราเพื่อสอบถามข้อมูลได้ทันทีครับ
        </p>
        <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
          <Link href="/" className="btn btn-primary btn-shine rounded-pill px-4 py-2.5 fw-bold text-white text-decoration-none">
            <i className="bi bi-house-door-fill me-2"></i> กลับสู่หน้าแรก
          </Link>
          <Link href="/contact" className="btn btn-outline-secondary rounded-pill px-4 py-2.5 fw-bold text-decoration-none">
            <i className="bi bi-telephone-fill me-2"></i> ติดต่อเจ้าหน้าที่
          </Link>
        </div>
      </div>
    </div>
  );
}
