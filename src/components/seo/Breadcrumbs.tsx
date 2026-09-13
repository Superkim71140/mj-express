import React from "react";
import Link from "next/link";
import styles from "./Breadcrumbs.module.css";
import type { BreadcrumbItem } from "@/lib/seo/breadcrumbs";

export type { BreadcrumbItem };

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  // Normalize: ensure "หน้าแรก" is first if not already present
  const firstHref = items[0]?.href || items[0]?.item;
  const normalizedItems = (firstHref === "/" || items[0]?.name === "หน้าแรก")
    ? items
    : [{ name: "หน้าแรก", href: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className={`${styles.breadcrumbsNav} ${className || ""}`.trim()}>
      <ol className={styles.breadcrumbsList}>
        {normalizedItems.map((item, index) => {
          const isLast = index === normalizedItems.length - 1;
          const isHome = index === 0;
          const href = item.href || item.item || "/";

          return (
            <li
              key={href}
              className={`${styles.breadcrumbItem} ${isLast ? styles.active : ""}`}
              aria-current={isLast ? "page" : undefined}
            >
              {index > 0 && (
                <span className={styles.separator} aria-hidden="true">/</span>
              )}
              {isLast ? (
                <span className={styles.currentName}>{item.name}</span>
              ) : (
                <Link href={href} className={styles.breadcrumbLink}>
                  {isHome ? (
                    <>
                      <i className="bi bi-house-door-fill me-1" aria-hidden="true"></i>
                      <span>{item.name}</span>
                    </>
                  ) : (
                    <span>{item.name}</span>
                  )}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
