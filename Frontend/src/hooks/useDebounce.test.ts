import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  it('should return the initial value properly', () => {
    const { result } = renderHook(() => useDebounce('abc', 200));
    expect(result.current).toBe('abc');
  });

  it('should update the value after delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'abc', delay: 200 } }
    );

    rerender({ value: 'def', delay: 200 });

    expect(result.current).toBe('abc');

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toBe('def');
  });
});
