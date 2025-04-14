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
    getBlogs: builder.query({
      query: (params = {}) => {
        // Convert params object to URL query string
        const queryParams = new URLSearchParams();
        if (params.s !== undefined) queryParams.append('s', params.s);
        if (params.t !== undefined) queryParams.append('t', params.t);
        if (params.tag) queryParams.append('tag', params.tag);
        if (params.status) queryParams.append('status', params.status);
        
        return {
          url: `/?${queryParams.toString()}`,
          method: 'GET',
        };
      },
    }),
    getBlogByUrlTitle: builder.query({ query: (urlTitle) => `/${urlTitle}` }),
    getAllTags: builder.query({ query: () => `/tags` }),
    getTagByName: builder.query({ query: (tagName) => `/tags/${tagName}` }),
    getBlogsByTag: builder.query({ query: (tagName) => `/tag/${tagName}` }),    

    // 🔐 ADMIN
    addBlog: builder.mutation({ query: (body) => ({ url: `/`, method: "POST", body }) }),
    updateBlog: builder.mutation({ query: ({ id, blogData }) => ({ url: `/${id}`, method: "PATCH", body: blogData }) }),
    deleteBlog: builder.mutation({ query: (id) => ({ url: `/${id}`, method: "DELETE" }) }),
    addTag: builder.mutation({ query: (body) => ({ url: `/tags`, method: "POST", body }) }),
    updateTag: builder.mutation({ query: ({ id, body }) => ({ url: `/tags/${id}`, method: "PUT", body }) }),
    deleteTag: builder.mutation({ query: () => ({ url: `/tags`, method: "DELETE" }) }),
    getTotalViewCount: builder.query({ query: () => `/viewCount` }),
    getBlogCount: builder.query({ query: () => `blog-count/` }),

    // 🔑 USER
    addComment: builder.mutation({ query: ({ blogId, content }) => ({ url: `/${blogId}/comments`, method: "POST", body: content }) }),
    deleteComment: builder.mutation({ query: (commentId) => ({ url: `/comments/${commentId}`, method: "DELETE" }) }),
    toggleLikeBlog: builder.mutation({ query: (blogId) => ({ url: `/${blogId}/like`, method: "POST" }) }),
    searchBlogs: builder.query({ query: (params) => ({ url: `/search`, params }) }),
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
