import React from 'react';
import { TaskCard } from './TaskCard';
import { LayoutGrid, List, PlusCircle, SearchX, Inbox } from 'lucide-react';

/**
 * TaskList component managing task rendering, grid/list view switching, and empty states
 */
export function TaskList({
  tasks,
  totalTasksCount,
  onEdit,
  onDelete,
  onStatusChange,
  onCreateClick,
  onResetFilters,
  viewMode,
  onViewModeChange
}) {
  return (
    <section className="task-list-section" aria-label="Task List">
      {/* Section Toolbar */}
      <div className="task-list-header">
        <div className="task-list-header__left">
          <h2 className="task-list-header__title">Tasks Overview</h2>
          <span className="task-list-header__badge">
            {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
          </span>
        </div>

        <div className="task-list-header__right">
          <div className="view-mode-toggle" role="group" aria-label="View layout toggle">
            <button
              type="button"
              className={`view-mode-btn ${viewMode === 'grid' ? 'view-mode-btn--active' : ''}`}
              onClick={() => onViewModeChange('grid')}
              aria-label="Grid card view"
              title="Grid view"
            >
              <LayoutGrid size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              className={`view-mode-btn ${viewMode === 'list' ? 'view-mode-btn--active' : ''}`}
              onClick={() => onViewModeChange('list')}
              aria-label="List table view"
              title="List view"
            >
              <List size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Task Content / Empty States */}
      {tasks.length > 0 ? (
        <div className={`task-grid task-grid--${viewMode}`}>
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
        // Completely empty state (no tasks at all)
        <div className="empty-state empty-state--no-tasks">
          <div className="empty-state__icon-wrap">
            <Inbox size={36} className="empty-state__icon" aria-hidden="true" />
          </div>
          <h3 className="empty-state__title">No tasks created yet</h3>
          <p className="empty-state__desc">
            Get started by adding your first project or daily goal to FocusBoard.
          </p>
          <button
            type="button"
            className="btn btn--primary empty-state__action-btn"
            onClick={onCreateClick}
          >
            <PlusCircle size={18} aria-hidden="true" />
            <span>Add First Task</span>
          </button>
        </div>
      ) : (
        // Filter empty state (no tasks matching filter or search)
        <div className="empty-state empty-state--no-match">
          <div className="empty-state__icon-wrap">
            <SearchX size={36} className="empty-state__icon" aria-hidden="true" />
          </div>
          <h3 className="empty-state__title">No matching tasks found</h3>
          <p className="empty-state__desc">
            No tasks matched your current search query or filter selection. Try clearing filters to see all tasks.
          </p>
          <button
            type="button"
            className="btn btn--secondary empty-state__action-btn"
            onClick={onResetFilters}
          >
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </section>
  );
}
