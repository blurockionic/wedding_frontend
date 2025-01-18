import React from "react";
import { useFormContext } from "react-hook-form";
import { Facebook, Instagram } from "lucide-react";

const Step5 = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="bg-white p-8 rounded-lg">
      <h2 className="text-2xl font-semibold mb-8 text-[#1a1a1a]">
        Social Media Profiles
      </h2>

      <div className="space-y-6">
        {/* Facebook URL Field */}
        <div className="space-y-2">
          <label className="block text-base font-medium text-[#262626]">
            Facebook URL (Optional)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Facebook className="h-5 w-5 text-[#666666]" />
            </div>
            <input
              type="url"
              {...register("social_networks.facebook", {
                pattern: {
                  value: /^(https?:\/\/)?(www\.)?facebook\.com\/[A-Za-z0-9\-._~:/?#[\]@!$&'()*+,;=.]+$/,
                  message: "Invalid Facebook URL",
                },
              })}
              placeholder="https://www.facebook.com/your-page"
              className="w-full pl-12 pr-4 py-3 rounded-md border border-[#d6d6d6] bg-white text-[#1a1a1a] placeholder:text-[#666666] focus:outline-none focus:ring-2 focus:ring-[#d43fa6] focus:border-transparent transition-colors"
            />
          </div>
          {errors.social_networks?.facebook && (
            <p className="text-[#800000] text-sm">
              {errors.social_networks.facebook.message}
            </p>
          )}
          <p className="text-sm text-[#666666] mt-1">
            Enter your Facebook business page URL
          </p>
        </div>

        {/* Instagram URL Field */}
        <div className="space-y-2">
          <label className="block text-base font-medium text-[#262626]">
            Instagram URL (Optional)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Instagram className="h-5 w-5 text-[#666666]" />
            </div>
            <input
              type="url"
              {...register("social_networks.instagram", {
                pattern: {
                  value: /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9\-._~:/?#[\]@!$&'()*+,;=.]+$/,
                  message: "Invalid Instagram URL",
                },
              })}
              placeholder="https://www.instagram.com/your-profile"
              className="w-full pl-12 pr-4 py-3 rounded-md border border-[#d6d6d6] bg-white text-[#1a1a1a] placeholder:text-[#666666] focus:outline-none focus:ring-2 focus:ring-[#d43fa6] focus:border-transparent transition-colors"
            />
          </div>
          {errors.social_networks?.instagram && (
            <p className="text-[#800000] text-sm">
              {errors.social_networks.instagram.message}
            </p>
          )}
          <p className="text-sm text-[#666666] mt-1">
            Enter your Instagram profile URL
          </p>
        </div>
      </div>
    </div>
  );
};

export default Step5;