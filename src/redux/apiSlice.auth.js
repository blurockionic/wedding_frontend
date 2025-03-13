import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";




// Define the API endpoints
export const apiAuthSlice = createApi({
  reducerPath: "authSlice",
  
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/v1`, 
    credentials: "include",
  }),



  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userData) => ({
        url: `/users/login`,
        method: "POST",
        body: userData,
      }),
    }),

   
    logout: builder.mutation({
      query: () => ({
        url: `/users/logout`,
        method: "POST",
      }),
    }),

    signup: builder.mutation({
      query: (userData) => ({
        url: `/users/register`,
        method: "POST",
        body: userData,
      }),
    }),

    updateUser: builder.mutation({
      query: (userData) => ({
        url: `/users`,
        method: "PATCH",
        body: userData,
      }),
    }),

    reqResetPassword: builder.mutation({
      query: (resetData) => ({
        url: `/users/request-password-reset`,
        method: "POST",
        body: resetData,
      }),
    }),

    ChangePassword: builder.mutation({
      query: ({ token, ...changeData }) => ({
        url: `/users/reset-password?token=${token}`,
        method: "POST",
        body: changeData,
      }),
    }),

    deleteUser: builder.mutation({
      query: () => ({
        url: `/users/delete-user`,
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
 useChangePasswordMutation,
  useDeleteUserMutation,
  
} = apiAuthSlice;
