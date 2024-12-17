import React from "react";
import { useFormContext } from "react-hook-form";

const Step5 = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Location & Social Media</h2>

      {/* Social Media Section */}
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700">
          Facebook URL (Optional)
        </label>
        <input
          type="url"
          {...register("social_networks.facebook", {
            pattern: {
              value: /^(https?:\/\/)?(www\.)?facebook\.com\/[A-Za-z0-9\-._~:/?#[\]@!$&'()*+,;=.]+$/,
              message: "Invalid Facebook URL"
            }
          })}
          placeholder="https://www.facebook.com/your-page (Optional)"
          className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dustyRose-light"
        />
        {errors.social_networks?.facebook && (
          <span className="text-red-500 text-sm mt-1">{errors.social_networks?.facebook.message}</span>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700">
          Instagram URL (Optional)
        </label>
        <input
          type="url"
          {...register("social_networks.instagram", {
            pattern: {
              value: /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9\-._~:/?#[\]@!$&'()*+,;=.]+$/,
              message: "Invalid Instagram URL"
            }
          })}
          placeholder="https://www.instagram.com/your-profile (Optional)"
          className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dustyRose-light"
        />
        {errors.social_networks?.instagram && (
          <span className="text-red-500 text-sm mt-1">{errors.social_networks?.instagram.message}</span>
        )}
      </div>
    </div>
  );
};

export default Step5;
