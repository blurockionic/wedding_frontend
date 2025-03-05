import React, { memo } from "react";
import { useForm } from "react-hook-form";
import { InputField } from "./global/inputfield/InputField";
import { SelectField } from "./global/select/SelectField";

const Sidebar = memo(({ state, city, onFilterChange }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      city: city || "",
      state: state || "",
      minPrice: "",
      maxPrice: "",
      rating: "",
      sort_by: "",
      sort_order: "",
    },
  });

  const handleFilterChange = (data) => {
    const filters = {};

    if (data.city) filters.city = data.city;
    if (data.state) filters.state = data.state;

    const minPrice = parseFloat(data.minPrice);
    const maxPrice = parseFloat(data.maxPrice);

    if (!isNaN(minPrice)) filters.minPrice = minPrice.toFixed(2);
    if (!isNaN(maxPrice)) filters.maxPrice = maxPrice.toFixed(2);

    if (data.rating) filters.rating = data.rating;
    if (data.sort_by) filters.sort_by = data.sort_by;
    if (data.sort_order) filters.sort_order = data.sort_order;

    onFilterChange(filters);
  };

  return (
    <div className="w-full p-4">
      <form onSubmit={handleSubmit(handleFilterChange)} className="space-y-5">
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
          placeholder="Rating (1-5)"
        />

        {/* Sort By */}
        <SelectField
          id="sort_by"
          label="Sort By"
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
