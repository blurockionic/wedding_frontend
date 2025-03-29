import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";

export const vendorApi = createApi({
  reducerPath: "vendorApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    vendorSignup: builder.mutation({
      query: (userData) => ({
        url: `/vendors/register`,
        method: "POST",
        body: userData,
      }),
    }),

    vendorLogin: builder.mutation({
      query: (userData) => ({
        url: `/vendors/login`,
        method: "POST",
        body: userData,
      }),
    }),
    vendorLogout: builder.mutation({
      query: () => ({
        url: `/vendors/logout`,
        method: "POST",
      }),
    }),

    vendorForgotPassword: builder.mutation({
      query: (userData) => ({
        url: `/vendors/request-password-reset`,
        method: "POST",
        body: userData,
      }),
    }),

    vendorChangePassword: builder.mutation({
      query: ({ token, confirmPassword }) => ({
        url: `/vendors/reset-password?token=${token}`,
        method: "POST",
        body: { confirmPassword },
      }),
    }),

    vendorUpdate: builder.mutation({
      query: (data) => ({
        url: `/vendors/update`,
        method: "PATCH",
        body: data,
      }),
    }),
    dashboardChangePassword: builder.mutation({
      query: ({ pass }) => ({
        url: `/vendors/change-password`,
        method: "PATCH",
        body:{pass}
      })
    }),
    vendorDeleteAccount: builder.mutation({
      query: () => ({
        url: `/vendors/delete`,
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
