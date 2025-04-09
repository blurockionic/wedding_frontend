import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getBaseUrl = (user) => {
  const userRole = user?.role?.toUpperCase();
  console.log("User Role:", userRole);
  switch (userRole) {
    case "ADMIN":
      return `${import.meta.env.VITE_API_URL}/api/v1/blog/admin`;
    case "SUPER_ADMIN":
        return `${import.meta.env.VITE_API_URL}/api/v1/blog/admin`;
    case "USER":
      return `${import.meta.env.VITE_API_URL}/api/v1/blog/user`;
    default:
      return `${import.meta.env.VITE_API_URL}/api/v1/blog/public`;
  }
};

export const blogApiSlice = createApi({
  reducerPath: "blogApiSlice",
  baseQuery: async (args, api, extraOptions) => {
    const state = api.getState();
    const user = state.auth?.user;
    const dynamicBaseUrl = getBaseUrl(user);
    console.log(`Using dynamic base URL: ${dynamicBaseUrl}`);
    const rawBaseQuery = fetchBaseQuery({
      baseUrl: dynamicBaseUrl,
      credentials: "include",
    });
    return rawBaseQuery(args, api, extraOptions);
  },
  
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
        method: "GET"
      }),
    }),

    // Fetch a single blog by ID
    getBlogById: builder.query({
      query: (id) => ({
        url: `/allBlog/${id}`,
        method: "GET"
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
        method: "DELETE"
      }),
    }),

    // Toggle like on a blog
    toggleLikeBlog: builder.mutation({
      query: (id) => ({
        url: `/allBlog/${id}/togglelike`,
        method: "POST"
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
        method: "DELETE"
      }),
    }),

    // Get blog count
    getBlogCount: builder.query({
      query: () => ({
        url: `/blog_count`,
        method: "GET"
      }),
    }),

    // Get view count
    getViewCount: builder.query({
      query: () => ({
        url: `/view_count`,
        method: "GET"
      }),
    }),

    // Search blogs
    searchBlogs: builder.query({
      query: (searchTerm) => ({
        url: `/searchBlog`,
        method: "GET",
        params: { q: searchTerm },
      }),
    }),

    // Fetch blogs by tag
    getBlogsByTag: builder.query({
      query: (tagName) => ({
        url: `/getBlogsByTag/${tagName}`,
        method: "GET"
      }),
    }),

    // Fetch published blogs
    getPublishedBlogs: builder.query({
      query: () => ({
        url: `/publishedBlogs`,
        method: "GET"
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
  useSearchBlogsQuery,
  useGetBlogsByTagQuery,
  useGetPublishedBlogsQuery,
} = blogApiSlice;