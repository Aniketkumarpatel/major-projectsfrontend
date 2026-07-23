import { useState, useEffect, useRef } from 'react';

/**
 * useDebounce – delays updating a value until after a specified wait period.
 *
 * @param {*} value - The value to debounce
 * @param {number} delay - Delay in milliseconds (default: 400ms)
 * @returns {*} debouncedValue
 *
 * @example
 *   const debouncedSearch = useDebounce(searchTerm, 400);
 */
const useDebounce = (value, delay = 400) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timerRef.current);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
