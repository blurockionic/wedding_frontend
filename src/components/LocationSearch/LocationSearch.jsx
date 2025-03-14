import React, { useState, useMemo, useCallback } from "react";
import { GoLocation } from "react-icons/go";
import CustomInput from "../global/inputfield/CustomInput";
import { useGetLocationQuery } from "../../redux/serviceSlice";

export default function LocationSearch({ setSearchLocation, customClass }) {
  const [location, setLocation] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { data: originalLocationData } = useGetLocationQuery();

  // Memoize filtered locations to optimize performance
  const filteredLocations = useMemo(() => {
    if (!location || !originalLocationData) return {};
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

  // Handle input changes efficiently
  const handleSearchLocationChange = useCallback(
    (e) => {
      const searchValue = e.target.value;
      setLocation(searchValue);
      setShowSuggestions(
        !!searchValue && Object.keys(filteredLocations).length > 0
      );
    },
    [filteredLocations]
  );

  // Handle location selection
  const handleLocationClick = useCallback(
    (state, city) => {
      setLocation(city);
      setSearchLocation(`${state}/${city}`);
      setShowSuggestions(false);
    },
    [setSearchLocation]
  );


  return (
    <div className="relative">
      <CustomInput
        type="text"
        value={location}
        placeholder="In Location"
        className={`w-full outline-none  focus:border-white  bg-white ${customClass}`}
        aria-label="Location"
        onChange={handleSearchLocationChange}
        leftIcon={<GoLocation size={20} />}
      />
      {showSuggestions && (
        <ul className="absolute bg-white border border-gray-300 rounded w-full shadow-lg mt-1 z-20 overflow-auto max-h-[200px]">
          {Object.entries(filteredLocations).map(([state, cities]) => (
            <li key={state} className="px-4 py-2  cursor-pointer">
              <ul className="text-sm grid grid-cols-1  gap-2">
                {cities.map((city, index) => (
                  <li
                    key={index}
                    className="text-gray-700 hover:bg-gray-200 p-2 rounded-md"
                    onClick={() => handleLocationClick(state, city)}
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
