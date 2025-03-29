import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";

export const userDataTemplateSlice = createApi({
  reducerPath: "templateSlice",

  baseQuery: baseQueryWithReauth,

  endpoints: (builder) => ({
    
    getTemplates: builder.query({
      query: () => "/userDataTemplate/",
    }),

    getTemplateById: builder.query({
      query: (templateId) => `/userDataTemplate/${templateId}`,
    }),

    addTemplate: builder.mutation({
      query: (templateData) => ({
        url: "/userDataTemplate/",
        method: "POST",
        body: templateData,
      }),
    }),

    updateTemplate: builder.mutation({
      query: ({ templateId, templateData }) => ({
        url: `/userDataTemplate/${templateId}`,
        method: "PATCH",
        body: templateData,
      }),
    }),

    deleteTemplate: builder.mutation({
      query: (templateId) => ({
        url: `/userDataTemplate/${templateId}`,
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
