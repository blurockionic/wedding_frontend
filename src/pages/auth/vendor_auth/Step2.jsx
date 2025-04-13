import React, { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import {
  brides,
  grooms,
  weddingVendors,
  weddingVenues,
  sectorTypes,
} from "../../../static/static";
import { InputField } from "../../../components/global/inputfield/InputField";
import { GoPerson } from "react-icons/go";

const Step2 = () => {
  const [serviceOptions, setServiceOptions] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const {
    register,
    formState: { errors },
    setValue,
    control,
  } = useFormContext();

  // Watch the value of business_category
  const selectedCategory = useWatch({ control, name: "business_category" });

  // Update the service options whenever the business category changes
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
    setSelectedServices([]);
  }, [selectedCategory]);

  // Handle the selection or deselection of a service
  const handleServiceSelect = (service) => {
    setSelectedServices(
      (prevServices) =>
        prevServices.includes(service)
          ? prevServices.filter((s) => s !== service) // Deselect if already selected
          : [...prevServices, service] // Add to selected if not selected
    );
  };

  // Update the "service_type" in the form context whenever selectedServices changes
  useEffect(() => {
    setValue("service_type", selectedServices);
  }, [selectedServices, setValue]);

  return (
    <div className="bg-white rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Business Information
      </h2>

      {/* Business Name Field */}
      

      <InputField
        label={"business_name"}
        type="text"
        placeholder="Enter Business Name"
        id="business_name"
        icon={<GoPerson size={19} className="text-primary" />} // Corrected icon
        register={() => register("business_name", { required: "business_name is required" })}
        error={errors.business_name}
      />

      {/* Business Category Field */}
      <div className="mb-6">
        <label className="block  text-muted-foreground text-sm font-semibold mb-2">
          Service Category <span className="text-red-500">*</span>
        </label>
        <select
          {...register("business_category", {
            required: "Business category is required",
          })}
          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dustyRose-light"
        >
          <option value="">Select a Category</option>
          {sectorTypes.map((sector, index) => (
            <option key={index} value={sector}>
              {sector}
            </option>
          ))}
        </select>
        {errors.business_category && (
          <span className="text-red-500 text-sm mt-1">
            {errors.business_category.message}
          </span>
        )}
      </div>

      {/* Service Type Field */}
      {serviceOptions.length > 0 && (
        <div className="mb-6">
          <label className="block  text-muted-foreground text-sm font-semibold mb-2">
            Service Type
          </label>
          <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {serviceOptions.map((service, index) => (
              <div
                key={index}
                className={`flex items-center cursor-pointer rounded-md py-2 px-1 text-gray-700 ${
                  selectedServices.includes(service)
                    ? "bg-slate-600 text-white hover:bg-slate-500"
                    : "border border-gray-300 hover:bg-gray-100"
                }`}
                onClick={() => handleServiceSelect(service)}
              >
                <span className="text-center w-full">{service}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Description Field */}
      <div className="mb-6">
        <label className="block  text-muted-foreground text-sm font-semibold ">
          Description
        </label>
        <textarea
          rows={5}
          {...register("description")}
          placeholder="Enter a brief description of your business"
          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dustyRose-light"
        />
        {errors.description && (
          <span className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default Step2;
