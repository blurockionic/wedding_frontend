import React from "react";
import { useForm } from "react-hook-form";

const OverviewTab = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="overview-tab space-y-6 bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto"
    >
      {/* Service Name */}
      <div>
        <label htmlFor="serviceName" className="block text-sm font-medium text-gray-700">
          Service Name
        </label>
        <input
          {...register("serviceName", { required: "Service Name is required" })}
          id="serviceName"
          placeholder="Enter service name"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.serviceName && (
          <p className="mt-1 text-sm text-red-600">{errors.serviceName.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          {...register("description", { required: "Description is required" })}
          id="description"
          placeholder="Enter description"
          rows="4"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      {/* Service Type */}
      <div>
        <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">
          Service Type
        </label>
        <select
          {...register("serviceType")}
          id="serviceType"
          className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="Photography">Photography</option>
          <option value="Catering">Catering</option>
        </select>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default OverviewTab;
