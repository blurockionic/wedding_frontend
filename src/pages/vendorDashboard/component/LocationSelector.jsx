import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";

const LocationSelector = ({ setValue, errors }) => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedStateCode, setSelectedStateCode] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const india = Country.getCountryByCode("IN");
    if (india) {
      setStates(State.getStatesOfCountry(india.isoCode));
    }
  }, []);

  useEffect(() => {
    if (selectedStateCode) {
      const cityList = City.getCitiesOfState("IN", selectedStateCode);
      setCities(cityList);
      setSelectedCity(""); // reset selected city
      setValue("city", ""); // reset in form
    } else {
      setCities([]);
      setSelectedCity(""); // reset selected city
      setValue("city", ""); // reset in form
    }
  }, [selectedStateCode, setValue]);

  const handleStateChange = (e) => {
    const selectedCode = e.target.value;
    setSelectedStateCode(selectedCode);
  
    const selectedState = states.find((state) => state.isoCode === selectedCode);
    const stateName = selectedState ? selectedState.name : "";
  
    setValue("state", stateName);
  };

  const handleCityChange = (e) => {
    const newCity = e.target.value;
    setSelectedCity(newCity);
    setValue("city", newCity);
  };

  return (
    <div className="flex justify-center flex-col md:flex-row items-center gap-5">
      {/* State Dropdown */}
      <div className="mb-6 w-full">
        <label className="block text-muted-foreground text-sm font-semibold mb-2">
          State <span className="text-red-500">*</span>
        </label>
        <select
          className="w-full placeholder:text-sm px-4 bg-white text-foreground border-border focus:ring-ring focus:outline-none rounded"
          value={selectedStateCode}
          onChange={handleStateChange}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state.isoCode} value={state.isoCode}>
              {state.name}
            </option>
          ))}
        </select>
        {errors?.state && (
          <span className="text-red-500 text-sm mt-1">
            {errors.state.message}
          </span>
        )}
      </div>

      {/* City Dropdown */}
      <div className="w-full mb-6">
        <label className="block text-muted-foreground text-sm font-semibold mb-2">
          City <span className="text-red-500">*</span>
        </label>
        <select
          className="w-full placeholder:text-sm px-4 bg-white text-foreground border-border focus:ring-ring focus:outline-none rounded"
          value={selectedCity}
          onChange={handleCityChange}
          disabled={!selectedStateCode}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
        {errors?.city && (
          <span className="text-red-500 text-sm mt-1">
            {errors.city.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default LocationSelector;
