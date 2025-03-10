import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApiSlice = createApi({
  reducerPath: "adminApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/v1/admin`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getGeneralAnalytics: builder.query({
        query: () => ({
            url: `/general-analytics`,
            method: "GET",
          }),
    }),
  }),
});

export const { useGetGeneralAnalyticsQuery } = adminApiSlice; // Fixed export
