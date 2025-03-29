import { useFormContext } from "react-hook-form";

const InfoSection = ({ title, fields }) => (
  <div className="bg-[#f2f2f2] p-4 rounded-lg border border-[#d6d6d6]">
    <h3 className="text-lg font-semibold mb-4 text-[#262626]">{title}</h3>
    <div className="space-y-4">
      {fields.map(({ label, value }) => (
        <div key={label} className="flex gap-4    justify-items-start">
          <span className="w-fit  text-[#666666] font-medium">{label}:</span>
          <span className=" text-[#1a1a1a]">{value || "Not provided"}</span>
        </div>
      ))}
    </div>
  </div>
);

const Step6 = () => {
  const { getValues } = useFormContext();
  const formData = getValues();

  return (
    <div className="rounded-lg">
      <h2 className="text-2xl text-center font-semibold mb-8 text-[#1a1a1a]">
        Review your Details
      </h2>

      <div className="space-y-6">
      <InfoSection
  title="Personal Information"
  fields={[
    { label: "Name", value: formData.name },
    { label: "Email", value: formData.email },
    { label: "Phone", value: formData.phone_number }
  ]}
/>

<InfoSection
  title="Business Details"
  fields={[
    { label: "Business", value: formData.business_name },
    { label: "License", value: formData.license_number },
    { label: "Services", value: formData.service_type?.join(", ") || "No services selected" },
    { label: "Category", value: formData.business_category }
  ]}
/>

<InfoSection
  title="Social Media"
  fields={[
    { label: "Facebook", value: formData.social_networks?.facebook },
    { label: "Instagram", value: formData.social_networks?.instagram },
    { label: "Youtube", value: formData.social_networks?.youtube },
    { label: "Website", value: formData.social_networks?.website }
  ]}
/>

        {formData.logo_url && (
          <div className="bg-[#f2f2f2] p-6 rounded-lg border border-[#d6d6d6]">
            <h3 className="text-lg font-semibold mb-4 text-[#262626]">Business Logo</h3>
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
