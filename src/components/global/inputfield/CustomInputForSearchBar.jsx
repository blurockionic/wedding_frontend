import { useState, useRef } from "react";
import PropTypes from "prop-types";

const CustomInputForSearch = ({
  type = "text",
  placeholder = "",
  value,
  onChange = () => {},
  className = "",
  style = {},
  disabled = false,
  leftIcon = null,
  rightIcon = null,
  suggestions = [], // Array of suggestion values
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions);
  const wrapperRef = useRef(null);

  // Handle input change
  const handleChange = (e) => {
    const inputValue = e.target.value;
    onChange(inputValue);
    if (inputValue) {
      setFilteredSuggestions(
        suggestions.filter((item) =>
          item.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  // Handle selecting a suggestion
  const handleSuggestionClick = (suggestion) => {
    onChange(suggestion);
    setShowSuggestions(false);
  };

  // Hide suggestions when clicking outside
  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setShowSuggestions(false);
    }
  };

  // Add event listener to detect clicks outside
  useState(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div
        className={`flex items-center rounded-md px-2 py-1 border focus-within:ring-2 focus-within:ring-primary ${className}`}
        style={style}
      >
        {/* Left Icon */}
        {leftIcon && <div className="mr-2 text-primary">{leftIcon}</div>}

        {/* Input */}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={() => setShowSuggestions(true)}
          disabled={disabled}
          className="flex-1 py-1 text-primary placeholder:text-muted-foreground focus:outline-none border-transparent rounded focus:ring-transparent"
          aria-label={placeholder}
        />

        {/* Right Icon */}
        {rightIcon && <div className="ml-2 text-primary">{rightIcon}</div>}
      </div>

      {/* Suggestion Box */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded-md shadow-md mt-1 z-10">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-200"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

CustomInputForSearch.displayName = "CustomInputForSearch";

// Prop validation using PropTypes
CustomInputForSearch.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  suggestions: PropTypes.arrayOf(PropTypes.string), // Prop for suggestion list
};

export default CustomInputForSearch;
