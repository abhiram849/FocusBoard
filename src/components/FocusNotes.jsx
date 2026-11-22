import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Lightbulb, Target, Award } from 'lucide-react';

/**
 * Mandatory 3-slide Focus Notes Carousel
 * Frame 1: 15:2 - Plan your day
 * Frame 2: 15:30 - Stay in the flow
 * Frame 3: 15:58 - Reflect and celebrate
 */
const FOCUS_SLIDES = [
  {
    id: 1,
    slideNumber: "FOCUS NOTES · 1 OF 3",
    tag: "Daily Planning",
    tagIcon: Target,
    title: "Plan your day",
    description: "Organise your priorities and focus on what matters most. Break complex projects into manageable daily tasks.",
    tip: "Pro Tip: Tackle your highest-priority item before noon to set a productive tone for the rest of your workday.",
    gradientClass: "slide-theme--indigo"
  },
  {
    id: 2,
    slideNumber: "FOCUS NOTES · 2 OF 3",
    tag: "Deep Focus",
    tagIcon: Lightbulb,
    title: "Stay in the flow",
    description: "Batch similar tasks together and eliminate distractions to maintain peak productivity and deep concentration.",
    tip: "Pro Tip: Run focused 25-minute Pomodoro sprints for tasks currently marked In Progress.",
    gradientClass: "slide-theme--amber"
  },
  {
    id: 3,
    slideNumber: "FOCUS NOTES · 3 OF 3",
    tag: "Review & Growth",
    tagIcon: Award,
    title: "Reflect and celebrate",
    description: "Review your completed tasks daily to track measurable progress, identify roadblocks, and calibrate upcoming deadlines.",
    tip: "Pro Tip: Take a 5-minute retrospective at the end of each afternoon to celebrate finished tasks and prep tomorrow's queue.",
    gradientClass: "slide-theme--emerald"
  }
];

export function FocusNotes() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalSlides = FOCUS_SLIDES.length;
  const currentSlide = FOCUS_SLIDES[currentIndex];
  const TagIcon = currentSlide.tagIcon;

  // Circular navigation
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const handleSelectSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="focus-notes-section" aria-label="Focus Notes Carousel">
      <div className={`focus-notes-carousel ${currentSlide.gradientClass}`}>
        <div className="focus-notes__decor-circle" aria-hidden="true" />
        
        {/* Carousel Header / Controls */}
        <div className="focus-notes__top-bar">
          <div className="focus-notes__meta">
            <span className="focus-notes__tag">
              <TagIcon size={14} className="focus-notes__tag-icon" aria-hidden="true" />
              {currentSlide.tag}
            </span>
            <span className="focus-notes__slide-count">
              {currentSlide.slideNumber}
            </span>
          </div>

          <div className="focus-notes__controls">
            <button
              type="button"
              className="focus-notes__btn focus-notes__btn--prev"
              onClick={handlePrev}
              aria-label="Previous slide"
              title="Previous slide"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="focus-notes__btn focus-notes__btn--next"
              onClick={handleNext}
              aria-label="Next slide"
              title="Next slide"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Active Slide Body */}
        <div className="focus-notes__content">
          <div className="focus-notes__text-group">
            <h3 className="focus-notes__title">{currentSlide.title}</h3>
            <p className="focus-notes__desc">{currentSlide.description}</p>
          </div>

          <div className="focus-notes__tip-box">
            <Sparkles size={16} className="focus-notes__tip-icon" aria-hidden="true" />
            <span className="focus-notes__tip-text">{currentSlide.tip}</span>
          </div>
        </div>

        {/* Navigation Indicators */}
        <div className="focus-notes__indicators" role="tablist" aria-label="Slide Indicators">
          {FOCUS_SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={currentIndex === index}
              aria-label={`Go to slide ${index + 1}: ${slide.title}`}
              className={`focus-notes__dot ${currentIndex === index ? 'focus-notes__dot--active' : ''}`}
              onClick={() => handleSelectSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
