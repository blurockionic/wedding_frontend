import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userDataTemplateSlice = createApi({
  reducerPath: "templateSlice",

  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/v1/userDataTemplate`,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    
    getTemplates: builder.query({
      query: () => "/",
    }),

    getTemplateById: builder.query({
      query: (templateId) => `/${templateId}`,
    }),

    addTemplate: builder.mutation({
      query: (templateData) => ({
        url: "/",
        method: "POST",
        body: templateData,
      }),
    }),

    updateTemplate: builder.mutation({
      query: ({ templateId, templateData }) => ({
        url: `/${templateId}`,
        method: "PATCH",
        body: templateData,
      }),
    }),

    deleteTemplate: builder.mutation({
      query: (templateId) => ({
        url: `/${templateId}`,
        method: "DELETE",
      }),
    }),

  }),
});

export const {
  useGetTemplatesQuery,
  useGetTemplateByIdQuery,
  useAddTemplateMutation,
  useUpdateTemplateMutation,
  useDeleteTemplateMutation,
} = userDataTemplateSlice;
