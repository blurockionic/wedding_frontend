import React from "react";
import { useFormContext } from "react-hook-form";

const Step6 = () => {
  const { getValues } = useFormContext();

  const formData = getValues();
  console.log(formData);

  const renderServices = () => {
    if (formData.service_type) {
      return formData.service_type.join(", ");
    } else {
      return "No services selected";
    }
  };

  return (
    <div className=" p-8 rounded-lg ">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Step 5: Review & Submit</h2>

      <div className="grid grid-cols gap-8">
        {/* Personal Information Section */}
        <div className=" p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
          <h3 className="font-semibold text-lg mb-4 text-gray-700">Personal Information</h3>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-600">
              <span className="w-32 font-medium">Name:</span>
              <span className="ml-4">{formData.name}</span>
            </li>
            <li className="flex items-center text-gray-600">
              <span className="w-32 font-medium">Email:</span>
              <span className="ml-4">{formData.email}</span>
            </li>
          </ul>
        </div>

        {/* Business Details Section */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
          <h3 className="font-semibold text-lg mb-4 text-gray-700">Business Details</h3>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-600">
              <span className="w-32 font-medium">Business Name:</span>
              <span className="ml-4">{formData.business_name}</span>
            </li>
            <li className="flex items-center text-gray-600">
              <span className="w-32 font-medium">License Number:</span>
              <span className="ml-4">{formData.license_number}</span>
            </li>
            <li className="flex items-center text-gray-600">
              <span className="w-32 font-medium">Service Type:</span>
              <span className="ml-4">{renderServices()}</span>
            </li>
          </ul>
        </div>

        {/* Logo Preview Section */}
        {formData.logo_url && (
          <div className="col-span-full bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <h3 className="font-semibold text-lg mb-4 text-gray-700">Logo Preview</h3>
            <div className="flex justify-center">
              <img
                src={formData.logo_url?.path}
                alt="Logo"
                className="max-w-xs h-48 object-contain rounded-md"
              />
            </div>
          </div>
        )}
      </div>

      {/* Add more sections for other form data if necessary */}
    </div>
  );
};

export default Step6;
