import React, { useState, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useUplMutation } from "../../../redux/uploadSlice";
import { toast } from "react-toastify";

const Step4 = () => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const [logoPreview, setLogoPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMutation] = useUplMutation();
  const fileInputRef = useRef();

  // Cleanup preview URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [logoPreview]);

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // File validation (example: file size and type)
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file.");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size should not exceed 2MB.");
        return;
      }

      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await uploadMutation(formData).unwrap();
        setValue("logo_url", response?.file);
        // setValue("logo_url", response.fileUrl); // Assuming the API returns `fileUrl`
        toast.success("Logo uploaded successfully!");
      } catch (error) {
        console.error("Error uploading logo:", error);
        alert("Failed to upload logo. Please try again.",error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Upload Business Logo
      </h2>
      <div className="flex flex-col items-center">
        
        <input
          type="file"
           onChange={handleFileChange}
          accept="image/*"
          ref={fileInputRef}
          className="border border-gray-300 p-2 rounded mb-2 w-full"
          placeholder="Upload new logo"
        />
      </div>
        {logoPreview && (
          <div className="mt-4">
            <img
              src={logoPreview}
              alt="Logo Preview"
              className="w-32 h-32 object-cover rounded-md"
            />
            <button
              type="button"
              onClick={handleUpload}
              className={`w-full p-4 mt-4 ${
                isUploading ? "bg-gray-400" : "bg-indigo-600"
              } text-white hover:bg-indigo-700 rounded-md text-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Save Logo"}
            </button>
          </div>
        )}
        {errors.logo_url && (
          <span className="text-red-500 text-sm mt-1">
            {errors.logo_url.message}
          </span>
        )}
      </div>
  
  );
};

export default Step4;
