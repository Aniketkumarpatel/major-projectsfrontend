import { useEffect, useRef } from 'react';

/**
 * useLocalStorage – sync a state value with localStorage.
 * Similar to useState but persisted across page reloads.
 *
 * @param {string} key - localStorage key
 * @param {*} defaultValue - initial value if key doesn't exist
 * @returns {[value, setValue]}
 */
import { useState } from 'react';

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // quota exceeded or SSR
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
