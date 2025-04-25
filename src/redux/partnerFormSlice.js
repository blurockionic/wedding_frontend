import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const partnerFormApi = createApi({
  reducerPath: 'partnerFormApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/v1`,
    prepareHeaders: (headers, { getState }) => {
      // Get the token from state if available
      const token = getState()?.auth?.token;
      // If we have a token, include it in requests
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Partner'],
  endpoints: (builder) => ({
    // Public access endpoint for submitting partner form
    submitPartnerForm: builder.mutation({
      query: (formData) => ({
        url: '/partners/public', // Updated to match your backend route
        method: 'POST',
        body: formData,
        formData: true,
      }),
      invalidatesTags: ['Partner'],
    }),

    // Admin-only endpoints
    getPartners: builder.query({
      query: (filters = {}) => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value) params.append(key, value);
        });
        return {
          url: `/admin/partners?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Partner'],
    }),

    getPartnerById: builder.query({
      query: (id) => ({
        url: `/admin/partners/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Partner', id }],
    }),

    updatePartnerStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/partners/${id}/status`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Partner', id }, 'Partner'],
    }),
  }),
});

export const {
  useSubmitPartnerFormMutation,
  useGetPartnersQuery,
  useGetPartnerByIdQuery,
  useUpdatePartnerStatusMutation,
} = partnerFormApi;