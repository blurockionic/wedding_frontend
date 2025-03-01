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
    }),

    //delete event 
    deleteEvent : builder.mutation({
      query: (eventId) => ({
          url: `/${eventId}`,
          method: 'DELETE'
      })
    }),

    //create sub event of event
    createSubEvent: builder.mutation({
      query: (data, eventId) => ({
        url: `/${eventId}/subevent`,
        method: 'POST',
        body: {
          subEventName: data.subEventName,
          subEventDate: new Date(data.subEventDate).toISOString(),
          subEventBudget: data.subEventBudget,
          subEventStartTime: new Date(`${data.subEventDate}T${data.subEventStartTime}`).toISOString(),
          subEventEndTime: new Date(`${data.subEventDate}T${data.subEventEndTime}`).toISOString(),
          subEventDescription: data.subEventDescription
        }
      })
    }),

    //add service on event
    addService: builder.mutation({
      query: ({ serviceId, eventId }) => ({
        url: `/${eventId}/vendors`,
        method: "POST",
        body: { serviceId },
      }),
    }),
    

  }),
});

export const { 
  useGetWeddingPlanQuery,
  useCreateEventMutation,
  useDeleteEventMutation,
  useCreateSubEventMutation,
  useAddServiceMutation
} = weddingPlanForEventApi;
