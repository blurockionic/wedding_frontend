import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const checklistApiSlice = createApi({
  reducerPath: "checklistApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/v1/checklist`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    saveChecklist: builder.mutation({
      query: (checklistData) => ({
        url: `/save`,
        method: "POST",
        body: checklistData,
      }),
    }),
    getChecklist: builder.query({
      query: () => ({
        url: `/get`,
        method: "GET",
      }),
    }),
  }),
});

export const { useSaveChecklistMutation, useGetChecklistQuery } = checklistApiSlice;
