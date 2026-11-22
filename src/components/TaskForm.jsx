import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar, Tag, AlertTriangle, Layers, Clock } from 'lucide-react';
import { CATEGORIES, STATUS_OPTIONS, PRIORITY_OPTIONS } from '../data/sampleTasks';

/**
 * TaskForm modal dialog for both Create and Edit operations
 */
export function TaskForm({ isOpen, onClose, onSubmit, initialTask }) {
  const isEditing = Boolean(initialTask);
  const titleInputRef = useRef(null);

  // Form Fields State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Development',
    status: 'To do',
    priority: 'Medium',
    dueDate: ''
  });

  // Validation Errors State
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Reset or populate fields when modal opens or initialTask changes
  useEffect(() => {
    if (isOpen) {
      if (initialTask) {
        setFormData({
          title: initialTask.title || '',
          description: initialTask.description || '',
          category: initialTask.category || 'Development',
          status: initialTask.status || 'To do',
          priority: initialTask.priority || 'Medium',
          dueDate: initialTask.dueDate || ''
        });
      } else {
        // Default values for new task
        const todayStr = new Date().toISOString().split('T')[0];
        setFormData({
          title: '',
          description: '',
          category: 'Development',
          status: 'To do',
          priority: 'Medium',
          dueDate: todayStr
        });
      }
      setErrors({});
      setTouched({});

      // Auto-focus title input when dialog opens
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen, initialTask]);

  // Handle keyboard ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Validation function
  const validate = () => {
    const newErrors = {};
    const trimmedTitle = formData.title.trim();

    if (!trimmedTitle) {
      newErrors.title = 'Task title is required and cannot be empty or spaces only.';
    } else if (trimmedTitle.length < 3) {
      newErrors.title = 'Task title must be at least 3 characters long.';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required.';
    }

    if (!formData.status) {
      newErrors.status = 'Status is required.';
    }

    if (!formData.priority) {
      newErrors.priority = 'Priority is required.';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time clearing of error if valid
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setTouched({
        title: true,
        dueDate: true,
        status: true,
        priority: true
      });
      return;
    }

    // Submit clean trimmed data
    onSubmit({
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim()
    });

    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal-container task-form-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-form-title"
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header__title-wrap">
            <h3 id="task-form-title" className="modal-header__title">
              {isEditing ? 'Edit Task' : 'Create New Task'}
            </h3>
            <p className="modal-header__subtitle">
              {isEditing
                ? 'Update task details, deadline, and priority.'
                : 'Fill in the information below to add a task to your board.'}
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
            title="Close"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="task-form" noValidate>
          {/* Title Field */}
          <div className="form-group">
            <label htmlFor="task-title-input" className="form-label">
              Task Title <span className="required-star">*</span>
            </label>
            <input
              ref={titleInputRef}
              id="task-title-input"
              name="title"
              type="text"
              className={`form-input ${errors.title ? 'form-input--error' : ''}`}
              placeholder="e.g., Complete interactive dashboard UI"
              value={formData.title}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? 'task-title-error' : undefined}
            />
            {errors.title && (
              <p id="task-title-error" className="form-error" role="alert">
                <AlertTriangle size={14} aria-hidden="true" />
                <span>{errors.title}</span>
              </p>
            )}
          </div>

          {/* Description Field */}
          <div className="form-group">
            <label htmlFor="task-description-input" className="form-label">
              Description <span className="optional-text">(Optional)</span>
            </label>
            <textarea
              id="task-description-input"
              name="description"
              rows={3}
              className="form-textarea"
              placeholder="Add key objectives, reference links, or notes..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Grid Row: Category & Due Date */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="task-category-select" className="form-label">
                <Tag size={14} className="form-label__icon" aria-hidden="true" />
                Category
              </label>
              <select
                id="task-category-select"
                name="category"
                className="form-select"
                value={formData.category}
                onChange={handleChange}
              >
                {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="task-duedate-input" className="form-label">
                <Calendar size={14} className="form-label__icon" aria-hidden="true" />
                Due Date <span className="required-star">*</span>
              </label>
              <input
                id="task-duedate-input"
                name="dueDate"
                type="date"
                className={`form-input ${errors.dueDate ? 'form-input--error' : ''}`}
                value={formData.dueDate}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                aria-invalid={Boolean(errors.dueDate)}
                aria-describedby={errors.dueDate ? 'task-duedate-error' : undefined}
              />
              {errors.dueDate && (
                <p id="task-duedate-error" className="form-error" role="alert">
                  <AlertTriangle size={14} aria-hidden="true" />
                  <span>{errors.dueDate}</span>
                </p>
              )}
            </div>
          </div>

          {/* Grid Row: Status & Priority */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="task-status-select" className="form-label">
                <Clock size={14} className="form-label__icon" aria-hidden="true" />
                Status <span className="required-star">*</span>
              </label>
              <select
                id="task-status-select"
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleChange}
              >
                {STATUS_OPTIONS.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="task-priority-select" className="form-label">
                <Layers size={14} className="form-label__icon" aria-hidden="true" />
                Priority <span className="required-star">*</span>
              </label>
              <select
                id="task-priority-select"
                name="priority"
                className="form-select"
                value={formData.priority}
                onChange={handleChange}
              >
                {PRIORITY_OPTIONS.map((pr) => (
                  <option key={pr} value={pr}>
                    {pr} Priority
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Form Actions Footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn--secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn--primary"
            >
              {isEditing ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
