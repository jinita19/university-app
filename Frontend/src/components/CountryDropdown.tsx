import { useEffect, useRef, useState } from "react";
import { fetchCountries } from "../services/countryService";
import "./CountryDropdown.css";
import { useKeyboardNavigation } from "../hooks/useKeyboardNavigation";

export const CountryDropdown: React.FC = () => {
  const [input, setInput] = useState("");
  const [countries, setCountries] = useState<string[]>([]);
  const [showList, setShowList] = useState<boolean>(false);
  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchCountries()
      .then((data) => setCountries(data))
      .catch((err) => {
        console.log("Error Fetching Countries", err);
      });
  }, []);

  // Effect for handling clicks outside the dropdown container to close the suggestion list
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(event.target as Node)
      ) {
        setShowList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(input.toLowerCase())
  );

  const handleSuggestionSelect = (suggestion: string) => {
    setInput(suggestion);
    setShowList(false);
  };

  const hideTheList = () => setShowList(false);

  const { activeIndex, handleKeyDown } = useKeyboardNavigation(
    filteredCountries,
    handleSuggestionSelect,
    hideTheList
  );

  const getHighlightedText = (text: string) => {
    if (!input) return text;
    const regex = new RegExp(`(${input})`, "gi");
    const parts = text.split(regex);

    return parts.map((part: string, i: number) =>
      regex.test(part) ? <strong key={i}>{part}</strong> : part
    );
  };

  const renderListContent = () => {
    if (filteredCountries.length === 0) {
      return <li>No Suggestions Found</li>;
    } else {
      return filteredCountries.map((suggestion: string, index: number) => (
        <li
          key={suggestion}
          onClick={() => handleSuggestionSelect(suggestion)}
          className={index === activeIndex ? "active" : ""}
          id={`list-index-${index}`}
        >
          {getHighlightedText(suggestion)}
        </li>
      ));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    if (value.length && !showList) setShowList(true);
    else if (!value.length && showList) setShowList(false);
  };

  const handleFocus = () => {
    if (input.length) setShowList(true);
  };

  return (
    <div className="country-dropdown" ref={dropdownContainerRef}>
      <input
        type="text"
        value={input}
        id="search"
        className="search-input"
        placeholder={"Enter a country"}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect="off"
      />
      {showList && <ul className="suggestion-list">{renderListContent()}</ul>}
    </div>
  );
};
