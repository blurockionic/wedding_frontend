import React, { useState, useRef, useCallback, useEffect } from "react";
import CustomInput from "../../components/global/inputfield/CustomInput";
import { GoSearch } from "react-icons/go";
import { allCategories } from "../../static/static";

export default function VendorSearch({ setCategory }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  const handleSuggestionClick = (category, subcategory) => {
    setSearch(`${subcategory}`);
    setCategory(`${category}/${subcategory}`);
    setTimeout(() => setShowSuggestions(false), 200);
  };
  const handleFocus = useCallback(() => {
    if (!search.trim()) {
      setSuggestions(() =>
        Object.entries(allCategories).map(([category, subcategories]) => ({
          category,
          subcategories,
        }))
      );
    }
    setShowSuggestions(true);
  }, [search]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (!value.trim()) {
      const allCategoriesArray = Object.entries(allCategories).map(
        ([category, subcategories]) => ({
          category,
          subcategories,
        })
      );

      setSuggestions(allCategoriesArray);
      setShowSuggestions(true);
      return;
    }

    if (value.trim()) {
      const filtered = Object.entries(allCategories)
        .map(([category, subcategories]) => ({
          category,
          subcategories: subcategories.filter((sub) =>
            sub.toLowerCase().includes(value.toLowerCase())
          ),
        }))
        .filter((item) => item.subcategories.length > 0);

      setSuggestions(filtered);

      setShowSuggestions(true);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className=" relative  ">
      <CustomInput
        type="text"
        placeholder="Select Vendor"
        className="outline-none   focus:ring-0 focus:ring-none bg-white  border-none  "
        aria-label="Select Vendor"
        value={search}
        onChange={handleSearchChange}
        onFocus={handleFocus}
        leftIcon={<GoSearch size={20} />}
      />

      {showSuggestions && suggestions.length > 0 && (
        <ul className=" absolute  bg-white border border-gray-300 w-full rounded shadow-lg mt-1 z-20 overflow-auto  max-h-[200px]">
          {suggestions.map(({ category, subcategories }) => (
            <li key={category} className="px-4 py-2  cursor-pointer">
              <ul className=" text-sm grid grid-cols-1  gap-2">
                {subcategories.map((sub, index) => (
                  <li
                    key={sub}
                    className="text-gray-700 hover:bg-gray-200 p-2 rounded-md"
                    onClick={() => handleSuggestionClick(category, sub)}
                  >
                    {sub}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
