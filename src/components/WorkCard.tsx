import React from "react";
import Image from "next/image";

interface WorkCardProps {
  image: string;
  alt: string;
  category: string;
  title: string;
  description: string;
  priority?: boolean;
}

export default function WorkCard({
  image,
  alt,
  category,
  title,
  description,
  priority = false,
}: WorkCardProps) {
  return (
    <div className="work-card h-100">
      <div className="work-img-wrapper">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="img-fluid"
          style={{ objectFit: "cover" }}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
      </div>
      <div className="work-content">
        <div className="work-category">{category}</div>
        <h3 className="work-title">{title}</h3>
        <p className="work-desc">{description}</p>
      </div>
    </div>
  );
}
