import React, { useRef, useState } from "react";
import { useUploadToCloudinaryMutation } from "../../redux/cloudinaryApiSlice";

export default function AdminPanel() {
  const [uploadFile, { isLoading, isError }] = useUploadToCloudinaryMutation();
  const fileInputRef = useRef(null);

  const [tag, setTag] = useState("border");

  const handleUpload = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      console.error("No files selected!");
      return;
    }

    try {
      await uploadFile({
        files,
        folder: "admin_assets",
        tags:tag,
      }).unwrap();
      console.log("Upload successful!");
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <input type="file" ref={fileInputRef} onChange={handleUpload} multiple />
      {isLoading && <p>Uploading...</p>}
      {isError && <p>Error uploading files.</p>}
    </div>
    
  
  );
}
