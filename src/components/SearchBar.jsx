import { useState } from "react";

const SearchBar = ({
  placeholder = "Search...",
  onSearch,
  customStyles = "",
  icon,
  rounded = "rounded-md",
  defaultWidth = "w-60",
  expandedWidth = "w-80",
}) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(query);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    // Only shrink if there's no content
    if (query.trim() === "") {
      setIsFocused(false);
    }
  };

  return (
    <div
      className={`flex items-center border bg-gray-700 border-gray-600 text-gray-300 ${rounded} transition-all duration-300 ${
        isFocused ? expandedWidth : defaultWidth
      } ${customStyles}`}
    >
      {/* Icon Section */}
      {icon && (
        <div
          className={`px-3 text-gray-400 transition-transform duration-300 ${
            isFocused ? "scale-110" : "scale-100"
          }`}
        >
          {icon}
        </div>
      )}

      {/* Input Section */}
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`flex-grow px-2 py-1 lg:px-4 lg:py-2 bg-transparent placeholder-gray-500 focus:outline-none  focus:ring-offset-2 focus:ring-offset-gray-700 ${rounded}`}
      />
    </div>
  );
};

export default SearchBar;
