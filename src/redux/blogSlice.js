import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getBaseUrl = (user) => {
  const userRole = user?.role?.toUpperCase();
  console.log("User Role:", userRole);
  switch (userRole) {
    case "ADMIN":
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
    const rawBaseQuery = fetchBaseQuery({
      baseUrl: dynamicBaseUrl,
      credentials: "include",
    });
    return rawBaseQuery(args, api, extraOptions);
  },

  endpoints: (builder) => ({
    // 🔓 PUBLIC
    getBlogs: builder.query({ query: () => `/blogs` }),
    getBlogByUrlTitle: builder.query({ query: (urlTitle) => `/blogs/${urlTitle}` }),
    getAllTags: builder.query({ query: () => `/tags` }),
    getTagByName: builder.query({ query: (tagName) => `/tags/${tagName}` }),
    getBlogsByTag: builder.query({ query: (tagName) => `/blogs/tag/${tagName}` }),
    getBlogCount: builder.query({ query: () => `/blog-count` }),
    getTotalViewCount: builder.query({ query: () => `/view-count` }),

    // 🔐 ADMIN
    addBlog: builder.mutation({ query: (body) => ({ url: `/blogs`, method: "POST", body }) }),
    updateBlog: builder.mutation({ query: ({ id, blogData }) => ({ url: `/blogs/${id}`, method: "PATCH", body: blogData }) }),
    deleteBlog: builder.mutation({ query: (id) => ({ url: `/blogs/${id}`, method: "DELETE" }) }),
    addTag: builder.mutation({ query: (body) => ({ url: `/tags`, method: "POST", body }) }),
    updateTag: builder.mutation({ query: ({ id, body }) => ({ url: `/tags/${id}`, method: "PUT", body }) }),
    deleteTag: builder.mutation({ query: () => ({ url: `/tags`, method: "DELETE" }) }),

    // 🔑 USER
    addComment: builder.mutation({ query: ({ blogId, body }) => ({ url: `/blogs/${blogId}/comments`, method: "POST", body }) }),
    deleteComment: builder.mutation({ query: (commentId) => ({ url: `/blogs/comments/${commentId}`, method: "DELETE" }) }),
    toggleLikeBlog: builder.mutation({ query: (blogId) => ({ url: `/blogs/${blogId}/like`, method: "POST" }) }),
    searchBlogs: builder.query({ query: (params) => ({ url: `/blogs/search`, params }) }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogByUrlTitleQuery,
  useGetAllTagsQuery,
  useGetTagByNameQuery,
  useGetBlogsByTagQuery,
  useGetBlogCountQuery,
  useGetTotalViewCountQuery,

  useAddBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useAddTagMutation,
  useUpdateTagMutation,
  useDeleteTagMutation,

  useAddCommentMutation,
  useDeleteCommentMutation,
  useToggleLikeBlogMutation,
  useSearchBlogsQuery,
} = blogApiSlice;
