import React from 'react';
import { Menu, Plus, Bell, CheckCircle } from 'lucide-react';

/**
 * Top Header component with mobile toggle, date badge, add task button, and user notifications
 */
export function Header({ onMenuClick, onAddTaskClick, completedCount, totalCount }) {
  // Today's formatted date
  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <header className="dashboard-header" role="banner">
      <div className="dashboard-header__left">
        {/* Mobile Hamburger Menu Toggle */}
        <button
          type="button"
          className="dashboard-header__menu-btn"
          onClick={onMenuClick}
          aria-label="Open mobile navigation menu"
        >
          <Menu size={22} aria-hidden="true" />
        </button>

        <div className="dashboard-header__titles">
          <div className="dashboard-header__greeting-row">
            <h1 className="dashboard-header__title">Dashboard</h1>
            <span className="dashboard-header__date-badge">
              {todayFormatted}
            </span>
          </div>
          <p className="dashboard-header__subtitle">
            Welcome back! Here's an overview of your productivity priorities.
          </p>
        </div>
      </div>

      <div className="dashboard-header__right">
        {/* Quick summary pill */}
        <div className="dashboard-header__status-chip" title="Task progress today">
          <CheckCircle size={15} className="text-emerald" aria-hidden="true" />
          <span>{completedCount} of {totalCount} Done</span>
        </div>

        {/* Notifications Icon */}
        <button
          type="button"
          className="dashboard-header__icon-btn"
          aria-label="View notifications (1 unread)"
          title="Notifications"
        >
          <Bell size={18} aria-hidden="true" />
          <span className="notification-dot" aria-hidden="true" />
        </button>

        {/* Primary CTA: Add Task */}
        <button
          type="button"
          className="btn btn--primary header-add-btn"
          onClick={onAddTaskClick}
          aria-label="Create new task"
        >
          <Plus size={18} aria-hidden="true" />
          <span>Add Task</span>
        </button>
      </div>
    </header>
  );
}
