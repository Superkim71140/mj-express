"use client";

import React, { useState } from "react";
import { siteConfig } from "@/data/site";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    // Map id to state keys
    const fieldMap: Record<string, string> = {
      callbackName: "name",
      callbackPhone: "phone",
      callbackService: "service",
    };
    setFormData((prev) => ({
      ...prev,
      [fieldMap[id]]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.service) {
      console.log("Form request:", formData);
      setIsSubmitted(true);
    }
  };
  if (isSubmitted) {
    return (
      <div className="text-center py-4 animate__fadeIn" style={{ animationDuration: "0.5s" }}>
        <div
          className="mb-4 d-inline-flex align-items-center justify-content-center"
          style={{
            width: "75px",
            height: "75px",
            background: "rgba(25, 135, 84, 0.1)",
            color: "#198754",
            borderRadius: "50%",
          }}
        >
          <i className="bi bi-check-lg fs-1"></i>
        </div>
        <h4 className="fw-bold mb-3 text-success">ส่งข้อมูลติดต่อกลับสำเร็จ!</h4>
        <p className="text-muted mb-4 small" style={{ lineHeight: "1.7", fontSize: "0.95rem" }}>
          เจ้าหน้าที่ MJ-TH Express ได้รับข้อความของท่านแล้ว
          <br />
          เราจะโทรติดต่อกลับไปที่เบอร์ <strong className="text-dark">{formData.phone}</strong> ภายใน 5-10 นาที
        </p>

        <div className="d-flex flex-column gap-2 max-width-300 mx-auto">
          <a
            href={siteConfig.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-success rounded-pill px-4 py-2 text-white fw-bold d-inline-flex align-items-center justify-content-center"
          >
            <i className="bi bi-line me-2"></i> แชทแจ้งงานทาง LINE ทันที
          </a>
          <button
            className="btn btn-outline-secondary rounded-pill px-4 py-2 btn-sm mt-2"
            onClick={() => {
              setIsSubmitted(false);
              setFormData({ name: "", phone: "", service: "" });
            }}
            style={{ fontWeight: 500 }}
          >
            <i className="bi bi-arrow-clockwise me-1"></i> ส่งแบบฟอร์มอีกครั้ง
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="formContainer" style={{ transition: "opacity 0.2s ease" }}>
      <h3 className="fw-bold mb-2 text-primary" style={{ fontSize: "1.4rem" }}>
        <i className="bi bi-telephone-outbound-fill me-2"></i> ฟอร์มให้เราติดต่อกลับ
      </h3>
      <p className="text-muted small mb-4">
        กรอกรายละเอียดด่วนเพื่อให้เจ้าหน้าที่ติดต่อกลับและประเมินราคาฟรีทันที
      </p>
      <form id="callbackForm" className="mb-2" onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="callbackName"
            placeholder="ชื่อ-นามสกุล"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="callbackName">
            <i className="bi bi-person-fill me-1 text-primary"></i> ชื่อ-นามสกุล
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="tel"
            className="form-control"
            id="callbackPhone"
            placeholder="เบอร์โทรศัพท์"
            value={formData.phone}
            onChange={handleInputChange}
            required
            pattern="[0-9]{9,10}"
          />
          <label htmlFor="callbackPhone">
            <i className="bi bi-telephone-fill me-1 text-primary"></i> เบอร์โทรศัพท์
          </label>
        </div>
        <div className="form-floating mb-4">
          <select
            className="form-select"
            id="callbackService"
            value={formData.service}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              เลือกประเภทบริการ
            </option>
            <option value="ขนส่งมอเตอร์ไซค์">🏍️ ขนส่งมอเตอร์ไซค์</option>
            <option value="ย้ายบ้าน/หอพัก">🏠 ย้ายบ้าน / ย้ายหอพัก</option>
            <option value="ขนของทั่วไป">📦 ขนของทั่วไป / รถรับจ้าง</option>
          </select>
          <label htmlFor="callbackService">
            <i className="bi bi-truck me-1 text-primary"></i> ประเภทบริการ
          </label>
        </div>
        <button type="submit" className="btn btn-premium-submit w-100 btn-glow btn-shine">
          ส่งข้อมูลติดต่อกลับ <i className="bi bi-arrow-right-short ms-1 fs-5"></i>
        </button>
      </form>
    </div>
  );
}
