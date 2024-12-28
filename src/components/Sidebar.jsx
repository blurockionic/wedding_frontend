import React from "react";
import { useForm } from "react-hook-form";
import { brides, grooms, weddingVendors, weddingVenues } from "../static/static";

export const allCategories = [
  ...weddingVenues,
  ...weddingVendors,
  ...brides,
  ...grooms,
];
const Sidebar = React.memo(({ searchType, searchLocation, onFilterChange }) => {
  const { register, handleSubmit, reset } = useForm({
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
    <div className="w-full h-screen bg-slate-700 p-4">
      <form onSubmit={handleSubmit(handleFilterChange)} className="space-y-5">
        {/* Location Filter */}
        <div className="relative">
          <label className="block text-gray-500 mb-1">Location</label>
          <input
            type="text"
            {...register("location")}
            placeholder="Enter location"
            className="w-full p-2 border rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Service Type Filter */}
        <div className="relative">
          <label className="block text-gray-500 mb-1">Service Type</label>
          <select
            {...register("service_type")}
            className="w-full p-2 border rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            {allCategories.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="relative flex space-x-4">
          <div className="flex-1">
            <label className="block text-gray-500 mb-1">Min Price</label>
            <input
              type="number"
              {...register("minPrice")}
              placeholder="Min price"
              className="w-full p-2 border bg-white rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-500 mb-1">Max Price</label>
            <input
              type="number"
              {...register("maxPrice")}
              placeholder="Max price"
              className="w-full p-2 border bg-white rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Rating Filter */}
        <div className="relative">
          <label className="block text-gray-500 mb-1">Rating</label>
          <input
            type="number"
            {...register("rating")}
            placeholder="Rating"
            className="w-full p-2 border rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Sorting Options */}
        <div className="relative">
          <label className="block text-gray-500 mb-1">Sort By</label>
          <select
            {...register("sort_by")}
            className="w-full p-2 border rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="created_at">Newest First</option>
            <option value="min_price">Lowest Price First</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        <div className="relative">
          <label className="block text-gray-500 mb-1">Sort Order</label>
          <select
            {...register("sort_order")}
            className="w-full p-2 border rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>

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
