import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the payment API with RTK Query
export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/v1/`, // Backend URL
    credentials: "include", 
  }),

  endpoints: (builder) => ({
    // Endpoint to create an order
    createOrder: builder.mutation({
      query: ({ planId }) => ({
        url: `/subscribe/create-order/${planId}`, // Dynamic URL to create order
        method: "POST", // POST method to create an order
      }),
    }),

    // Endpoint to get plans (e.g., available subscription plans)
    getPlans: builder.query({
      query: () => "/plan",
    }),

    getPaymentHistory: builder.query({
      query: () => "/subscribe/payment-history",
    }),

    getSubscription: builder.query({
      query: () => "/subscribe/subscription",
    }),

  }),
});

// Export hooks generated by RTK Query for use in components
export const { useCreateOrderMutation, useGetPlansQuery,useGetPaymentHistoryQuery ,
  useGetSubscriptionQuery
} = paymentApi;
