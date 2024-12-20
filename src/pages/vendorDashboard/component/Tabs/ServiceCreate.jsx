import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateServiceMutation } from "../../../../redux/serviceSlice";
import {
  brides,
  grooms,
  weddingVendors,
  weddingVenues,
  sectorTypes,
} from "../../../../static/static";

const ServiceCreate = ({ onServiceCreated }) => {
  const [createServiceMutation, { isLoading }] = useCreateServiceMutation();
  const [serviceOptions, setServiceOptions] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [selectedSector, setSelectedSector] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // Handling form submission
  const onSubmit = (data) => {
    createServiceMutation({
      ...data,
      service: selectedService,
      sector: selectedSector,
    });

    console.log(data);
    onServiceCreated(data.id);
  };

  useEffect(() => {
    // Update service options based on selected sector
    switch (selectedSector) {
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
    setSelectedService("");
  }, [selectedSector]);

  const handleServiceSelect = (event) => {
    const service = event.target.value;
    console.log(service);
    setSelectedService(service);
    setValue("service_type", service);
  };

  return (
    <div className="h-fit w-full bg-gradient-to-br  to-slate-600 from-slate-900 py-8">
      <div
        className="bg-transparent  h-full p-4 py-6 bg-pink-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100
 px-8 w-full max-w-4xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-6 text-white">Create Service</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Service Name Field */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-white">
              Service Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("service_name", {
                required: "Service name is required",
              })}
              type="text"
              placeholder="Enter service name"
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dustyRose-light"
            />
            {errors.service_name && (
              <span className="text-red-500 text-sm mt-1">
                {errors.service_name.message}
              </span>
            )}
          </div>

          {/* Description Field */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-white">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Enter a brief description"
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dustyRose-light"
            />
            {errors.description && (
              <span className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Min Price Field */}
            <div>
              <label htmlFor="min_price" className="block text-white mb-1">
                Min Price
              </label>
              <input
                id="min_price"
                type="number"
                step="0.01"
                {...register("min_price", {
                  required: "Minimum price is required",
                  validate: (value) =>
                    value >= 0 || "Price must be greater than or equal to 0",
                })}
                className="w-full border px-3 py-2 rounded-lg"
              />
              {errors.min_price && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.min_price.message}
                </span>
              )}
            </div>

            {/* Service Category Field */}
            <div>
              <label className="block text-white mb-1">Service Category</label>
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="w-full border px-3 py-2 rounded-lg"
              >
                <option value="">Select a Category</option>
                {sectorTypes.map((sector, index) => (
                  <option key={index} value={sector}>
                    {sector}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {serviceOptions.length > 0 && (
            <div className="mb-6">
              <label className="block text-lg font-medium text-white">
                Service Type
              </label>
              <select
                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dustyRose-light"
                value={selectedService}
                onChange={handleServiceSelect}
              >
                <option value="">Select a Service</option>
                {serviceOptions.map((service, index) => (
                  <option key={index} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-500 transition"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Service"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceCreate;
