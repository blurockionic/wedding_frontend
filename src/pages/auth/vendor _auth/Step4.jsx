import React, { useState, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useUplMutation } from "../../../redux/uploadSlice";
import { toast } from "react-toastify";
import { UploadCloud } from "lucide-react";

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
        toast.success("Logo uploaded successfully!");
      } catch (error) {
        console.error("Error uploading logo:", error);
        toast.error("Failed to upload logo. Please try again.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg">
      <h2 className="text-2xl font-semibold mb-8 text-[#1a1a1a]">
        Upload Business Logo
      </h2>

      <div className="space-y-6">
        {/* Upload Area */}
        <div className="relative">
          <div 
            className="border-2 border-dashed border-primary rounded-lg p-8 text-center hover:border-[#d43fa6] transition-colors cursor-pointer bg-[#f2f2f2]"
            onClick={handleFileSelect}
          >
            <UploadCloud className="mx-auto h-12 w-12 text-[#666666] mb-4" />
            <p className="text-[#262626] text-sm font-medium mb-2">
              Click to upload your business logo
            </p>
            <p className="text-xs text-[#666666]">
              SVG, PNG, JPG or GIF (Max. 2MB)
            </p>
          </div>

          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
          />
        </div>

        {/* Preview Area */}
        {logoPreview && (
          <div className="space-y-6">
            <div className="p-4 bg-[#f2f2f2] rounded-lg">
              <p className="text-[#666666] text-sm mb-4">Preview:</p>
              <div className="flex justify-center">
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className="w-40 h-40 object-contain rounded-md border border-[#d6d6d6] bg-white p-2"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleUpload}
              disabled={isUploading}
              className={`w-full py-3 px-4 rounded-md text-white transition-colors duration-200 ${
                isUploading
                  ? "bg-[#e6e6e6] cursor-not-allowed"
                  : "bg-[#d43fa6] hover:bg-[#c23795]"
              }`}
            >
              {isUploading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </span>
              ) : (
                "Save Logo"
              )}
            </button>
          </div>
        )}

        {errors.logo_url && (
          <p className="text-[#800000] text-sm mt-2">
            {errors.logo_url.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Step4;