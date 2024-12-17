import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

const Step3 = () => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Business Details
      </h2>

      {/* License Number Field */}

      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700">
          Business Location City <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("location", { required: "Location is required" })}
          placeholder="Enter City Name e.g., Varanasi, Delhi, Ranchi"
          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dustyRose-light"
        />
        {errors.location && (
          <span className="text-red-500 text-sm mt-1">
            {errors.location.message}
          </span>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700">
          License Number
        </label>
        <input
          type="text"
          {...register("license_number")}
          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dustyRose-light"
        />
        {errors.license_number && (
          <span className="text-red-500 text-sm mt-1">
            {errors.license_number.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default Step3;
