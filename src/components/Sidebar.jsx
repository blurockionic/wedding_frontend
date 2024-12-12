import React from "react";
import { useForm } from "react-hook-form";
import { serviceTypes } from "../assets/NavabarRouteConfig";  // Assuming your serviceTypes are imported here


function Sidebar({ onFilterChange }) {
  const { register, handleSubmit, reset } = useForm();

  // Function to handle filter submission
  const handleFilterChange = (data) => {
    // Pass the data to the parent (onFilterChange) for validation and processing
    onFilterChange(data);
  };

  return (
    <div className="w-full  h-screen bg-ivory-dark p-4">
      <h2 className="text-lg font-bold mb-4">Filters</h2>
      <form onSubmit={handleSubmit(handleFilterChange)} className="space-y-4">
        {/* Vendor Name Filter */}
        <div>
          <label className="block text-gray-700 mb-1">Vendor Name</label>
          <input
            type="text"
            {...register("vendor_name")}
            placeholder="Vendor Name"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Service Type Filter */}
        <div>
          <label className="block text-gray-700 mb-1">Service Type</label>
          <select
            {...register("service_type")}
            className="w-full p-2 border rounded"
          >
            <option value="">All</option>
            {serviceTypes.map((type) => (
              <option className="" key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-gray-700 mb-1">Price Range</label>
          <div className="flex space-x-2">
            <input
              type="number"
              {...register("minPrice")}
              placeholder="Min"
              className="w-1/2 p-2 border rounded"
            />
            <input
              type="number"
              {...register("maxPrice")}
              placeholder="Max"
              className="w-1/2 p-2 border rounded"
            />
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-gray-700 mb-1">Rating</label>
          <input
            type="number"
            {...register("rating")}
            placeholder="Rating"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Sorting Options */}
        <div>
          <label className="block text-gray-700 mb-1">Sort By</label>
          <select {...register("sort_by")} className="w-full p-2 border rounded">
            <option value="created_at">Created At</option>
            <option value="min_price">Min Price</option>
            <option value="rating">Rating</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Sort Order</label>
          <select {...register("sort_order")} className="w-full p-2 border rounded">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {/* Filter and Reset Buttons */}
        <div className="space-y-4 mt-4">
          <button
            type="submit"
            className="w-full bg-blushPink text-white py-2 rounded"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={() => {
              reset();  // Reset the form fields
              onFilterChange({});  // Optionally reset the parent filter state as well
            }}
            className="w-full bg-gray-300 text-gray-700 py-2 rounded"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default Sidebar;
