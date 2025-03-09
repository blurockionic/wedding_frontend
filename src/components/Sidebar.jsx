import React, { memo, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { SelectField } from "./global/select/SelectField";

import RangeSlider from "./global/RangeSlider";
import {
  brides,
  grooms,
  weddingVendors,
  weddingVenues,
} from "../../src/static/static";


const Sidebar = memo(({ state, city, onFilterChange }) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      city,
      state,
      minPrice: "0",
      maxPrice: "1000",
      rating: "",
      sort_by: "",
      sort_order: "",
      selectedService: "",
    },
  });

  const [serviceOptions, setServiceOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    switch (selectedCategory) {
      case "Bride":
        setServiceOptions(brides);
        break;
      case "Groom":
        setServiceOptions(grooms);
        break;
      case "Wedding Vendor":
        setServiceOptions(weddingVendors);
        break;
      case "Wedding Venue":
        setServiceOptions(weddingVenues);
        break;
      default:
        setServiceOptions([]);
    }
    setValue("selectedService", "");
  }, [selectedCategory]);

  const handleFilterChange = (data) => {
    const filters = {};
    [
      "city",
      "state",
      "rating",
      "selectedService",
      "sort_by",
      "sort_order",
    ].forEach((key) => {
      if (data[key]) filters[key] = data[key];
    });
    ["minPrice", "maxPrice"].forEach((key) => {
      const value = parseFloat(data[key]);
      if (!isNaN(value)) filters[key] = value.toFixed(2);
    });
    onFilterChange(filters);
  };

  return (
    <div className="w-full p-4">
      <form onSubmit={handleSubmit(handleFilterChange)} className="space-y-4">
        {selectedCategory && (
          <SelectField
            id="selectedService"
            label="service"
            value={watch("selectedService")}
            placeholder={"select service"}
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
