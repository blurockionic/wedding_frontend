import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApiSlice = createApi({
  reducerPath: "blogApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/v1/blogs`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: (blogData) => ({
        url: `/create`,
        method: "POST",
        body: blogData,
      }),
    }),
    getAllBlogs: builder.query({
      query: () => ({
        url: `/getAll`,
        method: "GET",
      }),
    }),
    getBlogById: builder.query({
      query: (id) => ({
        url: `/get/${id}`,
        method: "GET",
      }),
    }),
    updateBlog: builder.mutation({
      query: ({ id, blogData }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: blogData,
      }),
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useGetAllBlogsQuery,
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApiSlice;
