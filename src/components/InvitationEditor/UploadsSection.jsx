import React, { useState, useRef } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { SiDropbox } from "react-icons/si";
import { FiUpload } from "react-icons/fi";
import { FaGoogleDrive } from "react-icons/fa";
import {
  useGetImagesForTemplateQuery,
  useUploadToCloudinaryMutation,
} from "../../redux/cloudinaryApiSlice";

const UploadsSection = ({ onImageUpload }) => {
  const [activeTab, setActiveTab] = useState("Images");
  const fileInputRef = useRef(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadToCloudinary] = useUploadToCloudinaryMutation();

  const { data } = useGetImagesForTemplateQuery(  "user_assets" );

  console.log(data?.images);

  const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      console.error("No files selected!");
      return;
    }

    try {
      setUploading(true);
      uploadToCloudinary({ files, folder: "user_assets" });
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload({ target: { files } });
    }
  };

  return (
    <div className="h-screen bg-gray-100 text-black overflow-y-auto w-full p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search uploads..."
          className="w-full p-2 rounded-full border border-gray-300 focus:outline-none focus:border-purple-500"
        />
        <div className="flex items-center gap-2">
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors w-full mt-4"
            onClick={() => fileInputRef.current.click()}
          >
            Upload Files
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-full mt-4">
            <BsThreeDots className="w-5 h-5" />
          </button>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*,video/*,audio/*"
          multiple
          className="hidden"
        />
      </div>
      <div className="flex gap-4 mb-4">
        {["Images", "Videos", "Audio"].map((tab) => (
          <button
            key={tab}
            className={`pb-2 text-sm font-semibold ${
              activeTab === tab
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div
        className="border-2 border-dashed border-gray-400 rounded-lg p-6 flex flex-col items-center justify-center text-center h-84"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <p className="text-gray-600 mb-4">
          Drag media here to upload or connect an account...
        </p>
        <div className="flex gap-1 flex-wrap">
          <button className="p-2 hover:bg-gray-200 rounded-full">
            <FcGoogle className="w-8 h-8" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-full">
            <SiDropbox className="w-8 h-8 text-blue-500" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-full">
            <FaGoogleDrive className="w-8 h-8 text-blue-600" />
          </button>
          <button
            className="p-2 hover:bg-gray-200 rounded-full"
            onClick={() => fileInputRef.current.click()}
          >
            <FiUpload className="w-8 h-8 text-gray-600" />
          </button>
        </div>
      </div>
      {data?.images.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-4">
        {data?.images?.map((src) => (
          <img
            key={src.etag}
            src={src.url}
            alt="preview"
            className="w-full h-auto rounded-md cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              onImageUpload(src.url);
            }}
          />
        ))}
      </div>
      )}
      <p className="text-sm text-gray-500 mt-4 text-center">
        You can upload images, videos, audio, and GIFs.
      </p>
      {uploading && <p className="text-center text-blue-500">Uploading...</p>}
    </div>
  );
};

export default UploadsSection;
