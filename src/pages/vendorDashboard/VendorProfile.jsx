import React, { useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useVendorUpdateMutation } from "../../redux/vendorSlice";
import { userUpdate } from "../../redux/authSlice";
import { data, useNavigate } from "react-router-dom";
import CustomButton from "../../components/global/button/CustomButton";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { useUplMutation } from "../../redux/uploadSlice";

const VendorProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const vendorData = useSelector((state) => state?.auth?.user);

  if (vendorData?.role !== "vendor") {
    navigate("/");
    return null;
  }

  const [isEditing, setIsEditing] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [previewLogoUrl, setPreviewLogoUrl] = useState(
    vendorData?.logo_url || ""
  );
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedData, setUploadedData] = useState();
  const [uploadMutation] = useUplMutation();
  const [updateVendor, { isLoading }] = useVendorUpdateMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(
      () => ({
        name: vendorData.name || "",
        business_name: vendorData.business_name || "",
        business_category: vendorData.business_category || "",
        license_number: vendorData.license_number || "",
        description: vendorData.description || "",
        email: vendorData.email || "",
        phone_number: vendorData.phone_number || "",
        social_networks: vendorData.social_networks || {},
        country: vendorData.country || "",
        city: vendorData.city || "",
        logo_url: vendorData.logo_url || {},
        latitude: vendorData.latitude || "",
        longitude: vendorData.longitude || "",
      }),
      [vendorData]
    ), // Ensures re-initialization only when vendorData changes
  });

  const handleFileChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB. Please select a smaller file.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file type. Please upload an image file.");
      return;
    }

    setSelectedLogo(file);
    setPreviewLogoUrl(URL.createObjectURL(file));
  }, []);


  const onSubmit = useCallback(async (data) => {
    const formData = new FormData();

    const notIncluded = ["service_type", "logo_url"];

    for (const key in data) {
      const val = data[key];
      if (notIncluded.includes(key)) continue;

      if(key === "social_networks") {
        formData.append(key, JSON.stringify(val));
        continue;}
        formData.append(key, val);
       
    }

    try {
      if (selectedLogo) {
        formData.append("logo_url", selectedLogo); 
      }

      const updatedData = await updateVendor(formData).unwrap();

      if (updatedData.success) {
        toast.success(updatedData.message);
        dispatch(userUpdate(updatedData.vendor));
      }
    } catch (error) {
      toast.error(error.data?.message || "Failed to update vendor.");
    } finally {
      setIsEditing(false);
      reset();
    }
  }, [selectedLogo, data, updateVendor, dispatch, reset]);

  const handleCancel = useCallback(() => {
    reset();
    setIsEditing(false);
  }, [reset]);

  const renderVendorInfo = useMemo(() => {
    const fields = [
      "name",
      "business_name",
      "business_category",
      "license_number",
      "description",
      "phone_number",
      "email",
      "country",
      
      "city",
    ];

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field} className="space-y-2">
            <label htmlFor={field} className="block text-sm text-pink-600">
              {field.replace("_", " ").toUpperCase()}
            </label>
            <input
              id={field}
              {...register(field, {
                required:
                  !["email", "description", "license_number"].includes(field) &&
                  "This field is required",
                pattern:
                  field === "email"
                    ? {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email format",
                      }
                    : undefined,
              })}
              type="text"
              className="disabled:cursor-not-allowed cursor-pointer w-full border border-pink-200 rounded p-2"
              disabled={!isEditing}
            />
            {errors[field] && (
              <p className="text-sm text-red-500">{errors[field].message}</p>
            )}
          </div>
        ))}
      </div>
    );
  }, [register, errors, isEditing]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 rounded-lg">
      <div className="flex gap-5 justify-start items-center">
        <div className="h-full gap-3 bg-white rounded-lg p-5 border border-pink-200 flex flex-col justify-center items-center">
          <img
            src={isEditing ? previewLogoUrl : vendorData?.logo_url?.path}
            alt="Logo"
            className="h-24 w-full object-cover"
          />
          {isEditing && (
            <div>
              {previewLogoUrl ? (
                <button
                  className="py-1 px-4 text-muted bg-primary rounded"
                  onClick={() => setPreviewLogoUrl("")}
                >
                  Cancel
                </button>
              ) : (
                <input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full border border-pink-200 rounded p-2"
                />
              )}
              <p className="text-xs text-gray-500 mt-1">
                Max size: 5MB. Formats: JPG, PNG, GIF.
              </p>
            </div>
          )}
        </div>
        <div className="text-start mb-8">
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-pink-700 mb-2">
            {isEditing ? "Edit Vendor Profile" : "Vendor Profile"}
          </h1>
          <p className="text-sm sm:text-lg text-gray-600">
            {isEditing
              ? "Update your business details to reach more customers."
              : "Manage and showcase your vendor profile."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 mt-2 gap-6">
        <div
          className={`w-full col-span-2 ${
            isEditing ? "bg-green-100 border-dashed border-4" : "bg-white"
          } rounded-lg p-6 border border-pink-200`}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {renderVendorInfo}
            <div className="flex justify-end space-x-4 mt-6">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    className="text-sm font-semibold text-gray-600 hover:text-gray-800"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 text-sm font-semibold text-white bg-pink-600 rounded hover:bg-pink-700"
                  >
                    {isLoading || isUploading ? "Updating..." : "Save Changes"}
                  </button>
                </>
              ) : (
                <CustomButton
                  onClick={() => {
                    setIsEditing(true);
                    setPreviewLogoUrl(vendorData?.logo_url?.path);
                  }}
                  text="Edit Profile"
                  className="px-6 py-2 text-sm font-semibold text-white bg-pink-600 rounded hover:bg-pink-700"
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;
