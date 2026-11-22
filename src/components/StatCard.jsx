import React from 'react';

/**
 * Reusable StatCard component for displaying key task statistics (Step 6)
 * Accepts:
 * - title: string (e.g. "Total tasks", "In progress", "Completed", "Completion rate")
 * - value: number | string (e.g. 12, 5, 7, "58%")
 * - subtitle: string (e.g. "Across all projects")
 * - icon: Icon component (from lucide-react)
 * - theme: string ("purple" | "cyan" | "green" | "indigo")
 * - progress: number (optional percentage 0-100 for visual progress bar)
 */
export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  theme = "purple",
  progress
}) {
  return (
    <div
      className={`stat-card stat-card--${theme}`}
      role="region"
      aria-label={`${title}: ${value}`}
    >
      <div className="stat-card__top">
        <div className={`stat-card__icon-box stat-card__icon-box--${theme}`}>
          <Icon size={18} aria-hidden="true" />
        </div>
        <span className="stat-card__title">{title}</span>
      </div>

      <div className="stat-card__value-box">
        <span className="stat-card__number">{value}</span>
      </div>

      {typeof progress === 'number' && (
        <div className="stat-card__progress-container" aria-hidden="true">
          <div className="stat-card__progress-bar">
            <div
              className={`stat-card__progress-fill stat-card__progress-fill--${theme}`}
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        </div>
      )}

      {subtitle && <p className="stat-card__subtitle">{subtitle}</p>}
    </div>
  );
}
