import React from "react";
import Link from "next/link";
import styles from "./Breadcrumbs.module.css";

export interface BreadcrumbItem {
  name: string;
  item: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="breadcrumb" className={styles.breadcrumbsNav}>
      <ol className={styles.breadcrumbsList}>
        <li className={styles.breadcrumbItem}>
          <Link href="/" className={styles.breadcrumbLink}>
            <i className="bi bi-house-door-fill me-1"></i> หน้าแรก
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li
              key={index}
              className={`${styles.breadcrumbItem} ${isLast ? styles.active : ""}`}
              aria-current={isLast ? "page" : undefined}
            >
              <span className={styles.separator}>/</span>
              {isLast ? (
                <span className={styles.currentName}>{item.name}</span>
              ) : (
                <Link href={item.item} className={styles.breadcrumbLink}>
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
