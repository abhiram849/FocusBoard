import React from 'react';
import { TaskCard } from './TaskCard';
import { Plus, Inbox } from 'lucide-react';

/**
 * TaskList component displaying task rows, section title, and empty states
 */
export function TaskList({
  tasks,
  totalTasksCount,
  onEdit,
  onDelete,
  onStatusChange,
  onCreateClick,
  onResetFilters
}) {
  return (
    <section className="my-tasks-section" aria-label="My tasks list">
      {tasks.length > 0 ? (
        <div className="task-rows-list">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      ) : totalTasksCount === 0 ? (
        <div className="task-empty-state">
          <div className="task-empty-icon">
            <Inbox size={32} aria-hidden="true" />
          </div>
          <h3 className="task-empty-title">No tasks on your board</h3>
          <p className="task-empty-desc">Create your first task to start organizing your work in focus.</p>
          <button
            type="button"
            className="btn-purple-primary"
            onClick={onCreateClick}
          >
            <Plus size={16} aria-hidden="true" />
            <span>Create new task</span>
          </button>
        </div>
      ) : (
        <div className="task-empty-state">
          <h3 className="task-empty-title">No matching tasks</h3>
          <p className="task-empty-desc">No tasks match your active search or filter selection.</p>
          <button
            type="button"
            className="btn-reset-filters-link"
            onClick={onResetFilters}
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}
