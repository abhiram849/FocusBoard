import React from 'react';

/**
 * Reusable StatCard component for displaying key task statistics
 */
export function StatCard({ title, value, subtitle, icon: Icon, badge, colorTheme = "indigo", progress }) {
  return (
    <div className={`stat-card stat-card--${colorTheme}`} role="region" aria-label={title}>
      <div className="stat-card__header">
        <span className="stat-card__title">{title}</span>
        <div className={`stat-card__icon-wrap stat-card__icon-wrap--${colorTheme}`}>
          <Icon className="stat-card__icon" size={20} aria-hidden="true" />
        </div>
      </div>

      <div className="stat-card__body">
        <div className="stat-card__value-row">
          <span className="stat-card__value">{value}</span>
          {badge && (
            <span className={`stat-card__badge stat-card__badge--${colorTheme}`}>
              {badge}
            </span>
          )}
        </div>

        {typeof progress === 'number' && (
          <div className="stat-card__progress-bar-bg" aria-hidden="true">
            <div
              className={`stat-card__progress-bar-fill stat-card__progress-bar-fill--${colorTheme}`}
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        )}

        {subtitle && <p className="stat-card__subtitle">{subtitle}</p>}
      </div>
    </div>
  );
}
