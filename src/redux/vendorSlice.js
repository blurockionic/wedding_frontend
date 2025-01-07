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

    vendorForgotPassword: builder.mutation({
      query: (userData) => ({
        url: `/request-password-reset`,
        method: "POST",
        body: userData,
      }),
    }),

    vendorChangePassword: builder.mutation({
      query: ({token ,confirmPassword}) => ({
        url: `/reset-password?token=${token}`,
        method: "POST",
        body: {confirmPassword},
      }),
    }),

  }),
});


export const { 
  useVendorSignupMutation ,
  useVendorLoginMutation,
  useVendorLogoutMutation,
  useVendorForgotPasswordMutation,
  useVendorChangePasswordMutation,
} = vendorApi;