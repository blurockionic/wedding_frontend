import { useState, useEffect } from "react";
import { BiX } from "react-icons/bi";

const SearchBar = ({
  placeholder = "Search...",
  onSearch,
  icon,
  rounded = "rounded-md",
}) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [width, setWidth] = useState("");

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
    if (query.trim() === "") {
      setIsFocused(false);
    }
  };

  const handleClear = () => {
    setQuery("");
  };

  const getWidth = () => {
    if (window.matchMedia("(max-width: 640px)").matches) {
      // Small screens
      return isFocused ? "w-56" : "w-36";
    } else {
      // Larger screens
      return isFocused ? "w-80" : "w-60";
    }
  };

  useEffect(() => {
    const updateWidth = () => setWidth(getWidth());
    updateWidth(); // Set initial width

    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [isFocused]);

  return (
    <div
      className={`relative flex items-center justify-start 
        border-2 
        ${isFocused ? "border-blue-500" : ""} 
        bg-gray-700 text-gray-300 ${rounded} transition-all ease-in-out duration-300 ${width}`}
    >
      {/* Input Section */}
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={query.length === 0 ? placeholder : ""}
        className={`flex-grow py-1 lg:px-4 transition-all ease-in-out duration-300 md:pl-10 bg-transparent font-thin placeholder-gray-500 focus:outline-none ${rounded}`}
        aria-label="Search"
      />

      {/* Clear Button */}
      {query.length > 0 ? (
        <button
          onClick={handleClear}
          className="absolute right-0 md:right-3 text-gray-400"
        >
          <BiX size={24} />
        </button>
      ) : null}

      {/* Search Icon */}
      {query.length === 0 && icon && (
        <div
          className="absolute right-0 md:right-3 text-gray-400"
          style={{ pointerEvents: "none" }}
        >
          {icon}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
