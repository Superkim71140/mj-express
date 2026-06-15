"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Banner {
  src: string;
  alt: string;
}

const banners: Banner[] = [
  {
    src: "/Mjexpress.webp",
    alt: "MJ-TH Express Banner 1"
  },
  {
    src: "/Mjexpress1.webp",
    alt: "MJ-TH Express Banner 2"
  }
];

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % banners.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <div id="heroCarousel" className="carousel slide carousel-fade hero-desktop-wrapper mx-auto">
      {/* Carousel Indicators */}
      <div className="carousel-indicators">
        {banners.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={idx === activeIndex ? "active" : ""}
            onClick={() => setActiveIndex(idx)}
            aria-label={`Slide ${idx + 1}`}
          ></button>
        ))}
      </div>

      {/* Carousel Items */}
      <div className="carousel-inner">
        {banners.map((banner, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={idx}
              className={`carousel-item ${isActive ? "active" : ""}`}
              style={{ display: isActive ? "block" : "none" }}
            >
              <div className="position-relative w-100" style={{ aspectRatio: "2400/900" }}>
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  fill
                  priority={idx === 0}
                  className="d-block w-100 h-auto img-fluid hero-desktop-img"
                  sizes="100vw"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Carousel Controls */}
      <button className="carousel-control-prev d-none d-md-flex" type="button" onClick={handlePrev}>
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next d-none d-md-flex" type="button" onClick={handleNext}>
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
