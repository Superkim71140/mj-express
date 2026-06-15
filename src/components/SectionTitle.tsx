import React from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="section-title mb-5">
      <h2>{title}</h2>
      <div className="title-underline"></div>
      {subtitle && <p className="text-muted fs-5">{subtitle}</p>}
    </div>
  );
}
