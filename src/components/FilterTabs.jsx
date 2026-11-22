import React from 'react';
import { Search, ChevronDown, RotateCcw, Plus } from 'lucide-react';
import { PRIORITY_OPTIONS } from '../data/sampleTasks';

/**
 * FilterTabs and Toolbar matching Figma "My tasks" section exactly
 */
export function FilterTabs({
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  searchQuery,
  onSearchChange,
  onViewAllClick,
  onAddTaskClick,
  counts,
  hasActiveFilters,
  onResetFilters
}) {
  return (
    <div className="my-tasks-toolbar-wrapper">
      {/* Header of My Tasks Section */}
      <div className="my-tasks-header">
        <div className="my-tasks-header-left">
          <h3 className="my-tasks-title">My tasks</h3>
          <p className="my-tasks-subtitle desktop-only">Manage and track everything in one place.</p>
          <p className="my-tasks-subtitle mobile-only">Your priorities for this week.</p>
        </div>

        <div className="my-tasks-header-actions">
          {/* Desktop "View all tasks" button */}
          <button
            type="button"
            className="btn-view-all-tasks desktop-only"
            onClick={onViewAllClick}
          >
            View all tasks
          </button>

          {/* Mobile "+" circle button */}
          <button
            type="button"
            className="mobile-task-add-btn mobile-only"
            onClick={onAddTaskClick}
            aria-label="Add task"
          >
            <Plus size={18} strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Toolbar: Filter Tabs & Search / Priority */}
      <div className="my-tasks-toolbar">
        {/* Status segmented pill */}
        <div className="status-filter-pills" role="tablist" aria-label="Task status tabs">
          <button
            type="button"
            role="tab"
            aria-selected={statusFilter === 'All'}
            className={`status-filter-pill ${statusFilter === 'All' ? 'status-filter-pill--active' : ''}`}
            onClick={() => onStatusChange('All')}
          >
            <span>All tasks</span>
            <span className="status-filter-count">{counts.total}</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={statusFilter === 'In progress'}
            className={`status-filter-pill ${statusFilter === 'In progress' ? 'status-filter-pill--active' : ''}`}
            onClick={() => onStatusChange('In progress')}
          >
            <span>In progress</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={statusFilter === 'Completed'}
            className={`status-filter-pill ${statusFilter === 'Completed' ? 'status-filter-pill--active' : ''}`}
            onClick={() => onStatusChange('Completed')}
          >
            <span>Completed</span>
          </button>
        </div>

        {/* Right Controls: Search & Priority */}
        <div className="my-tasks-right-controls">
          {/* Search Input */}
          <div className="search-input-box">
            <Search size={14} className="search-icon" aria-hidden="true" />
            <input
              type="text"
              className="search-input"
              placeholder="Find a task..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Find a task"
            />
          </div>

          {/* Priority Dropdown */}
          <div className="priority-select-box">
            <select
              className="priority-select"
              value={priorityFilter}
              onChange={(e) => onPriorityChange(e.target.value)}
              aria-label="Filter by priority"
            >
              <option value="All">Priority: All</option>
              {PRIORITY_OPTIONS.map((p) => (
                <option key={p} value={p}>
                  Priority: {p}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="priority-chevron" aria-hidden="true" />
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              className="btn-reset-filters-icon"
              onClick={onResetFilters}
              title="Reset filters"
              aria-label="Reset all search and filter options"
            >
              <RotateCcw size={14} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
