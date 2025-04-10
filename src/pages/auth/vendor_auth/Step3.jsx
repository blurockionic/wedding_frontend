import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Country, State, City } from "country-state-city";

const Step3 = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedStateCode, setSelectedStateCode] = useState("");

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
    } else {
      setCities([]); // Clear cities if no state is selected
    }
  }, [selectedStateCode]);

  const handleCityChange = (e) => {
    const selectedCityName = e.target.value.toLowerCase();
    const selectedCity = cities.find((c) => c.name.toLowerCase() === selectedCityName);

    if (selectedCity) {
      const selectedState = states.find(s => s.isoCode === selectedStateCode);
      setValue("country", "india");
      setValue("city", selectedCity.name.toLowerCase());
      setValue("latitude", String(selectedCity.latitude || "").toLowerCase());
      setValue("longitude", String(selectedCity.longitude || "").toLowerCase());
      setValue("state", selectedState?.name?.toLowerCase() || ""); // Set state name, handle undefined
    }
  };

  return (
    <div className="bg-white rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Business Details
      </h2>

      <div className="mb-6">
        <label className="block  text-muted-foreground text-sm font-semibold ">
          State <span className="text-red-500">*</span>
        </label>
        <select
          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dustyRose-light"
          onChange={(e) => {
            setSelectedStateCode(e.target.value);
            const selectedState = states.find(s => s.isoCode === e.target.value);
            setValue("state", selectedState?.name?.toLowerCase() || ""); // Set state name immediately
          }}
          value={selectedStateCode} // Important: Add this to control the select
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

      <div className="mb-6">
        <label className="block  text-muted-foreground text-sm font-semibold ">
          City <span className="text-red-500">*</span>
        </label>
        <select
          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dustyRose-light"
          onChange={handleCityChange}
          value={cities.find(c => c.name.toLowerCase() === watch("city"))?.name || ""} // Control city select
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

      <div className="mb-6">
        <label className="block  text-muted-foreground text-sm font-semibold ">
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