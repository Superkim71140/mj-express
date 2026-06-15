"use client";

import React, { useState } from "react";
import styles from "./FaqBlock.module.css";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqBlockProps {
  id: string;
  items: FaqItem[];
  title?: string;
  subtitle?: string;
}

export default function FaqBlock({ id, items, title, subtitle }: FaqBlockProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const renderAnswer = (text: string) => {
    return text.split("**").map((part, idx) => {
      if (idx % 2 === 1) {
        return (
          <strong key={idx}>
            {part.split("*").map((subPart, subIdx) => {
              if (subIdx % 2 === 1) {
                return <em key={subIdx}>{subPart}</em>;
              }
              return subPart;
            })}
          </strong>
        );
      }
      return (
        <React.Fragment key={idx}>
          {part.split("*").map((subPart, subIdx) => {
            if (subIdx % 2 === 1) {
              return <em key={subIdx}>{subPart}</em>;
            }
            return subPart;
          })}
        </React.Fragment>
      );
    });
  };

  return (
    <section className={styles.faqSection} id={id}>
      <div className="container" style={{ maxWidth: "800px" }}>
        {(title || subtitle) && (
          <div className={styles.header}>
            {title && <h2 className={styles.title}>{title}</h2>}
            <div className={styles.underline}></div>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        )}

        <div className={styles.accordion}>
          {items.map((item, index) => {
            const isExpanded = activeIndex === index;
            return (
              <div
                className={`${styles.item} ${isExpanded ? styles.itemExpanded : ""}`}
                key={index}
              >
                <button
                  className={styles.trigger}
                  type="button"
                  aria-expanded={isExpanded}
                  onClick={() => toggleItem(index)}
                >
                  <span className={styles.triggerContent}>
                    <i className={`bi bi-question-circle-fill ${styles.icon}`}></i>
                    <span className={styles.questionText}>{item.question}</span>
                  </span>
                  <span className={styles.chevronWrapper}>
                    <i className={`bi bi-chevron-down ${styles.chevron}`}></i>
                  </span>
                </button>
                <div
                  className={styles.contentWrapper}
                  style={{
                    maxHeight: isExpanded ? "500px" : "0px",
                    opacity: isExpanded ? 1 : 0,
                  }}
                >
                  <div className={styles.contentBody}>
                    <p className={styles.answerText}>{renderAnswer(item.answer)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
