import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const vendorApi = createApi({
  reducerPath: "vendorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/v1/vendors`,
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
      query: ({ token, confirmPassword }) => ({
        url: `/reset-password?token=${token}`,
        method: "POST",
        body: { confirmPassword },
      }),
    }),

    vendorUpdate: builder.mutation({
      query: (data) => ({
        url: `/update`,
        method: "PATCH",
        body: data,
      }),
    }),
    dashboardChangePassword: builder.mutation({
      query: ({ pass }) => ({
        url: `/change-password`,
        method: "PATCH",
        body:{pass}
      })
    }),
    vendorDeleteAccount: builder.mutation({
      query: () => ({
        url: `/delete`,
        method: "DELETE"
      }),
    }),
  }),
});

export const {
  useVendorSignupMutation,
  useDashboardChangePasswordMutation,
  useVendorDeleteAccountMutation,
  useVendorLoginMutation,
  useVendorLogoutMutation,
  useVendorUpdateMutation,
  useVendorForgotPasswordMutation,
  useVendorChangePasswordMutation,
} = vendorApi;
