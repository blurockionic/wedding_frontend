import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { GoLocation } from "react-icons/go";
import CustomInput from "../global/inputfield/CustomInput";
import { useGetLocationQuery } from "../../redux/serviceSlice";

export default function LocationSearch({ setSearchLocation, customClass }) {
  const [location, setLocation] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dropdownRef = useRef(null); // Ref to track dropdown clicks

  const { data: originalLocationData } = useGetLocationQuery();
  const locationData = useMemo(
    () => originalLocationData ?? {},
    [originalLocationData]
  );

  // Memoize filtered locations
  const filteredLocations = useMemo(() => {
    if (!originalLocationData) return {};
    if (!location.trim()) return originalLocationData;

    return Object.entries(originalLocationData).reduce(
      (acc, [state, cities]) => {
        const filteredCities = cities.filter((city) =>
          city.toLowerCase().startsWith(location.toLowerCase())
        );
        if (filteredCities.length > 0) acc[state] = filteredCities;
        return acc;
      },
      {}
    );
  }, [location, originalLocationData]);

  // Handle input focus
  const handleFocus = useCallback(() => {
    setShowSuggestions(true);
  }, [filteredLocations]);

  // Handle input change
  const handleSearchLocationChange = useCallback((e) => {
    const searchValue = e.target.value;
    setLocation(searchValue);
    setShowSuggestions(true);
  }, []);

  // Handle location selection
  const handleLocationClick = useCallback(
    (state, city) => {
      setLocation(city);
      setSearchLocation(`${state}/${city}`);
      setShowSuggestions(false);
    },
    [setSearchLocation]
  );

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
    <div className="relative " ref={dropdownRef}>
      <CustomInput
        type="text"
        value={location}
        placeholder="In Location"
        className={`w-full outline-none focus:border-white  ${customClass}`}
        aria-label="Location"
        onChange={handleSearchLocationChange}
        onFocus={handleFocus}
        leftIcon={<GoLocation size={20} />}
      />
      {showSuggestions && Object.keys(filteredLocations || {}).length > 0 && (
        <ul className="absolute bg-white border border-gray-300 rounded z-50 w-full shadow-lg mt-1 overflow-auto max-h-[200px]">
          {Object.entries(filteredLocations).map(([state, cities]) => (
            <li key={state} className="px-4 py-2 cursor-pointer">
              <ul className="text-sm grid grid-cols-1 gap-2">
                {cities.map((city, index) => (
                  <li
                    key={index}
                    className="text-gray-700 capitalize hover:bg-gray-200 p-2 rounded-md"
                    onMouseDown={() => handleLocationClick(state, city)} // Prevents dropdown from closing too early
                  >
                    {city}
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
