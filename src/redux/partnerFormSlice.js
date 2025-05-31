import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";

export const partnerFormApi = createApi({
  reducerPath: "partnerFormApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Partner"],
  endpoints: (builder) => ({
    // Public access endpoint for submitting partner form
    submitPartnerForm: builder.mutation({
      query: (formData) => ({
        url: "/partners/public", // Updated to match your backend route
        method: "POST",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["Partner"],
    }),

    // Admin-only endpoints
    getPartners: builder.query({
      query: (filters = {}) => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value) params.append(key, value);
        });

        console.log(params.toString());
        

        return {
          url: `/partners/admin?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Partner"],
    }),

    getPartnerById: builder.query({
      query: (id) => ({
        url: `/partners/admin${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Partner", id }],
    }),

    updatePartnerStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/partners/admin/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Partner", id },
        "Partner",
      ],
    }),
  }),
});

export const {
  useSubmitPartnerFormMutation,
  useGetPartnersQuery,
  useGetPartnerByIdQuery,
  useUpdatePartnerStatusMutation,
} = partnerFormApi;
