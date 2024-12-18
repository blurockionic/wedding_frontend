import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Country, State, City } from "country-state-city";

const Step3 = () => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();
  const [states, setStates] = React.useState([]);
  const [cities, setCities] = React.useState([]);
  const [selectedStateCode, setSelectedStateCode] = React.useState("");

  // Fetch all states of India on initial load
  useEffect(() => {
    const india = Country.getCountryByCode("IN");
    if (india) {
      setStates(State.getStatesOfCountry(india.isoCode));
    }
  }, []);

  // Fetch cities when a state is selected
  useEffect(() => {
    if (selectedStateCode) {
      const cityList = City.getCitiesOfState("IN", selectedStateCode);
      setCities(cityList);
    }
  }, [selectedStateCode, setValue]);

  // Watch selected fields
  const state = watch("state");

  // Handle city selection and set address data into React Hook Form
  const handleCityChange = (e) => {
    const selectedCityName = e.target.value.toLowerCase(); 
    const selectedCity = cities.find((c) => c.name.toLowerCase() === selectedCityName);
  
    if (selectedCity) {
      setValue("country", "india"); 
      setValue("city", selectedCity.name.toLowerCase())
      setValue("latitude", String(selectedCity.latitude || "").toLowerCase());
      setValue("longitude", String(selectedCity.longitude || "").toLowerCase()); 
      setValue("state", String(state).toLowerCase()); 
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Business Details
      </h2>

      {/* State Selection */}
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700">
          State <span className="text-red-500">*</span>
        </label>
        <select
          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dustyRose-light"
          onChange={(e) => setSelectedStateCode(e.target.value)}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state.isoCode} value={state.isoCode}>
              {state.name}
            </option>
          ))}
        </select>
        {errors.state && (
          <span className="text-red-500 text-sm mt-1">
            {errors.state.message}
          </span>
        )}
      </div>

      {/* City Selection */}
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700">
          City <span className="text-red-500">*</span>
        </label>
        <select
          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dustyRose-light"
          onChange={handleCityChange}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
        {errors.city && (
          <span className="text-red-500 text-sm mt-1">
            {errors.city.message}
          </span>
        )}
      </div>

      {/* License Number Field */}
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700">
          License Number
        </label>
        <input
          type="text"
          {...register("license_number")}
          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dustyRose-light"
        />
      </div>
    </div>
  );
};

export default Step3;
