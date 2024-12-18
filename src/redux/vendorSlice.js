import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const vendorApi = createApi({
  reducerPath: "vendorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    vendorSignup: builder.mutation({
      query: (userData) => ({
        url: `/vendors/register`,
        method: "POST",
        body: userData,
      }),
    }),
  }),
});


export const { useVendorSignupMutation } = vendorApi;