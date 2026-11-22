import React, { useEffect, useRef } from 'react';
import { AlertCircle, Trash2, X } from 'lucide-react';

/**
 * DeleteModal confirmation dialog before permanent task deletion
 */
export function DeleteModal({ isOpen, task, onConfirm, onCancel }) {
  const confirmBtnRef = useRef(null);

  // Esc key and focus management
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => confirmBtnRef.current?.focus(), 50);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen || !task) return null;

  return (
    <div className="modal-backdrop" onClick={onCancel} role="presentation">
      <div
        className="modal-container delete-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-desc"
      >
        <div className="delete-modal__header">
          <div className="delete-modal__icon-wrap">
            <AlertCircle size={24} className="delete-modal__icon" aria-hidden="true" />
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onCancel}
            aria-label="Cancel deletion"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="delete-modal__body">
          <h3 id="delete-modal-title" className="delete-modal__title">
            Delete Task
          </h3>
          <p id="delete-modal-desc" className="delete-modal__desc">
            Are you sure you want to delete <strong className="delete-modal__task-name">"{task.title}"</strong>?
            This will permanently remove it from your board and local storage.
          </p>
        </div>

        <div className="modal-footer delete-modal__footer">
          <button
            type="button"
            className="btn btn--secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            ref={confirmBtnRef}
            type="button"
            className="btn btn--danger"
            onClick={() => onConfirm(task.id)}
          >
            <Trash2 size={16} aria-hidden="true" />
            <span>Delete Task</span>
          </button>
        </div>
      </div>
    </div>
  );
}
