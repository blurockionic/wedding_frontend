import React, { memo } from "react";
import { useForm } from "react-hook-form";
import { brides, grooms, weddingVendors, weddingVenues } from "../static/static";
import { InputField } from "./global/inputfield/InputField";
import { SelectField } from "./global/select/SelectField";

// Ensure categories exist and are valid strings
export const allCategories = [
  ...weddingVenues.map((venue) => venue?.name || venue),
  ...weddingVendors.map((vendor) => vendor?.name || vendor),
  ...brides.map((bride) => bride?.name || bride),
  ...grooms.map((groom) => groom?.name || groom),
];

const Sidebar = memo(({ searchType, searchLocation, onFilterChange }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: searchLocation || "",
      service_type: searchType || "",
    },
  });

  // Handle filter changes
  const handleFilterChange = (data) => {
    const filters = {};

    if (data.location) filters.location = data.location;
    if (data.service_type) filters.service_type = data.service_type;

    if (data.minPrice && !isNaN(data.minPrice)) {
      filters.minPrice = parseFloat(data.minPrice).toFixed(2);
    }
    if (data.maxPrice && !isNaN(data.maxPrice)) {
      filters.maxPrice = parseFloat(data.maxPrice).toFixed(2);
    }

    if (data.rating) filters.rating = data.rating;
    if (data.sort_by) filters.sort_by = data.sort_by;
    if (data.sort_order) filters.sort_order = data.sort_order;

    onFilterChange(filters);
  };

  return (
    <div className="w-full h-screen bg-muted p-4">
      <form onSubmit={handleSubmit(handleFilterChange)} className="space-y-5">
        
        {/* Location Filter */}
        <InputField
          id="location"
          type="text"
          label="Location"
          register={register}
          error={errors.location}
          placeholder="Enter location"
        />

        {/* Service Type Filter */}
        <SelectField
          id="service_type"
          label="Service Type"
          options={allCategories.map((type) => ({ value: type, label: type }))}
          register={register}
          error={errors.service_type}
          placeholder="All"
          customStyles="bg-primary text-white hover:bg-primary focus:bg-primary"
        />

        {/* Price Range */}
        <div className="flex space-x-4">
          <InputField
            id="minPrice"
            type="number"
            label="Min Price"
            register={register}
            error={errors.minPrice}
            placeholder="Min price"
          />
          <InputField
            id="maxPrice"
            type="number"
            label="Max Price"
            register={register}
            error={errors.maxPrice}
            placeholder="Max price"
          />
        </div>

        {/* Rating Filter */}
        <InputField
          id="rating"
          type="number"
          label="Rating"
          register={register}
          error={errors.rating}
          placeholder="Rating"
        />

        {/* Sort By */}
        <SelectField
          id="sort_by"
          label="Sort By"
          customStyles="bg-primary text-white hover:bg-primary focus:bg-primary"
          options={[
            { value: "created_at", label: "Newest First" },
            { value: "min_price", label: "Lowest Price First" },
            { value: "rating", label: "Rating" },
          ]}
          register={register}
          error={errors.sort_by}
          placeholder="Sort By"
        />

        {/* Sort Order */}
        <SelectField
          id="sort_order"
          label="Sort Order"
          options={[
            { value: "asc", label: "Low to High" },
            { value: "desc", label: "High to Low" },
          ]}
          register={register}
          error={errors.sort_order}
          placeholder="Sort Order"
        />

        {/* Buttons */}
        <div className="flex gap-2 justify-center items-center">
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
          >
            Apply Filters
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
