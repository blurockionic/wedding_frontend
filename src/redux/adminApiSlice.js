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
    giveAdmin: builder.mutation({
      query: (email) => ({
        url: `/give-admin/${email}`,
        method: "PATCH",
      }),
    }),
    revokeAdmin: builder.mutation({
      query: (email) => ({
        url: `/revoke-admin/${email}`,
        method: "PATCH",
      }),
    }),
    giveSuperAdmin: builder.mutation({
      query: (email) => ({
        url: `/give-superadmin/${email}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const { 
  useGetGeneralAnalyticsQuery, 
  useSearchVendorsMutation, 
  useSearchServicesMutation, 
  useSearchUsersMutation, 
  useGetTransactionsQuery, 
  useGiveAdminMutation, 
  useRevokeAdminMutation, 
  useGiveSuperAdminMutation, 
} = adminApiSlice;