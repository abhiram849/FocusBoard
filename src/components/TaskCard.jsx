import React from 'react';
import { Calendar, Edit3, Trash2, CheckCircle2, Clock, Circle, AlertCircle } from 'lucide-react';
import { STATUS_OPTIONS } from '../data/sampleTasks';

/**
 * TaskCard component for desktop, tablet, and mobile views
 */
export function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const isCompleted = task.status === 'Completed';

  // Format Due Date
  const formatDate = (dateString) => {
    if (!dateString) return 'No deadline';
    try {
      const date = new Date(dateString + 'T00:00:00');
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Check if overdue
  const isOverdue = () => {
    if (isCompleted || !task.dueDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(task.dueDate + 'T00:00:00');
    return due < today;
  };

  // Status icon helper
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle2 size={15} className="status-badge__icon text-emerald" aria-hidden="true" />;
      case 'In progress':
        return <Clock size={15} className="status-badge__icon text-amber" aria-hidden="true" />;
      case 'To do':
      default:
        return <Circle size={15} className="status-badge__icon text-blue" aria-hidden="true" />;
    }
  };

  return (
    <article
      className={`task-card ${isCompleted ? 'task-card--completed' : ''}`}
      aria-label={`Task: ${task.title}`}
    >
      {/* Top row: Category tag & Priority badge */}
      <div className="task-card__top">
        <div className="task-card__tags">
          <span className={`task-badge task-badge--category category--${task.category?.toLowerCase() || 'default'}`}>
            {task.category || 'General'}
          </span>
          <span className={`task-badge task-badge--priority priority--${task.priority?.toLowerCase() || 'medium'}`}>
            {task.priority === 'High' && <AlertCircle size={12} aria-hidden="true" />}
            {task.priority} Priority
          </span>
        </div>

        {/* Quick Actions (Edit, Delete) */}
        <div className="task-card__actions" role="group" aria-label="Task actions">
          <button
            type="button"
            className="task-action-btn task-action-btn--edit"
            onClick={() => onEdit(task)}
            title="Edit task"
            aria-label={`Edit task "${task.title}"`}
          >
            <Edit3 size={15} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="task-action-btn task-action-btn--delete"
            onClick={() => onDelete(task)}
            title="Delete task"
            aria-label={`Delete task "${task.title}"`}
          >
            <Trash2 size={15} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Task Content: Title & Description */}
      <div className="task-card__main">
        <h4 className={`task-card__title ${isCompleted ? 'task-card__title--done' : ''}`}>
          {task.title}
        </h4>
        {task.description && (
          <p className="task-card__description">
            {task.description}
          </p>
        )}
      </div>

      {/* Task Footer: Due Date and Status Selector */}
      <div className="task-card__footer">
        <div className={`task-card__due-date ${isOverdue() ? 'task-card__due-date--overdue' : ''}`}>
          <Calendar size={14} aria-hidden="true" />
          <span>{formatDate(task.dueDate)}</span>
          {isOverdue() && <span className="overdue-tag">Overdue</span>}
        </div>

        {/* Interactive Status Selector */}
        <div className="task-card__status-wrap">
          <label htmlFor={`status-select-${task.id}`} className="visually-hidden">
            Update status for {task.title}
          </label>
          <div className={`status-pill status-pill--${task.status?.toLowerCase().replace(/\s+/g, '-')}`}>
            {getStatusIcon(task.status)}
            <select
              id={`status-select-${task.id}`}
              className="status-pill__select"
              value={task.status}
              onChange={(e) => onStatusChange(task.id, e.target.value)}
              aria-label={`Change status for ${task.title}`}
            >
              {STATUS_OPTIONS.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </article>
  );
}
