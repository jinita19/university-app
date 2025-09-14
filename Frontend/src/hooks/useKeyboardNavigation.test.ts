/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook, act } from '@testing-library/react';
import { useKeyboardNavigation } from './useKeyboardNavigation';

describe('useFetchSuggestions', () => {
  let onSelect: jest.Mock;
  let hideTheList: jest.Mock;

  beforeEach(() => {
    onSelect = jest.fn();
    hideTheList = jest.fn();
  });

  it('should move to next element in list when arrow down key is pressed', async () => {
    const { result } = renderHook(() =>
      useKeyboardNavigation(['a', 'b', 'c'], onSelect, hideTheList)
    );

    expect(result.current.activeIndex).toBe(-1);

    act(() => {
      result.current.handleKeyDown({
        key: 'ArrowDown',
        preventDefault: jest.fn()
      } as any);
    });

    expect(result.current.activeIndex).toBe(0);
  });

  it('should move to previous element in list when arrow up key is pressed', async () => {
    const { result } = renderHook(() =>
      useKeyboardNavigation(['a', 'b', 'c'], onSelect, hideTheList)
    );

    act(() => {
      result.current.handleKeyDown({
        key: 'ArrowDown',
        preventDefault: jest.fn()
      } as any);
    });

    expect(result.current.activeIndex).toBe(0);

    act(() => {
      result.current.handleKeyDown({
        key: 'ArrowUp',
        preventDefault: jest.fn()
      } as any);
    });

    //as previous index is 0 so it will go to last element index
    expect(result.current.activeIndex).toBe(2);
  });

  it('should call hide the list when tab is pressed', async () => {
    const { result } = renderHook(() =>
      useKeyboardNavigation(['a', 'b', 'c'], onSelect, hideTheList)
    );

    act(() => {
      result.current.handleKeyDown({
        key: 'Tab'
      } as any);
    });

    expect(hideTheList).toHaveBeenCalledTimes(1);
  });

  it('should call hide the list and reset the index when escape is pressed', async () => {
    const { result } = renderHook(() =>
      useKeyboardNavigation(['a', 'b', 'c'], onSelect, hideTheList)
    );

    act(() => {
      result.current.handleKeyDown({
        key: 'Escape',
        preventDefault: jest.fn()
      } as any);
    });

    expect(hideTheList).toHaveBeenCalledTimes(1);
    expect(result.current.activeIndex).toBe(-1);
  });

  it('should not do nothing when enter key is pressed and no index is highlighted', async () => {
    const { result } = renderHook(() =>
      useKeyboardNavigation(['a', 'b', 'c'], onSelect, hideTheList)
    );

    act(() => {
      result.current.handleKeyDown({
        key: 'Enter',
        preventDefault: jest.fn()
      } as any);
    });

    expect(onSelect).not.toHaveBeenCalled();
  });

  it('should call select with correct element when enter key is pressed and index is highlighted', async () => {
    const { result } = renderHook(() =>
      useKeyboardNavigation(['a', 'b', 'c'], onSelect, hideTheList)
    );

    act(() => {
      result.current.handleKeyDown({
        key: 'ArrowDown',
        preventDefault: jest.fn()
      } as any);
    });

    expect(result.current.activeIndex).toBe(0);

    act(() => {
      result.current.handleKeyDown({
        key: 'Enter',
        preventDefault: jest.fn()
      } as any);
    });

    expect(onSelect).toHaveBeenCalledWith('a');
  });
});
