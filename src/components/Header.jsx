import React from 'react';
import { ChevronDown, Menu } from 'lucide-react';
import { FocusBoardLogoIcon } from './Sidebar';

/**
 * Top Header matching Figma
 * Desktop (1440px): Breadcrumb "Workspace / Overview" + User Avatar "JD"
 * Mobile (390px): Logo + Brand "FocusBoard" + User Avatar "JD"
 */
export function Header({ onMenuClick }) {
  return (
    <header className="dashboard-header" role="banner">
      <div className="dashboard-header__left">
        {/* Mobile Hamburger menu toggle */}
        <button
          type="button"
          className="dashboard-header__menu-btn"
          onClick={onMenuClick}
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} aria-hidden="true" />
        </button>

        {/* Mobile Logo Brand */}
        <div className="dashboard-header__mobile-brand">
          <FocusBoardLogoIcon />
          <span className="dashboard-header__mobile-brand-name">FocusBoard</span>
        </div>

        {/* Desktop Breadcrumb */}
        <nav className="desktop-breadcrumb" aria-label="Breadcrumbs">
          <span className="breadcrumb__item breadcrumb__item--muted">Workspace</span>
          <span className="breadcrumb__separator">/</span>
          <span className="breadcrumb__item breadcrumb__item--active">Overview</span>
        </nav>
      </div>

      <div className="dashboard-header__right">
        {/* User Avatar Circle "JD" */}
        <div className="user-avatar-btn" role="button" tabIndex={0} aria-label="User profile JD">
          <div className="avatar-circle">
            <span>JD</span>
          </div>
          <ChevronDown size={14} className="avatar-chevron" aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}
