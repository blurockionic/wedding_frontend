import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getBaseUrl = (role) => {
  switch (role) {
    case "ADMIN":
      return `${import.meta.env.VITE_API_URL}/api/v1/blog/admin`;
    case "USER":
      return `${import.meta.env.VITE_API_URL}/api/v1/blog/user`;
    default:
      return `${import.meta.env.VITE_API_URL}/api/v1/blog/public`;
  }
};

export const blogApiSlice = createApi({
  reducerPath: "blogApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(import.meta.env.VITE_USER_ROLE),
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // Create a new blog
    createBlog: builder.mutation({
      query: (blogData) => ({
        url: `/add`,
        method: "POST",
        body: blogData,
      }),
    }),

    // Fetch all blogs
    getAllBlogs: builder.query({
      query: () => ({
        url: `/allBlog`,
        method: "GET",
      }),
    }),

    // Fetch a single blog by ID
    getBlogById: builder.query({
      query: (id) => ({
        url: `/allBlog/${id}`,
        method: "GET",
      }),
    }),

    // Update a blog
    updateBlog: builder.mutation({
      query: ({ id, blogData }) => ({
        url: `/allBlog/${id}`,
        method: "PUT",
        body: blogData,
      }),
    }),

    // Delete a blog
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/allBlog/${id}`,
        method: "DELETE",
      }),
    }),

    // Toggle like on a blog
    toggleLikeBlog: builder.mutation({
      query: (id) => ({
        url: `/allBlog/${id}/togglelike`,
        method: "POST",
      }),
    }),

    // Add a comment to a blog
    addComment: builder.mutation({
      query: ({ id, content }) => ({
        url: `/allBlog/${id}/comment`,
        method: "POST",
        body: { content },
      }),
    }),

    // Delete a comment
    deleteComment: builder.mutation({
      query: ({ id, commentId }) => ({
        url: `/allBlog/${id}/comment/${commentId}`,
        method: "DELETE",
      }),
    }),

    // Get blog count
    getBlogCount: builder.query({
      query: () => ({
        url: `/blog_count`,
        method: "GET",
      }),
    }),

    // Get view count
    getViewCount: builder.query({
      query: () => ({
        url: `/view_count`,
        method: "GET",
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
  useToggleLikeBlogMutation,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useGetBlogCountQuery,
  useGetViewCountQuery,
} = blogApiSlice;