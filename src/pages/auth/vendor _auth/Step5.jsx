import React from "react";
import { useFormContext } from "react-hook-form";
import { Facebook, Instagram, Youtube, Globe } from "lucide-react";

const socialFields = [
  { name: "facebook", label: "Facebook", icon: Facebook, placeholder: "https://www.facebook.com/your-page", pattern: /^(https?:\/\/)?(www\.)?facebook\.com\/[A-Za-z0-9\-._~:\/?#[\]@!$&'()*+,;=.]+$/ },
  { name: "instagram", label: "Instagram", icon: Instagram, placeholder: "https://www.instagram.com/your-profile", pattern: /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9\-._~:\/?#[\]@!$&'()*+,;=.]+$/ },
  { name: "youtube", label: "YouTube", icon: Youtube, placeholder: "https://www.youtube.com/your-channel", pattern: /^(https?:\/\/)?(www\.)?youtube\.com\/[A-Za-z0-9\-._~:\/?#[\]@!$&'()*+,;=.]+$/ },
  { name: "website", label: "Website", icon: Globe, placeholder: "https://www.yourwebsite.com", pattern: /^(https?:\/\/)?[A-Za-z0-9\-._~:\/?#[\]@!$&'()*+,;=.]+$/ }
];

const Step5 = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="bg-white rounded-lg">
      <h2 className="text-2xl font-semibold mb-8 text-[#1a1a1a]">Social Media Profiles</h2>
      <div className="space-y-6">
        {socialFields.map(({ name, label, icon: Icon, placeholder, pattern }) => (
          <div key={name} className="space-y-2">
            <label className="block text-base font-medium text-[#262626]">{label} URL (Optional)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Icon className="h-5 w-5 text-[#666666]" />
              </div>
              <input
                type="url"
                {...register(`social_networks.${name}`, {
                  pattern: { value: pattern, message: `Invalid ${label} URL` },
                })}
                placeholder={placeholder}
                className="w-full pl-12 pr-4 py-3 rounded-md border border-[#d6d6d6] bg-white text-[#1a1a1a] placeholder:text-[#666666] focus:outline-none focus:ring-2 focus:ring-[#d43fa6] focus:border-transparent transition-colors"
              />
            </div>
            {errors.social_networks?.[name] && (
              <p className="text-[#800000] text-sm">{errors.social_networks[name].message}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step5;
