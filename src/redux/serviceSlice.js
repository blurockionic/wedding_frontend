import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/v1`,
    credentials: "include",
  }),
  tagTypes: ["Cart", "Services"],
  endpoints: (builder) => ({
    // Get all services with dynamic filters
    getServices: builder.query({
      query: (filters) => {
        let queryStr = "/services";
        console.log(filters)
        // Check if filters are provided
        if (filters && Object.keys(filters).length > 0) {
          // Filter out undefined or empty values
          const filtered = Object.fromEntries(
            Object.entries(filters).filter(([_, v]) => v != null && v !== "")
          );

          const filterParams = new URLSearchParams(filtered).toString();
          queryStr = `${queryStr}?${filterParams}`;
        }

        return queryStr;
      },
      
    }),

    // Get service by ID
    getServiceById: builder.query({
      query: (id) => `/services/${id}`, // Correct URL format for service by ID
    }),

    // Get cart
    getCart: builder.mutation({
      query: () => "/cart",
      providesTags: ["Cart"],
    }),

    toggleCart: builder.mutation({
      query: (id) => ({
        url: `/cart`,
        method: "POST",
        body: { id },
      }),
      invalidatesTags: ["Cart"],
    }),

    // Clear cart
    clearCart: builder.mutation({
      query: () => ({
        url: "/cart/clear",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    // creat service
    createService: builder.mutation({
      query: (serviceData) => ({
        url: "/services",
        method: "POST",
        body: serviceData,
      }),
    }),
    // update service
    updateService: builder.mutation({
      query: ({ preparedData, id }) => ({
        url: `/services/${id}`,
        method: "PUT",
        body: preparedData,
      }),
    }),
    // delete service
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
    }),

    //GET ANALYTICS
    getAnalytics: builder.query({
      query: () => "analytics/getViewData",
    }),

    //lead udapte
    updateLeadStatus: builder.mutation({
      query: (id) => ({
        url: `/services/makeLead/${id}`,
        method: "PUT",
      }),
    }),
    //recent activity
    getRecentLeads: builder.query({
      query: () => "/analytics/getlead",
    }),
    //create FAQ
    createFAQ: builder.mutation({
      query: ({ id, data }) => ({
        url: `/services/${id}/faq`,
        method: "POST",
        body: data,
      }),
    }),
    // update FAQ
    updateFAQ: builder.mutation({
      query: ({ id, faqId, data }) => ({
        url: `/services/${id}/faq/${faqId}`,
        method: "POST",
        body: data,
      }),
    }),
    //DELETE FAQ
    deleteFAQ: builder.mutation({
      query: ({ id, faqId }) => ({
        url: `/services/${id}/faq/${faqId}`,
        method: "DELETE",
      }),
    }),

    //submit feedback
    createFeedback: builder.mutation({
      query: ({ id, data }) => ({
        url: `/services/feedback/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    //update feedback
    updateFeedback: builder.mutation({
      query: ({ id, feedbackId, data }) => ({
        url: `/services/feedback/${id}/${feedbackId}`,
        method: "POST",
        body: data,
      }),
    }),

    generateAIDescription: builder.mutation({
      query: (data) => ({
        url: "/generateAIDescription",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json"
        }
      }),
    }),

    switchService: builder.mutation({
      query: (id) => ({
        url: `/services/serviceArchive/${id}`,
        method: "PUT",
      }),
    }),

    getMostViewdServices:builder.query({
      query:()=>({
        url:`services/getMostViewedServices`,
        method:"GET"

      })

    })


  }),
});

// Export hooks for each endpoint
export const {
 useGetMostViewdServicesQuery,
  useGetServicesQuery,
  useSwitchServiceMutation,
  useGetServiceByIdQuery,
  useGetCartMutation,
  useToggleCartMutation,
  useClearCartMutation,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useGetAnalyticsQuery,
  useUpdateLeadStatusMutation,
  useGetRecentLeadsQuery,
  useCreateFAQMutation,
  useUpdateFAQMutation,
  useDeleteFAQMutation,
  useCreateFeedbackMutation,
  useUpdateFeedbackMutation,
 useGenerateAIDescriptionMutation
} = serviceApi;
