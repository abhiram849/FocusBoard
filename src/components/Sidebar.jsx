import React from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  Sparkles,
  BarChart3,
  Settings,
  FolderKanban,
  X,
  Zap
} from 'lucide-react';

/**
 * Sidebar navigation component with mobile drawer support
 */
export function Sidebar({ isOpen, onClose, activeNav = 'dashboard', onNavChange }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'tasks', label: 'My Tasks', icon: CheckSquare, badge: null },
    { id: 'focus-notes', label: 'Focus Notes', icon: Sparkles, badge: '3' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: null },
    { id: 'settings', label: 'Settings', icon: Settings, badge: null }
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}
        aria-label="Main Navigation"
      >
        {/* Brand Header */}
        <div className="sidebar__brand">
          <div className="sidebar__logo-wrap">
            <div className="sidebar__logo-icon">
              <Zap size={22} className="logo-spark" aria-hidden="true" />
            </div>
            <div className="sidebar__brand-text">
              <h1 className="sidebar__brand-name">FocusBoard</h1>
              <span className="sidebar__brand-tag">Workspace v1.0</span>
            </div>
          </div>

          {/* Close button on mobile */}
          <button
            type="button"
            className="sidebar__close-mobile-btn"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Main Navigation Items */}
        <nav className="sidebar__nav">
          <div className="sidebar__nav-section-title">MAIN MENU</div>
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
                    <span className="sidebar__nav-text">{item.label}</span>
                    {item.badge && (
                      <span className="sidebar__nav-badge">{item.badge}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Workspace Quick Widget */}
        <div className="sidebar__project-widget">
          <div className="project-widget__header">
            <FolderKanban size={16} className="project-widget__icon" aria-hidden="true" />
            <span className="project-widget__title">Active Sprint</span>
          </div>
          <p className="project-widget__desc">Focus Sprint Q4</p>
          <div className="project-widget__meter">
            <div className="project-widget__meter-fill" style={{ width: '78%' }} />
          </div>
          <span className="project-widget__status">78% sprint goals completed</span>
        </div>

        {/* User Profile Footer */}
        <div className="sidebar__footer">
          <div className="user-profile">
            <div className="user-profile__avatar">
              <span>AM</span>
              <span className="user-profile__online-dot" aria-hidden="true" />
            </div>
            <div className="user-profile__info">
              <span className="user-profile__name">Alex Morgan</span>
              <span className="user-profile__email">alex@focusboard.io</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
