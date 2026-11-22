import React from 'react';

/**
 * Overview Stat Card matching Figma design
 */
export function StatCard({ title, value, subtitle, icon: Icon, theme = "purple" }) {
  return (
    <div className={`stat-card stat-card--${theme}`} role="region" aria-label={title}>
      <div className="stat-card__top">
        <div className={`stat-card__icon-box stat-card__icon-box--${theme}`}>
          <Icon size={18} aria-hidden="true" />
        </div>
        <span className="stat-card__title">{title}</span>
      </div>

      <div className="stat-card__value-box">
        <span className="stat-card__number">{value}</span>
      </div>

      <p className="stat-card__subtitle">{subtitle}</p>
    </div>
  );
}
