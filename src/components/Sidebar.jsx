import React from 'react';
import { LayoutGrid, ListTodo, Calendar, Settings, X } from 'lucide-react';

/**
 * FocusBoard 6-dot Logo Icon matching Figma
 */
export function FocusBoardLogoIcon() {
  return (
    <div className="fb-logo-icon" aria-hidden="true">
      <span className="fb-dot" />
      <span className="fb-dot" />
      <span className="fb-dot" />
      <span className="fb-dot" />
      <span className="fb-dot" />
      <span className="fb-dot" />
    </div>
  );
}

/**
 * Sidebar Navigation matching Figma desktop & mobile drawer
 */
export function Sidebar({ isOpen, onClose, activeNav = 'overview', onNavChange }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'tasks', label: 'My tasks', icon: ListTodo },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <>
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`} aria-label="Main Navigation">
        {/* Logo and Brand */}
        <div className="sidebar__brand">
          <div className="sidebar__logo-wrap">
            <FocusBoardLogoIcon />
            <span className="sidebar__brand-name">FocusBoard</span>
          </div>

          <button
            type="button"
            className="sidebar__close-mobile-btn"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Navigation Section */}
        <div className="sidebar__nav-container">
          <span className="sidebar__section-title">WORKSPACE</span>
          <nav className="sidebar__nav">
            <ul className="sidebar__nav-list">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.id;
                return (
                  <li key={item.id} className="sidebar__nav-item">
                    <button
                      type="button"
                      className={`sidebar__nav-link ${isActive ? 'sidebar__nav-link--active' : ''}`}
                      onClick={() => {
                        if (onNavChange) onNavChange(item.id);
                        if (window.innerWidth < 1024) onClose();
                      }}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <Icon size={18} className="sidebar__nav-icon" aria-hidden="true" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
