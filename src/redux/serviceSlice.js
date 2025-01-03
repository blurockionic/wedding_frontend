import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // Get all services with dynamic filters
    getServices: builder.query({
      query: (filters) => {
        let queryStr = "/services";

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
    getCart: builder.query({
      query: () => "/cart",
    }),

    // Add to cart
    addToCart: builder.mutation({
      query: (serviceId) => ({
        url: "/cart",
        method: "POST",
        body: { serviceId }, // Pass serviceId as a JSON body
      }),
    }),

    // Remove from cart
    removeFromCart: builder.mutation({
      query: (serviceId) => ({
        url: `/cart/?${serviceId}`,
        method: "DELETE",
      }),
    }),

    // Clear cart
    clearCart: builder.mutation({
      query: () => ({
        url: "/cart/clear",
        method: "DELETE",
      }),
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
      query: ({preparedData,id}) => ({
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

    

  
  }),
});

// Export hooks for each endpoint
export const {
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
 
} = serviceApi;
