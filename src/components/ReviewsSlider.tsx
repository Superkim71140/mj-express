"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Review {
  name: string;
  location: string;
  image: string;
  rating: number;
  text: string;
}

const reviewsData: Review[] = [
  {
    name: "คุณ Kamolwan Pongnil",
    location: "ลูกค้าทาง Facebook",
    image: "/assets/images/รีวิว ผู้ชายจริง 1.webp",
    rating: 5,
    text: '"รถมอไซค์จากปทุมธานี กลับชุมพร ไม่ถึง 24 ชั่วโมง รถถึงแล้ว ประทับใจมากก มากกว่าการประทับใจคือบริการดีมากๆ ค่ะ เจ้าหน้าที่ทุกคนพูดจาดีสุดๆ ชอบบบบ อยากให้ทุกคนมาใช้บริการกันเยอะๆ ค้าบ ดีจริง!!!"'
  },
  {
    name: "คุณ Mim Mim",
    location: "ลูกค้าทาง Facebook",
    image: "/assets/images/รีวิว ผู้ชายจริง 2.webp",
    rating: 5,
    text: '"บริการดีประทับใจมาก ราคาถูกบริการดีมีที่นี่ พนักงานพูดจาเพราะ ตอบแชทไวมาก 💖"'
  },
  {
    name: "คุณ ซุปเปอร์ คิม'",
    location: "ลูกค้าทาง Facebook",
    image: "/assets/images/รีวืวผู้ใช้งานจริง.webp",
    rating: 5,
    text: '"เพจนี้ทีมงานสุภาพ ส่งของให้จริง เราใช้บริการส่งมอไซค์กลับต่างจังหวัด ปลายทางได้รับของจริงค่า แนะนำทักคุยที่เพจนี้ก่อนเลย ⭐⭐⭐⭐⭐"'
  }
];

export default function ReviewsSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviewsData.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviewsData.length) % reviewsData.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviewsData.length);
  };

  return (
    <div id="reviewCarousel" className="carousel slide">
      <div className="carousel-inner pb-4">
        {reviewsData.map((review, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={idx}
              className={`carousel-item ${isActive ? "active" : ""}`}
              style={{ display: isActive ? "block" : "none" }}
            >
              <div className="review-card text-center">
                <i className="bi bi-quote quote-icon-bg"></i>
                <div className="d-flex justify-content-center">
                  <Image
                    src={review.image}
                    alt={review.name}
                    width={90}
                    height={90}
                    className="review-img"
                    style={{ objectFit: "cover" }}
                    loading="lazy"
                  />
                </div>

                <div className="stars">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <i key={i} className="bi bi-star-fill"></i>
                  ))}
                </div>

                <p className="review-text">{review.text}</p>

                <h5 className="review-name">{review.name}</h5>
                <span className="review-location">{review.location}</span>
              </div>
            </div>
          );
        })}
      </div>

      <button className="carousel-control-prev" type="button" onClick={handlePrev} aria-label="รีวิวก่อนหน้า">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" onClick={handleNext} aria-label="รีวิวกัดไป">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
