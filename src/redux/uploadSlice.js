import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const uploadSlice = createApi({
  reducerPath: "uploadSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.API_URL}/api/v1`,
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

    uplMulti: builder.mutation({
      query: ({ serviceId, data }) => ({
        url: `/upload/${serviceId}`,
        method: "POST",
        body: data,
      }),
    }),

    deleteMedia: builder.mutation({
      query: ({publicId,serviceId}) => ({
        url: `/delete/${serviceId}`,
        method: "POST",
        body:{publicId},
      }),
    }),

    // addFaq: builder.mutation({
    //   query: (faqData) => ({
    //     url: "/faq",
    //     method: "POST",
    //     body: faqData,
    //   }),
    // }),
  }),
});

export const { useUplMutation, useUplMultiMutation, useDeleteMediaMutation } =
  uploadSlice;
