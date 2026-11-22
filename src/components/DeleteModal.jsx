import React, { useEffect, useRef } from 'react';
import { AlertCircle, Trash2, X } from 'lucide-react';

/**
 * Delete Confirmation Modal
 */
export function DeleteModal({ isOpen, task, onConfirm, onCancel }) {
  const confirmBtnRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onCancel();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => confirmBtnRef.current?.focus(), 50);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen || !task) return null;

  return (
    <div className="figma-modal-backdrop" onClick={onCancel} role="presentation">
      <div
        className="figma-modal-card delete-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
      >
        <div className="figma-modal-header">
          <div className="delete-title-wrap">
            <div className="delete-warning-icon">
              <AlertCircle size={20} aria-hidden="true" />
            </div>
            <h3 id="delete-dialog-title" className="figma-modal-title">Delete task?</h3>
          </div>
          <button
            type="button"
            className="figma-modal-close"
            onClick={onCancel}
            aria-label="Close"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="delete-modal-body">
          <p className="delete-modal-text">
            Are you sure you want to remove <strong>"{task.title}"</strong>? This action cannot be undone.
          </p>
        </div>

        <div className="figma-modal-footer">
          <button
            type="button"
            className="figma-btn-cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            ref={confirmBtnRef}
            type="button"
            className="btn-danger-submit"
            onClick={() => onConfirm(task.id)}
          >
            <Trash2 size={14} aria-hidden="true" />
            <span>Delete task</span>
          </button>
        </div>
      </div>
    </div>
  );
}
