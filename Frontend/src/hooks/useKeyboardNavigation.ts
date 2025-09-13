import { useState, useCallback, useEffect } from 'react';

/**
 * Custom hook helps with keyboard navigations
 * @param suggestions : List of items on which operations are going to perform
 * @param onSelect : function to call when any item is selected
 * @param hideTheList : to hide the list
 * @returns
 *  activeIndex: In a list shows which data is active
 *  handleKeyDown: Main function which handles all the necessary key operations
 *  resetHighlight: forcefully remove the active index
 */
export const useKeyboardNavigation = (
  suggestions: string[],
  onSelect: (item: string) => void,
  hideTheList: () => void
) => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const totalSuggestions = suggestions.length;
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex(prev => (prev + 1) % totalSuggestions);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex(
            prev => (prev - 1 + totalSuggestions) % totalSuggestions
          );
          break;
        case 'Tab':
          hideTheList();
          break;
        case 'Enter':
          e.preventDefault();
          if (activeIndex >= 0) {
            onSelect(suggestions[activeIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          hideTheList();
          setActiveIndex(-1);
          break;
      }
    },
    [suggestions, hideTheList, activeIndex, onSelect]
  );

  // Scroll the highlighted item into view whenever it changes
  useEffect(() => {
    if (activeIndex >= 0) {
      const element = document.getElementById(`list-index-${activeIndex}`);
      if (element) {
        element.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
  }, [activeIndex]);

  return {
    activeIndex,
    handleKeyDown
  };
};
