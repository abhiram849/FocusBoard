import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { CATEGORIES, PRIORITY_OPTIONS } from '../data/sampleTasks';

/**
 * FilterTabs component handling Status tabs, Priority filter dropdown, Category filter, and Reset button
 */
export function FilterTabs({
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  categoryFilter,
  onCategoryChange,
  onResetFilters,
  hasActiveFilters,
  counts
}) {
  const statusTabs = [
    { id: 'All', label: 'All Tasks', count: counts.total },
    { id: 'To do', label: 'To do', count: counts.todo },
    { id: 'In progress', label: 'In progress', count: counts.inProgress },
    { id: 'Completed', label: 'Completed', count: counts.completed }
  ];

  return (
    <div className="filter-toolbar">
      {/* Status Segmented Tabs */}
      <div className="filter-tabs" role="tablist" aria-label="Filter tasks by status">
        {statusTabs.map((tab) => {
          const isActive = statusFilter === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              className={`filter-tab ${isActive ? 'filter-tab--active' : ''}`}
              onClick={() => onStatusChange(tab.id)}
            >
              <span className="filter-tab__label">{tab.label}</span>
              <span className={`filter-tab__badge ${isActive ? 'filter-tab__badge--active' : ''}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Secondary Filters Row: Priority & Category Dropdowns */}
      <div className="filter-controls">
        <div className="filter-control">
          <label htmlFor="priority-filter-select" className="filter-control__label">
            <Filter size={14} className="filter-control__icon" aria-hidden="true" />
            <span>Priority:</span>
          </label>
          <select
            id="priority-filter-select"
            className="filter-select"
            value={priorityFilter}
            onChange={(e) => onPriorityChange(e.target.value)}
            aria-label="Filter by priority"
          >
            <option value="All">All Priorities</option>
            {PRIORITY_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {p} Priority
              </option>
            ))}
          </select>
        </div>

        <div className="filter-control">
          <label htmlFor="category-filter-select" className="filter-control__label">
            <span>Category:</span>
          </label>
          <select
            id="category-filter-select"
            className="filter-select"
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
            aria-label="Filter by category"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'All' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            className="btn-reset-filters"
            onClick={onResetFilters}
            aria-label="Reset all search and filter options"
          >
            <RotateCcw size={14} aria-hidden="true" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
