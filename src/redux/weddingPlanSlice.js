import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const weddingPlanForEventApi = createApi({
  reducerPath: "weddingPlanApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/v1/event`,
    credentials: "include",
  }),
  tagTypes: ["WeddingPlan"],
  endpoints: (builder) => ({
    // Get all events
    getWeddingPlan: builder.query({
      query: () => ({
        url: "/getevents",
        method: "GET",
      }),
      providesTags: ["WeddingPlan"], 
    }),

    //create event for wedding plan
    createEvent:  builder.mutation({
      query:(data) => ({
        url: "/newevent",
        method: 'POST',
        body: {
          eventName: data.eventName,
          eventDate: new Date(data.eventDate).toISOString(),
          eventBudget: data.eventBudget,
          eventStartTime: new Date(`${data.eventDate}T${data.startTime}`).toISOString(),
          eventEndTime: new Date(`${data.eventDate}T${data.endTime}`).toISOString(),
          eventDescription: data.eventDescription
        }
      })
    })
  }),
});

export const { 
  useGetWeddingPlanQuery,
  useCreateEventMutation,
} = weddingPlanForEventApi;
