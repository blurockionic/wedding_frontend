import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";

export const adminApiSlice = createApi({
  reducerPath: "adminApiSlice",
  baseQuery:baseQueryWithReauth,
  endpoints: (builder) => ({
    getGeneralAnalytics: builder.query({
      query: () => ({
        url: `/admin/general-analytics`,
        method: "GET",
      }),
    }),
    searchVendors: builder.mutation({
      query: (searchData) => ({
        url: `/admin/vendor-search`,
        method: "POST",
        body: searchData,
      }),
    }),
    searchServices: builder.mutation({
      query: (searchData) => ({
        url: `/admin/service-search`,
        method: "POST",
        body: searchData,
      }),
    }),
    searchUsers: builder.mutation({
      query: (searchData) => ({
        url: `/admin/user-search`,
        method: "POST",
        body: searchData,
      }),
    }),
    getTransactions: builder.query({
      query: () => ({
        url: `/admin/transactions`,
        method: "GET",
      }),
    }),
    giveAdmin: builder.mutation({
      query: (email) => ({
        url: `/admin/give-admin/${email}`,
        method: "PATCH",
      }),
    }),
    revokeAdmin: builder.mutation({
      query: (email) => ({
        url: `/admin/revoke-admin/${email}`,
        method: "PATCH",
      }),
    }),
    giveSuperAdmin: builder.mutation({
      query: (email) => ({
        url: `/admin/give-superadmin/${email}`,
        method: "PATCH",
      }),
    }),
    giveAgent: builder.mutation({
      query: (email) => ({
        url: `/admin/give-agent/${email}`,
        method: "PATCH",
      }),
    }),

    getHeroSectionAnalytics: builder.query({
      query: ()=>"/analytics/heroSectionAnalytics",
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
  useGiveAgentMutation, 
  useGetHeroSectionAnalyticsQuery
} = adminApiSlice;