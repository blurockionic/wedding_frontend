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

    getHeroSectionAnalytics: builder.query({
      query: ()=>"/analytics/heroSectionAnalytics",
    }),
  }),
});

export const { useGetGeneralAnalyticsQuery,useGetHeroSectionAnalyticsQuery } = adminApiSlice;
