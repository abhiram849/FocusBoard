import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

/**
 * 3-slide Focus Notes carousel matching Figma Frame 15:2, 15:30, 15:58
 */
const FOCUS_SLIDES = [
  {
    id: 1,
    tag: "FOCUS NOTES",
    counter: "01 / 03",
    title: "Make today count.",
    subtitle: "A little focus goes a long way.",
    mobileDesc: "4 tasks waiting for your attention.",
    card: {
      statusLabel: "NEXT UP",
      title: "Design landing page",
      percent: 62
    }
  },
  {
    id: 2,
    tag: "FOCUS NOTES",
    counter: "02 / 03",
    title: "Small steps, big progress.",
    subtitle: "Keep your priorities in view.",
    mobileDesc: "3 high priority items in progress.",
    card: {
      statusLabel: "IN PROGRESS",
      title: "Fix mobile navigation",
      percent: 81
    }
  },
  {
    id: 3,
    tag: "FOCUS NOTES",
    counter: "03 / 03",
    title: "Celebrate the wins.",
    subtitle: "Every completed task moves you forward.",
    mobileDesc: "7 tasks completed this week.",
    card: {
      statusLabel: "COMPLETED",
      title: "Review onboarding copy",
      percent: 100
    }
  }
];

export function FocusNotes() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = FOCUS_SLIDES.length;
  const current = FOCUS_SLIDES[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  return (
    <section className="focus-notes-banner" aria-label="Focus Notes">
      <div className="focus-notes-card">
        {/* Left text block */}
        <div className="focus-notes-left">
          <div className="focus-notes-meta">
            <span className="focus-notes-tag">{current.tag}</span>
            <span className="focus-notes-counter">{current.counter}</span>
          </div>

          <h2 className="focus-notes-title">{current.title}</h2>
          <p className="focus-notes-subtitle desktop-only">{current.subtitle}</p>
          <p className="focus-notes-subtitle mobile-only">{current.mobileDesc}</p>

          {/* Indicator Horizontal Bars */}
          <div className="focus-notes-bars" role="tablist" aria-label="Slide indicators">
            {FOCUS_SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={currentIndex === idx}
                aria-label={`Slide ${idx + 1}`}
                className={`focus-bar ${currentIndex === idx ? 'focus-bar--active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>

          {/* Mobile inline progress bar */}
          <div className="mobile-banner-progress mobile-only">
            <div className="mobile-banner-progress-fill" style={{ width: `${current.card.percent}%` }} />
            <span className="mobile-banner-progress-text">{current.card.percent}%</span>
          </div>
        </div>

        {/* Right floating tilt-card + nav buttons (Desktop/Tablet) */}
        <div className="focus-notes-right">
          <div className="focus-floating-card">
            <div className="floating-card-header">
              <div className="floating-check-icon">
                <Check size={12} strokeWidth={3} aria-hidden="true" />
              </div>
              <div className="floating-card-info">
                <span className="floating-card-tag">{current.card.statusLabel}</span>
                <span className="floating-card-title">{current.card.title}</span>
              </div>
            </div>

            <div className="floating-progress-container">
              <div className="floating-progress-bar">
                <div
                  className="floating-progress-fill"
                  style={{ width: `${current.card.percent}%` }}
                />
              </div>
              <span className="floating-percent">{current.card.percent}%</span>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="focus-nav-buttons">
            <button
              type="button"
              className="focus-arrow-btn focus-arrow-btn--prev"
              onClick={handlePrev}
              aria-label="Previous slide"
              title="Previous slide"
            >
              <ChevronLeft size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="focus-arrow-btn focus-arrow-btn--next"
              onClick={handleNext}
              aria-label="Next slide"
              title="Next slide"
            >
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
