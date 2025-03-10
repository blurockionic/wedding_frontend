import React, { memo, useState, useEffect, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { SelectField } from "./global/select/SelectField";
import RangeSlider from "./global/RangeSlider";
// import {
//   brides,
//   grooms,
//   weddingVendors,
//   weddingVenues,
// } from "../../src/static/static";
import { useNavigate, useLocation } from "react-router-dom";
import LocationSearch from "./LocationSearch/LocationSearch";

const Sidebar = memo(({ filters, onFilterChange }) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      city: filters?.city || "",
      state: filters?.state || "",
      minPrice: filters?.minPrice || "0",
      maxPrice: filters?.maxPrice || "1000",
      rating: filters?.rating || "",
      sort_by: filters?.sort_by || "",
      sort_order: filters?.sort_order || "",
      selectedService: filters?.selectedService || "",
    },
  });

  const navigate = useNavigate();
  const location = useLocation();

  const [selectedCategory, setSelectedCategory] = useState("");

  /** ✅ Fix 1: Memoize service options to avoid recalculation */
  // const serviceOptions = useMemo(() => {
  //   switch (selectedCategory) {
  //     case "Bride":
  //       return brides;
  //     case "Groom":
  //       return grooms;
  //     case "Wedding Vendor":
  //       return weddingVendors;
  //     case "Wedding Venue":
  //       return weddingVenues;
  //     default:
  //       return [];
  //   }
  // }, [selectedCategory]);

  useEffect(() => {
    if (selectedCategory) {
      setValue("selectedService", "");
    }
  }, [selectedCategory, setValue]);

  const setSearchLocation = useCallback(
    (selectedCity) => {
      if (!selectedCity) return;

      const [getSelectedState, getSelectedCity] = selectedCity.split("/");

      if (
        watch("city") === getSelectedCity &&
        watch("state") === getSelectedState
      ) {
        return; // Skip update if values are the same
      }

      setValue("city", getSelectedCity, { shouldDirty: true });
      setValue("state", getSelectedState, { shouldDirty: true });

      // Ensure correct path structure before updating

      console.log(location.pathname);

      const pathSegments = location.pathname.split("/");
      console.log(pathSegments);

      if (pathSegments.length >= 3) {
        pathSegments[5] = getSelectedCity.toLowerCase(); // Update city
        pathSegments[4] = getSelectedState.toLowerCase(); // Update state
      }

      pathSegments.splice(6);

      navigate(pathSegments.join("/"), { replace: true });
    },

    [setValue, navigate, location, watch]
  );

  const handleFilterChange = useCallback(
    (data) => {
      if (JSON.stringify(data) !== JSON.stringify(filters)) {
        onFilterChange(data);
      }
    },
    [onFilterChange, filters]
  );

  return (
    <div className="w-full p-4">
      <form onSubmit={handleSubmit(handleFilterChange)} className="space-y-4">
        <LocationSearch setSearchLocation={setSearchLocation} />

        {selectedCategory && (
          <SelectField
            id="selectedService"
            label="Service"
            value={watch("selectedService")}
            placeholder="Select Service"
            options={serviceOptions.map((service) => ({
              value: service,
              label: service,
            }))}
            register={register}
          />
        )}

        <div className="flex flex-col">
          <label className="text-gray-700 mb-2 font-medium">
            Price Range: {watch("minPrice")} - {watch("maxPrice")}
          </label>
          <RangeSlider
            start={[watch("minPrice"), watch("maxPrice")]}
            min={0}
            max={1000}
            onChange={(values) => {
              setValue("minPrice", values[0]);
              setValue("maxPrice", values[1]);
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[4, 3, 2, 1].map((value) => (
            <label
              key={value}
              className="flex items-center space-x-2 p-2 border rounded-lg shadow-sm hover:bg-gray-100"
            >
              <input
                type="radio"
                value={value}
                {...register("rating")}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 font-medium">{value} & above</span>
            </label>
          ))}
        </div>

        <SelectField
          id="sort_by"
          placeholder="Sort By"
          options={[
            { value: "created_at", label: "Newest" },
            { value: "min_price", label: "Lowest Price" },
            { value: "rating", label: "Rating" },
          ]}
          register={register}
        />

        <SelectField
          id="sort_order"
          placeholder="Sort Order"
          options={[
            { value: "asc", label: "Low to High" },
            { value: "desc", label: "High to Low" },
          ]}
          register={register}
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded"
          >
            Apply
          </button>
          <button
            type="button"
            onClick={() => {
              reset();
              onFilterChange({});
            }}
            className="w-full bg-gray-300 text-gray-700 py-2 rounded"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
});

export default Sidebar;
