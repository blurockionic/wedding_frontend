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
    searchVendors: builder.mutation({
      query: (searchData) => ({
        url: `/vendor-search`,
        method: "POST",
        body: searchData,
      }),
    }),
    searchServices: builder.mutation({
      query: (searchData) => ({
        url: `/service-search`,
        method: "POST",
        body: searchData,
      }),
    }),
    searchUsers: builder.mutation({
      query: (searchData) => ({
        url: `/user-search`,
        method: "POST",
        body: searchData,
      }),
    }),
    getTransactions: builder.query({
      query: () => ({
        url: `/transactions`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetGeneralAnalyticsQuery, useSearchVendorsMutation, useSearchServicesMutation, useSearchUsersMutation, useGetTransactionsQuery } = adminApiSlice;