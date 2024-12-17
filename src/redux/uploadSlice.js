import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const uploadSlice = createApi({
  reducerPath: "uploadSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    upl: builder.mutation({
      query: (data) => ({
        url: "/upload-single",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useUplMutation } = uploadSlice;
