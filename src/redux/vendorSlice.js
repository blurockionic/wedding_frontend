import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const vendorApi = createApi({
  reducerPath: "vendorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/vendors",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    vendorSignup: builder.mutation({
      query: (userData) => ({
        url: `/register`,
        method: "POST",
        body: userData,
      }),
    }),

    vendorLogin: builder.mutation({
      query: (userData) => ({
        url: `/login`,
        method: "POST",
        body: userData,
      }),
    }),
    vendorLogout: builder.mutation({
      query: () => ({
        url: `/logout`,
        method: "POST",
      }),
    }),

  }),
});


export const { 
  useVendorSignupMutation ,
  useVendorLoginMutation,
  useVendorLogoutMutation,
} = vendorApi;