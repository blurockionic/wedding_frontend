import React from "react";
import { useForm } from "react-hook-form";
import {
  brides,
  grooms,
  weddingVendors,
  weddingVenues,
} from "../static/static";
import { InputField } from "./global/inputfield/InputField";
import { SelectField } from "./global/select/SelectField";

export const allCategories = [
  ...weddingVenues,
  ...weddingVendors,
  ...brides,
  ...grooms,
];

const Sidebar = React.memo(({ searchType, searchLocation, onFilterChange }) => {
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

  // Function to handle filter submission
  const handleFilterChange = (data) => {
    const filters = {};

    if (data.location) filters.location = data.location;
    if (data.service_type) filters.service_type = data.service_type;

    if (data.minPrice) filters.minPrice = `${parseFloat(data.minPrice)}`;
    if (data.maxPrice) filters.maxPrice = `${parseFloat(data.maxPrice)}`;

    if (data.rating) filters.rating = data.rating;
    if (data.sort_by) filters.sort_by = data.sort_by;
    if (data.sort_order) filters.sort_order = data.sort_order;

    // Pass the formatted filters to the parent for validation and processing
    onFilterChange(filters);
  };

  return (
    <div className="w-full h-screen bg-muted p-4 ">
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

        <SelectField
          id="service_type"
          label="Service Type"
          options={[
            ...allCategories.map((type) => ({ value: type, label: type })),
          ]}
          register={register}
          error={errors.service_type}
          placeholder="All"
          customStyles="bg-primary text-white hover:bg-primary focus:bg-primary"
        />

        {/* Price Range Filter */}
        <div className=" flex space-x-4">
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

        <SelectField
          id="sort_by"
          label="Sort By"
          customStyles={
            "bg-primary text-white hover:bg-primary focus:bg-primary"
          }
          options={[
            { value: "created_at", label: "Newest First" },
            { value: "min_price", label: "Lowest Price First" },
            { value: "rating", label: "Rating" },
          ]}
          register={register}
          error={errors.sort_by}
          placeholder="Sort By"
        />

        <SelectField
          label={"Sort Order"}
          id="sort_order"
          options={[
            { value: "asc", label: "Low to High" },
            { value: "desc", label: "High to Low" },
          ]}
          register={register}
          error={errors.sort_order}
          placeholder="Sort Order"
        />

        {/* Filter and Reset Buttons */}
        <div className=" gap-2 justify-center items-center flex ">
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
            className="w-full  bg-gray-300 text-gray-700 py-2 rounded"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
});

export default Sidebar;
