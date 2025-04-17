import React, { useRef, useState } from "react";
import { useUploadToCloudinaryMutation } from "../../redux/cloudinaryApiSlice";

export default function AdminPanel({saveTemplate}) {
  const [uploadFile, { isLoading, isError }] = useUploadToCloudinaryMutation();
  const fileInputRef = useRef(null);
  const [tag, setTag] = useState("select");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [tagError, setTagError] = useState(false);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setSelectedFiles((prev) => [...prev, ...files]);
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      console.error("No files selected!");
      return;
    }

    if (tag === "select") {
      setTagError(true);
      console.error("Please select a tag!");
      return;
    }

    setTagError(false);

    try {
      
      await uploadFile({
        files: selectedFiles,
        folder: "admin_assets",
        tags: tag,
      }).unwrap();


      setSelectedFiles([]);
      setTag("select");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div className="p-4 space-y-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold">Admin Panel</h2>

      {/* Tag Selector */}
      <div>
        <label htmlFor="category" className="block mb-1 font-medium">
          Select Category:
        </label>
        <select
          id="category"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="border px-3 py-2 rounded-md w-full"
        >
          <option value="select" disabled>
            -- Select Tag --
          </option>
          <option value="background">Background</option>
          <option value="flower">Flower</option>
          <option value="texture">Texture</option>
          <option value="pattern">Pattern</option>
          <option value="border">Border</option>
          <option value="decoration">Decoration</option>
          <option value="nature">Nature</option>
          <option value="sticker">Sticker</option>
          <option value="wallpaper">Wallpaper</option>
          <option value="animals">Animals</option>
          <option value="birthday">Birthday</option>
        </select>
        {tagError && <p className="text-red-500 text-sm mt-1">Please select a tag.</p>}
      </div>

      {/* File Input */}
      <div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          className="block"
        />
      </div>

      {/* Selected Files Preview */}
      {selectedFiles.length > 0 && (
        <div className="text-sm text-gray-600">
          <p className="font-medium mb-1">Selected Files:</p>
          <ul className="list-disc list-inside">
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Upload Files
      </button>

      <button
                    onClick={saveTemplate}
                    className="p-2 bg-purple-500 text-white rounded-lg w-full hover:bg-purple-600"
                  >
                    Save Template
                  </button>
                  

      {/* Upload Status */}
      {isLoading && <p className="text-blue-500">Uploading...</p>}
      {isError && <p className="text-red-500">Error uploading files.</p>}
    </div>
  );
}
