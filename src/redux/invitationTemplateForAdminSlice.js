import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";

export const invitationTemplateForAdminSlice = createApi({
  reducerPath: "invitationSlice",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // Fetch all templates
    getAllTemplates: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return `/inviteTemplate/get?${queryString}`;
      },
      providesTags: ["Templates"],
    }),

    // Fetch a single template by ID
    getTemplateById: builder.query({
      query: (id) => `/inviteTemplate/${id}`,
      providesTags: (result, error, id) => [{ type: "Templates", id }],
    }),

    // Create a new template
    createTemplate: builder.mutation({
      query: (templateData) => ({
        url: "/inviteTemplate/create",
        method: "POST",
        body: templateData,
      }),
      invalidatesTags: ["Templates"],
    }),

    // Update a template
    updateTemplate: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/inviteTemplate/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Templates", id }],
    }),

    // Delete a template
    deleteTemplate: builder.mutation({
      query: (id) => ({
        url: `/inviteTemplate/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Templates"],
    }),
  }),
});

// Auto-generated React hooks
export const {
  useGetAllTemplatesQuery,
  useGetTemplateByIdQuery,
  useCreateTemplateMutation,
  useUpdateTemplateMutation,
  useDeleteTemplateMutation,
} = invitationTemplateForAdminSlice;
