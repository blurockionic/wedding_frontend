import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const checklistApiSlice = createApi({
  reducerPath: "checklistApiSlice", // Choose a unique reducer path
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/v1/checklist`, // Base URL for checklist related endpoints
    credentials: "include", // If you need to send cookies/credentials
  }),
  endpoints: (builder) => ({
    saveChecklist: builder.mutation({
      query: (checklistData) => ({
        url: `/save`, // Endpoint is /api/v1/checklist/save (combined with baseUrl)
        method: "POST",
        body: checklistData,
      }),
    }),
  }),
});

export const { useSaveChecklistMutation } = checklistApiSlice;