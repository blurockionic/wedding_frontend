import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApiSlice = createApi({
  reducerPath: "adminApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/v1/`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getGeneralAnalytics: builder.query({
      query: () => ({
        url: `/admin/general-analytics`,
        method: "GET",
      }),
    }),

    getHeroSectionAnalytics: builder.query({
      query: ()=>"/analytics/heroSectionAnalytics",
    }),
  }),
});

export const { useGetGeneralAnalyticsQuery,useGetHeroSectionAnalyticsQuery } = adminApiSlice;
