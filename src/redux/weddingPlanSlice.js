import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const weddingPlanForEventApi = createApi({
  reducerPath: "weddingPlanApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/v1/event`,
    credentials: "include",
  }),
  tagTypes: ["WeddingPlan", "EventTask"],
  endpoints: (builder) => ({
    // Get all events
    getWeddingPlan: builder.query({
      query: () => ({
        url: "/getevents",
        method: "GET",
      }),
      providesTags: ["WeddingPlan"],
    }),

    // Create event for wedding plan
    createEvent: builder.mutation({
      query: (data) => ({
        url: "/newevent",
        method: "POST",
        body: {
          eventName: data.eventName,
          eventDate: new Date(data.eventDate).toISOString(),
          eventBudget: data.eventBudget,
          eventStartTime: new Date(`${data.eventDate}T${data.startTime}`).toISOString(),
          eventEndTime: new Date(`${data.eventDate}T${data.endTime}`).toISOString(),
          eventDescription: data.eventDescription
        },
      }),
      invalidatesTags: ["WeddingPlan"], 
    }),

    // Delete event 
    deleteEvent: builder.mutation({
      query: (eventId) => ({
        url: `/${eventId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["WeddingPlan"],
    }),

    // Create sub-event of an event
    createSubEvent: builder.mutation({
      query: ({ data, eventId }) => ({
        url: `/${eventId}/subevent`,
        method: "POST",
        body: {
          subEventName: data.subEventName,
          subEventDate: new Date(data.subEventDate).toISOString(),
          subEventBudget: data.subEventBudget,
          subEventStartTime: new Date(`${data.subEventDate}T${data.subEventStartTime}`).toISOString(),
          subEventEndTime: new Date(`${data.subEventDate}T${data.subEventEndTime}`).toISOString(),
          subEventDescription: data.subEventDescription
        },
      }),
      invalidatesTags: ["WeddingPlan"],
    }),

    // Add service to event
    addService: builder.mutation({
      query: ({ serviceId, eventId }) => ({
        url: `/${eventId}/vendors`,
        method: "POST",
        body: { serviceId },
      }),
      invalidatesTags: ["WeddingPlan"],
    }),

    // Create event task
    
    createEventTask: builder.mutation({
      query: ({ data, eventId }) => ({
        url: `/task/${eventId}`,
        method: "POST",
        body: data,  // Simply pass the data object directly
      }),
      invalidatesTags: ["EventTask"],
    }),

    // Get all tasks for a specific event
    getEventTasks: builder.query({
      query: (eventId) => ({
        url: `/tasks/${eventId}`,
        method: "GET",
      }),
      providesTags: ["EventTask"],
    }),

    // Update event task
    updateEventTask: builder.mutation({
      query: ({ taskId, data }) => ({
        url: `/task/${taskId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["EventTask"],
    }),

    // Delete event task
    deleteEventTask: builder.mutation({
      query: ({ eventId, taskId }) => ({
        url: `/task/${eventId}/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EventTask"],
    }),

    // Update task status (complete/incomplete)
    updateTaskStatus: builder.mutation({
      query: ({ taskId, status }) => ({
        url: `/task/status/${taskId}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["EventTask"],
    }),

    //delete event 
    deleteEventService: builder.mutation({
      query: ({serviceId, eventId}) => ({
        url: `/vendor/${eventId}/${serviceId}`,
        method: "DELETE",
      })
    })
  }),
});

export const {
  useGetWeddingPlanQuery,
  useCreateEventMutation,
  useDeleteEventMutation,
  useCreateSubEventMutation,
  useAddServiceMutation,
  useCreateEventTaskMutation,
  useGetEventTasksQuery,
  useUpdateEventTaskMutation,
  useDeleteEventTaskMutation,
  useUpdateTaskStatusMutation,
  useDeleteEventServiceMutation,
} = weddingPlanForEventApi;
