import { useFormContext } from "react-hook-form";

const Step6 = () => {
  const { getValues } = useFormContext();
  const formData = getValues();

  const renderServices = () => {
    if (formData.service_type) {
      return formData.service_type.join(", ");
    }
    return "No services selected";
  };

  return (
    <div className="p-8 rounded-lg">
      <h2 className="text-2xl font-semibold mb-8 text-[#1a1a1a]">
        Review Your Information
      </h2>

      <div className="space-y-6">
        {/* Personal Information Section */}
        <div className="bg-[#f2f2f2] p-6 rounded-lg border border-[#d6d6d6]">
          <h3 className="text-lg font-semibold mb-4 text-[#262626]">
            Personal Information
          </h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="w-32 text-[#666666] font-medium">Name:</span>
              <span className="ml-4 text-[#1a1a1a]">{formData.name}</span>
            </div>
            <div className="flex items-start">
              <span className="w-32 text-[#666666] font-medium">Email:</span>
              <span className="ml-4 text-[#1a1a1a]">{formData.email}</span>
            </div>
            <div className="flex items-start">
              <span className="w-32 text-[#666666] font-medium">Phone:</span>
              <span className="ml-4 text-[#1a1a1a]">{formData.phone_number}</span>
            </div>
          </div>
        </div>

        {/* Business Details Section */}
        <div className="bg-[#f2f2f2] p-6 rounded-lg border border-[#d6d6d6]">
          <h3 className="text-lg font-semibold mb-4 text-[#262626]">
            Business Details
          </h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="w-32 text-[#666666] font-medium">Business:</span>
              <span className="ml-4 text-[#1a1a1a]">{formData.business_name}</span>
            </div>
            <div className="flex items-start">
              <span className="w-32 text-[#666666] font-medium">License:</span>
              <span className="ml-4 text-[#1a1a1a]">{formData.license_number}</span>
            </div>
            <div className="flex items-start">
              <span className="w-32 text-[#666666] font-medium">Services:</span>
              <span className="ml-4 text-[#1a1a1a]">{renderServices()}</span>
            </div>
            <div className="flex items-start">
              <span className="w-32 text-[#666666] font-medium">Category:</span>
              <span className="ml-4 text-[#1a1a1a]">{formData.business_category}</span>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="bg-[#f2f2f2] p-6 rounded-lg border border-[#d6d6d6]">
          <h3 className="text-lg font-semibold mb-4 text-[#262626]">
            Social Media
          </h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="w-32 text-[#666666] font-medium">Facebook:</span>
              <span className="ml-4 text-[#1a1a1a]">
                {formData.social_networks?.facebook || "Not provided"}
              </span>
            </div>
            <div className="flex items-start">
              <span className="w-32 text-[#666666] font-medium">Instagram:</span>
              <span className="ml-4 text-[#1a1a1a]">
                {formData.social_networks?.instagram || "Not provided"}
              </span>
            </div>
          </div>
        </div>

        {/* Logo Preview Section */}
        {formData.logo_url && (
          <div className="bg-[#f2f2f2] p-6 rounded-lg border border-[#d6d6d6]">
            <h3 className="text-lg font-semibold mb-4 text-[#262626]">
              Business Logo
            </h3>
            <div className="flex justify-center bg-white p-4 rounded-md">
              <img
                src={formData.logo_url?.path}
                alt="Business Logo"
                className="max-w-xs h-48 object-contain"
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 text-center text-sm text-[#666666]">
        Please review all information carefully before submitting your registration
      </div>
    </div>
  );
};

export default Step6;