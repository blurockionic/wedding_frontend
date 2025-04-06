import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";

export const cloudinaryApi = createApi({
  reducerPath: "cloudinaryApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    uploadToCloudinary: builder.mutation({
      queryFn: async ({ files, folder = "user_assets", tags = "" }) => {
        try {
          const fileArray = [...files];
          if (fileArray.length === 0) throw new Error("No files provided.");

          // Fetch a single signature for all files
          const signatureResponse = await fetch(
            `${import.meta.env.VITE_API_URL}/api/v1/generateSignature`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ folder }),
            }
          );

          if (!signatureResponse.ok) throw new Error("Failed to get signature");

          const { signature, timestamp } = await signatureResponse.json();
          console.log("✅ Signature:", signature);
          console.log("✅ Timestamp:", timestamp);

          // Upload each file concurrently
          const uploadPromises = fileArray.map(async (file) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("timestamp", timestamp);
            formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
            formData.append("signature", signature);
            formData.append("folder", folder);
           

            const cloudinaryResponse = await fetch(
              `https://api.cloudinary.com/v1_1/${
                import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
              }/image/upload`,
              { method: "POST", body: formData }
            );

            if (!cloudinaryResponse.ok)
              throw new Error(`Upload failed for ${file.name}`);

            return cloudinaryResponse.json();
          });

          // Handle all uploads and track individual results
          const results = await Promise.allSettled(uploadPromises);
          const uploadedFiles = results
            .filter((r) => r.status === "fulfilled")
            .map((r) => r.value);
          const failedFiles = results
            .filter((r) => r.status === "rejected")
            .map((r) => r.reason);

          if (uploadedFiles.length === 0)
            throw new Error("All uploads failed.");

          const saveResponse = await fetch(
            `${import.meta.env.VITE_API_URL}/api/v1/editorAssets`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ images: uploadedFiles, folder, tags }),
              credentials: "include",
            }
          );


          if (!saveResponse.ok) throw new Error("Failed to save images to DB");
          const savedData = await saveResponse.json();
          return { data: { savedData, failedFiles } };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),

    getImagesForTemplate: builder.query({
      query: (type) => `/editorAssets?asset_folder=${type}`,
    }),
  }),
});

export const { useUploadToCloudinaryMutation, useGetImagesForTemplateQuery } =
  cloudinaryApi;
