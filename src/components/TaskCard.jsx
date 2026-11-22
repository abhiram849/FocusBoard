import React, { useState, useRef, useEffect } from 'react';
import { Calendar, MoreHorizontal, Check, Edit3, Trash2, Clock, Circle } from 'lucide-react';

/**
 * TaskRow component matching Figma row design
 */
export function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const isCompleted = task.status === 'Completed';

  // Format Due date like "Nov 22"
  const formatShortDate = (dateStr) => {
    if (!dateStr) return 'No due date';
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const d = new Date(parts[0], parts[1] - 1, parts[2]);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  // Toggle completion via checkbox
  const handleToggleCheck = () => {
    if (isCompleted) {
      onStatusChange(task.id, 'In progress');
    } else {
      onStatusChange(task.id, 'Completed');
    }
  };

  // Close dropdown menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isMenuOpen]);

  // Priority CSS classes
  const getPriorityClass = (priority) => {
    const p = (priority || 'medium').toLowerCase();
    if (p === 'high') return 'priority-badge--high';
    if (p === 'low') return 'priority-badge--low';
    return 'priority-badge--medium';
  };

  // Category CSS classes
  const getCategoryClass = (category) => {
    const c = (category || 'general').toLowerCase();
    return `category-badge--${c}`;
  };

  return (
    <div
      className={`task-row ${isCompleted ? 'task-row--completed' : ''}`}
      role="article"
      aria-label={`Task: ${task.title}`}
    >
      {/* Checkbox column */}
      <button
        type="button"
        className={`task-checkbox ${isCompleted ? 'task-checkbox--checked' : ''}`}
        onClick={handleToggleCheck}
        aria-label={isCompleted ? `Mark ${task.title} as incomplete` : `Mark ${task.title} as completed`}
        title={isCompleted ? 'Mark incomplete' : 'Mark completed'}
      >
        {isCompleted && <Check size={13} strokeWidth={3} aria-hidden="true" />}
      </button>

      {/* Title & subtitle column */}
      <div className="task-content">
        <h4 className={`task-title ${isCompleted ? 'task-title--completed' : ''}`}>
          {task.title}
        </h4>
        {task.description && (
          <p className="task-subtitle">{task.description}</p>
        )}
      </div>

      {/* Meta tags column (Category, Priority, Due date) */}
      <div className="task-meta">
        <span className={`category-badge ${getCategoryClass(task.category)}`}>
          {task.category || 'General'}
        </span>

        <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
          {task.priority || 'Medium'}
        </span>

        <div className="task-duedate">
          <Calendar size={13} className="task-duedate-icon" aria-hidden="true" />
          <span>{formatShortDate(task.dueDate)}</span>
        </div>

        {/* 3 dots action menu */}
        <div className="task-menu-container" ref={menuRef}>
          <button
            type="button"
            className="task-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={`More options for ${task.title}`}
            aria-expanded={isMenuOpen}
          >
            <MoreHorizontal size={16} aria-hidden="true" />
          </button>

          {isMenuOpen && (
            <div className="task-dropdown-menu" role="menu">
              <button
                type="button"
                className="task-dropdown-item"
                onClick={() => {
                  setIsMenuOpen(false);
                  onEdit(task);
                }}
                role="menuitem"
              >
                <Edit3 size={14} aria-hidden="true" />
                <span>Edit task</span>
              </button>

              <button
                type="button"
                className="task-dropdown-item"
                onClick={() => {
                  setIsMenuOpen(false);
                  onStatusChange(task.id, 'To do');
                }}
                role="menuitem"
              >
                <Circle size={14} className="text-blue" aria-hidden="true" />
                <span>Set To do</span>
              </button>

              <button
                type="button"
                className="task-dropdown-item"
                onClick={() => {
                  setIsMenuOpen(false);
                  onStatusChange(task.id, 'In progress');
                }}
                role="menuitem"
              >
                <Clock size={14} className="text-amber" aria-hidden="true" />
                <span>Set In progress</span>
              </button>

              <button
                type="button"
                className="task-dropdown-item"
                onClick={() => {
                  setIsMenuOpen(false);
                  onStatusChange(task.id, 'Completed');
                }}
                role="menuitem"
              >
                <Check size={14} className="text-emerald" aria-hidden="true" />
                <span>Set Completed</span>
              </button>

              <div className="dropdown-divider" />

              <button
                type="button"
                className="task-dropdown-item task-dropdown-item--danger"
                onClick={() => {
                  setIsMenuOpen(false);
                  onDelete(task);
                }}
                role="menuitem"
              >
                <Trash2 size={14} aria-hidden="true" />
                <span>Delete task</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
