"use client";

import React, { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  id: string;
  items: FaqItem[];
}

export default function FAQAccordion({ id, items }: FAQAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="accordion custom-accordion" id={id}>
      {items.map((item, index) => {
        const isExpanded = activeIndex === index;
        const headingId = `${id}-heading-${index}`;
        const collapseId = `${id}-collapse-${index}`;

        return (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header" id={headingId}>
              <button
                className={`accordion-button ${isExpanded ? "" : "collapsed"}`}
                type="button"
                aria-expanded={isExpanded}
                aria-controls={collapseId}
                onClick={() => toggleItem(index)}
              >
                <i className="bi bi-question-circle-fill faq-icon-q"></i>
                {item.question}
              </button>
            </h2>
            <div
              id={collapseId}
              className={`accordion-collapse collapse ${isExpanded ? "show" : ""}`}
              aria-labelledby={headingId}
              style={{
                display: isExpanded ? "block" : "none",
              }}
            >
              <div className="accordion-body">
                {/* Parse basic markdown style bold/italic blocks in answer */}
                {item.answer.split("**").map((part, idx) => {
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
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
