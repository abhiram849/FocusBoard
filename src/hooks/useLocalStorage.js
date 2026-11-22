import { useState, useEffect } from 'react';

/**
 * Custom hook to synchronize state with window.localStorage
 * @param {string} key - localStorage key
 * @param {any} initialValue - Fallback value if storage is empty
 * @returns {[any, Function]} [storedValue, setValue]
 */
export function useLocalStorage(key, initialValue) {
  // Retrieve initial state from localStorage or use provided default
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        const parsed = JSON.parse(item);
        // Ensure non-empty array if initial was array
        if (Array.isArray(initialValue) && Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
        if (parsed !== undefined && parsed !== null) {
          return parsed;
        }
      }
      // If nothing saved or empty, initialize with default
      return initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Sync state changes to localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error writing to localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
