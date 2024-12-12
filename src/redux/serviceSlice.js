import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // Get all services with dynamic filters
    getServices: builder.query({
        query: (filters) => {
          let queryStr = "/services";
      
          // Check if filters are provided
          if (filters && Object.keys(filters).length > 0) {
            // Filter out undefined or empty values
            const filtered = Object.fromEntries(
              Object.entries(filters).filter(([_, v]) => v != null && v !== "")
            );
      
            const filterParams = new URLSearchParams(filtered).toString();
            queryStr = `${queryStr}?${filterParams}`;
          }
      
          return queryStr;
        },
      }),

    getServiceById: builder.query({
      query: (id) => `/services/${id}`, // Correct URL format for service by ID
    }),



  }),
});

export const { useGetServicesQuery, useGetServiceByIdQuery } = serviceApi;
