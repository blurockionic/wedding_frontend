import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the API endpoints
export const apiAuthSlice = createApi({
  reducerPath: "authSlice",
  
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/",
    credentials: "include",
  }),

  endpoints: (builder) => ({

    login: builder.mutation({
      query: (userData) => ({
        url: `/v1/users/login`,
        method: "POST",
        body: userData,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `/v1/users/logout`,
        method: "POST",
      }),
    }),

    signup: builder.mutation({
      query: (userData) => ({
        url: `/v1/users/register`,
        method: "POST",
        body: userData,
      }),
    }),

    updateUser: builder.mutation({
      query: (userData) => ({
        url: `/v1/users/update-user`,
        method: "PATCH",
        body: userData,
      }),
    }),

    reqResetPassword: builder.mutation({
      query: (resetData) => ({
        url: `/v1/users/request-password-reset`,
        method: "POST",
        body: resetData,
      }),
    }),

    reqChangePassword: builder.mutation({
      query: ({ token, ...changeData }) => ({
        url: `/v1/users/reset-password?token=${token}`,
        method: "POST",
        body: changeData,
      }),
    }),

    deleteUser: builder.mutation({
      query: () => ({
        url: `/v1/users/delete-user`,
        method: "DELETE",
      }),
    }),
  }),
});


export const {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useUpdateUserMutation,
  useReqResetPasswordMutation,
  useReqChangePasswordMutation,
  useDeleteUserMutation,
} = apiAuthSlice;