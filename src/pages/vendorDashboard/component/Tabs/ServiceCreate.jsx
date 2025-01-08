import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useCreateServiceMutation,
  useUpdateServiceMutation,
} from "../../../../redux/serviceSlice";
import {
  brides,
  grooms,
  weddingVendors,
  weddingVenues,
  sectorTypes,
} from "../../../../static/static";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";

const ServiceCreate = ({ onClose, serviceData }) => {
  const [createServiceMutation, { isLoading: isCreating }] =
    useCreateServiceMutation();
  const [updateServiceMutation, { isLoading: isUpdating }] =
    useUpdateServiceMutation();

  const [serviceOptions, setServiceOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = async (data) => {
    
    
    try {
      const preparedData = {
        ...data,
        min_price: Number(data.min_price),
      };
      
      let res;
      if (serviceData) {
        
        res = await updateServiceMutation({
          preparedData,
          id: serviceData.id
          
        }).unwrap();
       
      
        toast.success(res.message);
      } else {
        // Create new service
        res = await createServiceMutation(preparedData).unwrap();
        if (res?.success) {
          
          navigate(`service-details/${res?.service?.id || serviceData?.id}`);
        }
      }
    } catch (error) {
      console.error(error);
      if (error?.data?.errors) {
        toast.error(error?.data?.errors[0]?.message || "Something went wrong!");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    // Prepopulate form if serviceData exists
    if (serviceData) {
      console.log(serviceData);
      
      const { service_name, description, min_price, service_type } =
        serviceData;
      setValue("service_name", service_name);
      setValue("description", description);
      setValue("min_price", min_price);
      setValue("service_type", service_type);

      setSelectedService(service_type);
    }
  }, [serviceData, setValue]);

  useEffect(() => {
    // Update service options based on selected sector
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
    setSelectedService("");
  }, [selectedCategory]);

  const handleServiceSelect = (event) => {
    const service = event.target.value;
    setSelectedService(service);
    setValue("service_type", service);
  };

  return (
    <div className="w-full p-6 bg-gradient-to-br from-slate-900 to-slate-600">
      <div className="bg-transparent p-8 max-w-4xl mx-auto rounded-lg shadow-lg bg-pink-200 bg-opacity-10 backdrop-blur-lg border border-gray-100">
        <h2 className="text-4xl font-bold text-center text-white mb-8">
          {serviceData ? "Update Service" : "Create Service"}
        </h2>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-gray-700 text-white rounded-full p-2 hover:bg-gray-600 transition"
        >
          <MdClose className="w-5 h-5" />
        </button>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Service Name Field */}
          <div>
            <label className="block text-lg font-medium text-white">
              Service Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("service_name", {
                required: "Service name is required",
              })}
              type="text"
              placeholder="Enter service name"
              className="mt-2 w-full px-4 py-3 bg-gray-800 text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              
            />
            {errors.service_name && (
              <span className="text-red-500 text-sm">
                {errors.service_name.message}
              </span>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-lg font-medium text-white">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Enter a brief description"
              className="mt-2 w-full px-4 py-3 bg-gray-800 text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.description && (
              <span className="text-red-500 text-sm">
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
                min={100}
                step="100"
                {...register("min_price", {
                  required: "Minimum price is required",
                  validate: (value) =>
                    value >= 100 || "Price must be greater than or equal to 100",
                })}
                className="w-full px-4 py-3 bg-gray-800 text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              />
              {errors.min_price && (
                <span className="text-red-500 text-sm">
                  {errors.min_price.message}
                </span>
              )}
            </div>

            {/* Service Category Field */}
            {!serviceData && (
              <div>
                <label className="block text-white mb-1">
                  Service Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                >
                  <option value="">Select a Category</option>
                  {sectorTypes.map((sector, index) => (
                    <option key={index} value={sector}>
                      {sector}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Service Type Field */}
          {!serviceData && serviceOptions.length > 0 && (
            <div>
              <label className="block text-lg font-medium text-white">
                Service Type
              </label>
              <select
                className="mt-2 w-full px-4 py-3 bg-gray-800 text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
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
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full max-w-xs bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-500 transition duration-300"
              disabled={isCreating || isUpdating}
            >
              {isCreating || isUpdating
                ? "Processing..."
                : serviceData
                ? "Update Service"
                : "Create Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceCreate;
