import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar, ChevronDown, AlertCircle } from 'lucide-react';
import { STATUS_OPTIONS, PRIORITY_OPTIONS, CATEGORIES } from '../data/sampleTasks';

/**
 * TaskForm Modal matching Figma "New task form - 760 x 822"
 */
export function TaskForm({ isOpen, onClose, onSubmit, initialTask }) {
  const isEditing = Boolean(initialTask);
  const titleInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Design',
    status: 'To do',
    priority: 'Medium',
    dueDate: ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (initialTask) {
        setFormData({
          title: initialTask.title || '',
          description: initialTask.description || '',
          category: initialTask.category || 'Design',
          status: initialTask.status || 'To do',
          priority: initialTask.priority || 'Medium',
          dueDate: initialTask.dueDate || ''
        });
      } else {
        const todayStr = new Date().toISOString().split('T')[0];
        setFormData({
          title: '',
          description: '',
          category: 'Design',
          status: 'To do',
          priority: 'Medium',
          dueDate: todayStr
        });
      }
      setError('');
      setTimeout(() => titleInputRef.current?.focus(), 50);
    }
  }, [isOpen, initialTask]);

  // Esc key closes modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = formData.title.trim();
    if (!trimmedTitle) {
      setError('Task title is required.');
      return;
    }

    onSubmit({
      ...formData,
      title: trimmedTitle,
      description: formData.description.trim()
    });
    onClose();
  };

  return (
    <div className="figma-modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="figma-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="figma-modal-title"
      >
        {/* Modal Header */}
        <div className="figma-modal-header">
          <div>
            <h3 id="figma-modal-title" className="figma-modal-title">
              {isEditing ? 'Edit task' : 'Create new task'}
            </h3>
            <p className="figma-modal-subtitle">
              Add your task details to stay on top of your work.
            </p>
          </div>
          <button
            type="button"
            className="figma-modal-close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="figma-modal-form" noValidate>
          {/* Task Title */}
          <div className="figma-form-group">
            <label htmlFor="figma-task-title" className="figma-label">
              Task title <span className="figma-required">*</span>
            </label>
            <input
              ref={titleInputRef}
              id="figma-task-title"
              type="text"
              className={`figma-input ${error ? 'figma-input--error' : ''}`}
              placeholder="e.g. Update pricing page"
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
                if (error) setError('');
              }}
              required
            />
            {error && (
              <p className="figma-error-msg" role="alert">
                <AlertCircle size={14} aria-hidden="true" />
                <span>{error}</span>
              </p>
            )}
          </div>

          {/* Description */}
          <div className="figma-form-group">
            <label htmlFor="figma-task-desc" className="figma-label">
              Description
            </label>
            <textarea
              id="figma-task-desc"
              rows={3}
              className="figma-textarea"
              placeholder="Add notes about this task..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Row: Status & Priority */}
          <div className="figma-form-row">
            <div className="figma-form-group">
              <label htmlFor="figma-task-status" className="figma-label">
                Status
              </label>
              <div className="figma-select-wrap">
                <select
                  id="figma-task-status"
                  className="figma-select"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  {STATUS_OPTIONS.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="figma-select-chevron" aria-hidden="true" />
              </div>
            </div>

            <div className="figma-form-group">
              <label htmlFor="figma-task-priority" className="figma-label">
                Priority
              </label>
              <div className="figma-select-wrap">
                <select
                  id="figma-task-priority"
                  className="figma-select"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                >
                  {PRIORITY_OPTIONS.map((pr) => (
                    <option key={pr} value={pr}>
                      {pr}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="figma-select-chevron" aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* Row: Category & Due Date */}
          <div className="figma-form-row">
            <div className="figma-form-group">
              <label htmlFor="figma-task-category" className="figma-label">
                Category
              </label>
              <div className="figma-select-wrap">
                <select
                  id="figma-task-category"
                  className="figma-select"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="figma-select-chevron" aria-hidden="true" />
              </div>
            </div>

            <div className="figma-form-group">
              <label htmlFor="figma-task-duedate" className="figma-label">
                Due date
              </label>
              <div className="figma-date-wrap">
                <Calendar size={14} className="figma-date-icon" aria-hidden="true" />
                <input
                  id="figma-task-duedate"
                  type="date"
                  className="figma-input figma-input--date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
              </div>
            </div>
          </div>

          <p className="figma-required-note">* Required field</p>

          {/* Modal Footer Buttons */}
          <div className="figma-modal-footer">
            <button
              type="button"
              className="figma-btn-cancel"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="figma-btn-submit"
            >
              {isEditing ? 'Save changes' : 'Create task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
