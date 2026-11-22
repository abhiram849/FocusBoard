import React from 'react';
import { Search, X } from 'lucide-react';

/**
 * Reusable SearchBar component with clear button and keyboard accessibility
 */
export function SearchBar({ value, onChange, onClear, placeholder = "Search tasks by title..." }) {
  return (
    <div className="search-bar">
      <label htmlFor="task-search-input" className="visually-hidden">
        Search tasks by title
      </label>
      <Search className="search-bar__icon" size={18} aria-hidden="true" />
      <input
        id="task-search-input"
        type="search"
        className="search-bar__input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        spellCheck="false"
      />
      {value && (
        <button
          type="button"
          className="search-bar__clear-btn"
          onClick={onClear}
          aria-label="Clear search input"
          title="Clear search"
        >
          <X size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
