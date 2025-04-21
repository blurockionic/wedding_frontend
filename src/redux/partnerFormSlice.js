import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getBaseUrl = (user) => {
  const userRole = user?.role?.toUpperCase();
  console.log("User Role:", userRole);
  switch (userRole) {
    case "ADMIN":
      return `${import.meta.env.VITE_API_URL}/api/v1/partnerform/admin`;
    case "SUPER_ADMIN":
      return `${import.meta.env.VITE_API_URL}/api/v1/partnerform/admin`;
    case "USER":
      return `${import.meta.env.VITE_API_URL}/api/v1/partnerform/user`;
    default:
      return `${import.meta.env.VITE_API_URL}/api/v1/partnerform/public`;
  }
};

export const partnerFormSlice = createApi({
  reducerPath: "partnerFormSlice",
  baseQuery: async (args, api, extraOptions) => {
    const state = api.getState();
    const user = state.auth?.user;
    const dynamicBaseUrl = getBaseUrl(user);
    const rawBaseQuery = fetchBaseQuery({
      baseUrl: dynamicBaseUrl,
      credentials: "include",
    });
    return rawBaseQuery(args, api, extraOptions);
  },
  tagTypes: ["PartnerForm", "Partner"],
  endpoints: (builder) => ({
    // 🔓 PUBLIC ENDPOINTS
    submitPartnerForm: builder.mutation({
      query: (formData) => ({
        url: `/submit`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["PartnerForm"],
    }),
    
    checkApplicationStatus: builder.query({
      query: (email) => `/status?email=${encodeURIComponent(email)}`,
    }),
    
    // 🔐 USER ENDPOINTS
    submitUserPartnerForm: builder.mutation({
      query: (formData) => ({
        url: `/submit`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["PartnerForm"],
    }),
    
    getUserPartnerForm: builder.query({
      query: () => `/my-application`,
      providesTags: ["PartnerForm"],
    }),
    
    updateUserPartnerForm: builder.mutation({
      query: (formData) => ({
        url: `/update`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["PartnerForm"],
    }),
    
    // 🔒 ADMIN ENDPOINTS
    getAllPartnerForms: builder.query({
      query: (params = {}) => {
        const queryParams = new URLSearchParams();
        if (params.status) queryParams.append('status', params.status);
        if (params.role) queryParams.append('role', params.role);
        if (params.page) queryParams.append('page', params.page);
        if (params.limit) queryParams.append('limit', params.limit);
        if (params.sortBy) queryParams.append('sortBy', params.sortBy);
        if (params.search) queryParams.append('search', params.search);
        
        return {
          url: `/applications?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ["Partner"],
    }),
    
    getPartnerFormById: builder.query({
      query: (id) => `/applications/${id}`,
      providesTags: (result, error, id) => [{ type: "Partner", id }],
    }),
    
    updatePartnerFormStatus: builder.mutation({
      query: ({ id, status, reviewNotes }) => ({
        url: `/applications/${id}/status`,
        method: "PATCH",
        body: { status, reviewNotes },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Partner", id },
        "Partner",
      ],
    }),
    
    deletePartnerForm: builder.mutation({
      query: (id) => ({
        url: `/applications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Partner"],
    }),
    
    // Dashboard statistics for admins
    getPartnerStats: builder.query({
      query: () => `/stats`,
      providesTags: ["Partner"],
    }),
    
    exportPartnerData: builder.query({
      query: (params = {}) => {
        const queryParams = new URLSearchParams();
        if (params.status) queryParams.append('status', params.status);
        if (params.role) queryParams.append('role', params.role);
        if (params.format) queryParams.append('format', params.format);
        
        return {
          url: `/export?${queryParams.toString()}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  // Public
  useSubmitPartnerFormMutation,
  useCheckApplicationStatusQuery,
  
  // User
  useSubmitUserPartnerFormMutation,
  useGetUserPartnerFormQuery,
  useUpdateUserPartnerFormMutation,
  
  // Admin
  useGetAllPartnerFormsQuery,
  useGetPartnerFormByIdQuery,
  useUpdatePartnerFormStatusMutation,
  useDeletePartnerFormMutation,
  useGetPartnerStatsQuery,
  useExportPartnerDataQuery,
} = partnerFormSlice;