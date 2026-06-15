"use client";

import React, { useState } from "react";
import { portfolioItems } from "@/data/portfolio";
import WorkCard from "@/components/WorkCard";

export default function PortfolioGallery() {
  const [activeFilter, setActiveFilter] = useState<"all" | "motorcycle" | "heavy" | "moving">("all");

  const filterButtons = [
    { label: "ดูทั้งหมด", value: "all", icon: null },
    { label: "ส่งมอเตอร์ไซค์", value: "motorcycle", icon: "bi bi-motorcycle" },
    { label: "ขนย้ายของหนัก", value: "heavy", icon: "bi bi-boxes" },
    { label: "ย้ายบ้าน/หอพัก", value: "moving", icon: "bi bi-house-door-fill" },
  ] as const;

  const filteredItems = portfolioItems.filter(
    (item) => activeFilter === "all" || item.category === activeFilter
  );

  return (
    <div className="container pb-5">
      {/* Category Filter Button Group */}
      <div className="row mb-5">
        <div className="col-12 text-center">
          <div className="filter-btn-group d-flex flex-wrap justify-content-center gap-2">
            {filterButtons.map((btn) => (
              <button
                key={btn.value}
                className={`btn filter-btn ${activeFilter === btn.value ? "active" : ""}`}
                onClick={() => setActiveFilter(btn.value)}
              >
                {btn.icon && <i className={`${btn.icon} me-1`}></i>}
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio Items Grid */}
      <div className="row g-4">
        {filteredItems.map((item) => (
          <div
            key={`${activeFilter}-${item.id}`} // Change key to trigger remount & CSS fade animation on filter
            className="col-md-6 col-lg-4 portfolio-item animate-fade-in"
          >
            <WorkCard
              image={item.image}
              alt={item.alt}
              category={item.categoryLabel}
              title={item.title}
              description={item.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
