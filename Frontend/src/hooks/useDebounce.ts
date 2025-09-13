import { useEffect, useState } from 'react';

/**
 * Custom hook to debounce a value
 * @param value : Value to debounce
 * @param delay : by what duration you want to delay the value in miliseconds
 * @returns debounced value
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedVal, setDebouncedVal] = useState(value);

  useEffect(() => {
    //set a timer to update a value after the specified delay
    const timer = setTimeout(() => setDebouncedVal(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedVal;
}