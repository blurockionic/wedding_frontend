import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useCreateServiceMutation,
  useGenerateAIDescriptionMutation,
  useUpdateServiceMutation,
} from "../../../../redux/serviceSlice";
import {
  brides,
  grooms,
  weddingVendors,
  weddingVenues,
  sectorTypes,
  servicesUnit,
} from "../../../../static/static";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";

import { z } from "zod"; // Using Zod for validation

import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../../../../components/global/inputfield/InputField";
import CustomText from "../../../../components/global/text/CustomText";
import { Country, State, City } from "country-state-city";

// Zod validation schema for form
export const serviceValidate = z.object({
  service_name: z.string().nonempty("Service name is required"),
  description: z.string().nonempty("Description is required"),
  min_price: z.string(),
  service_type: z.string().optional(),
  service_category: z.string().optional(),
  service_unit: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
});

const ServiceCreate = ({ onClose, serviceData }) => {
  const [createServiceMutation, { isLoading: isCreating }] =
    useCreateServiceMutation();
  const [updateServiceMutation, { isLoading: isUpdating }] =
    useUpdateServiceMutation();
  const [
    generateAIDescription,
    { data, isLoading: isGenerating, isError, error },
  ] = useGenerateAIDescriptionMutation();

  const [serviceOptions, setServiceOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm({
    resolver: zodResolver(serviceValidate),
  });

  const [states, setStates] = React.useState([]);
  const [cities, setCities] = React.useState([]);
  const [selectedStateCode, setSelectedStateCode] = React.useState("");

  useEffect(() => {
    const india = Country.getCountryByCode("IN");
    if (india) {
      setStates(State.getStatesOfCountry(india.isoCode));
    }
  }, []);

  useEffect(() => {
    if (selectedStateCode) {
      const cityList = City.getCitiesOfState("IN", selectedStateCode);
      setCities(cityList);
    } else {
      setCities([]);
    }
  }, [selectedStateCode]);

  const handleCityChange = (e) => {
    const selectedCityName = e.target.value.toLowerCase();
    const selectedCity = cities.find(
      (c) => c.name.toLowerCase() === selectedCityName
    );

    if (selectedCity) {
      const selectedState = states.find((s) => s.isoCode === selectedStateCode);
      setValue("country", "india");
      setValue("city", selectedCity.name.toLowerCase());
      setValue("latitude", String(selectedCity.latitude || "").toLowerCase());
      setValue("longitude", String(selectedCity.longitude || "").toLowerCase());
      setValue("state", selectedState?.name?.toLowerCase() || "");
    }
  };

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
          id: serviceData.id,
        }).unwrap();

        toast.success(res.message);
        onClose();
      } else {
        // Create new service
        res = await createServiceMutation(preparedData).unwrap();
        if (res?.success) {
          navigate(`service-details/${res?.service?.id || serviceData?.id}`);
        }
      }
    } catch (error) {
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

  const handleUnitSelect = (event) => {
    const unit = event.target.value;
    setSelectedUnit(unit);
    setValue("service_unit", unit);
  };

  const handleAIDescription = async () => {
    const dataFromUseForm = getValues();

    const initialData = {
      service_name: dataFromUseForm.service_name,
      min_price: dataFromUseForm.min_price,
      service_type: dataFromUseForm.service_type,
      service_category: dataFromUseForm?.service_category || "",
      description: dataFromUseForm.description || "",
      service_unit: dataFromUseForm.service_unit || serviceData?.service_unit,
    };
    if (
      !serviceData &&
      (!initialData.service_name ||
        !initialData.min_price ||
        !initialData.service_type ||
        !initialData.service_unit)
    ) {
      toast.error(
        "Missing required data: service_name, min_price, or service_type."
      );
      return;
    }
    try {
      const res = await generateAIDescription(initialData).unwrap();

      setValue("description", res.generatedDescription);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e);
    setValue("service_category", e);
  };

  return (
    <>
      <div className="bg-transparent relative p-8  mx-auto rounded-lg shadow-lg  border border-ring">
        <button
          onClick={onClose}
          className=" absolute right-10 bg-primary text-background rounded-full p-2 hover:bg-gray-600 transition"
        >
          <MdClose className="w-5 h-5" />
        </button>

        <h2 className="text-4xl font-bold text-center text-foreground mb-8">
          {serviceData ? "Update Service" : "Create Service"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputField
            id="service_name"
            type="text"
            label="Service Name"
            placeholder="Enter Service Name"
            register={register}
            error={errors.service_name}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Service Category Field */}
            {!serviceData && (
              <div>
                <label className="block text-foreground mb-1">
                  Service Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full px-4 py-3 bg-secondary text-foreground border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-ring"
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

            {!serviceData && serviceOptions.length > 0 && (
              <div>
                <label className="block text-foreground mb-1">
                  Service Type
                </label>
                <select
                  className=" w-full px-4 py-3 bg-secondary text-foreground border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-ring"
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

            {selectedService && (
              <div>
                <label className="block text-lg font-medium text-foreground">
                  unit type
                </label>
                <select
                  className="mt-2 w-full px-4 py-3 bg-secondary text-foreground border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-ring"
                  value={selectedUnit}
                  onChange={handleUnitSelect}
                >
                  <option value="">Select unit type</option>
                  {servicesUnit[selectedService].map((service, index) => (
                    <option key={index} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <InputField
              id="min_price"
              type="text"
              label={`Min Price${selectedUnit ? ` (${selectedUnit})` : ""}`}
              register={register}
              error={errors.min_price}
              placeholder="min_price"
            />
          </div>

          <div className="flex justify-center flex-col md:flex-row items-center gap-5">
            <div className="mb-6 w-full">
              <label className="block text-lg font-medium text-gray-700">
                State <span className="text-red-500">*</span>
              </label>
              <select
                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dustyRose-light"
                onChange={(e) => {
                  setSelectedStateCode(e.target.value);
                  const selectedState = states.find(
                    (s) => s.isoCode === e.target.value
                  );
                  setValue("state", selectedState?.name?.toLowerCase() || ""); // Set state name immediately
                }}
                value={selectedStateCode} // Important: Add this to control the select
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </select>
              {errors.state && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.state.message}
                </span>
              )}
            </div>

            <div className="w-full mb-6">
              <label className="block text-lg font-medium text-gray-700">
                City <span className="text-red-500">*</span>
              </label>
              <select
                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dustyRose-light"
                onChange={handleCityChange}
                value={
                  cities.find((c) => c.name.toLowerCase() === watch("city"))
                    ?.name || ""
                } // Control city select
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
              {errors.city && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.city.message}
                </span>
              )}
            </div>
          </div>

          {/* Service Type Field */}

          <div className="relative ">
            <label className="block font-montserrat text-muted-foreground text-sm font-bold mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={12}
              {...register("description")}
              placeholder="Enter a brief description"
              className="py-2  h-15 w-full border border-border focus:ring-ring focus:outline-none rounded"
            />
            {errors.description && (
              <CustomText
                variant="error"
                className="text-destructive mt-1 font-montserrat text-xs"
              >
                {errors.description.message}
              </CustomText>
            )}
            <button
              type="button"
              onClick={handleAIDescription}
              className="mt-2 py-2 absolute right-4 bottom-4 px-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all ease-in-out"
              disabled={isGenerating}
            >
              {isGenerating ? "Generating..." : "Gen AI"}
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full max-w-xs bg-primary text-background font-semibold py-3 rounded-lg hover:bg-pink-700 transition duration-300"
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
    </>
  );
};

export default ServiceCreate;
