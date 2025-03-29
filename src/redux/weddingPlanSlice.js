import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";


export const weddingPlanForEventApi = createApi({
  reducerPath: "weddingPlanApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["WeddingPlan", "EventTask"],
  endpoints: (builder) => ({
    // Get all events
    getWeddingPlan: builder.query({
      query: () => ({
        url: "/event/getevents",
        method: "GET",
      }),
      providesTags: ["WeddingPlan"],
    }),

    // Create event for wedding plan
    createEvent: builder.mutation({
      query: (data) => ({
        url: "/event/newevent",
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
        url: `/event/${eventId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["WeddingPlan"],
    }),

    updateEvent: builder.mutation({
      query: ({ eventId, data }) => ({
        url: `/event/${eventId}`,
        method: "PUT",
        body: data,  // This will include all the required fields
      }),
      invalidatesTags: ["WeddingPlan"],
    }),

    // Create sub-event of an event
    createSubEvent: builder.mutation({
      query: ({ data, eventId }) => ({
        url: `/event/${eventId}/subevent`,
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
        url: `/event/${eventId}/vendors`,
        method: "POST",
        body: { serviceId },
      }),
      invalidatesTags: ["WeddingPlan"],
    }),

    // Create event task
    
    createEventTask: builder.mutation({
      query: ({ data, eventId }) => ({
        url: `/event/task/${eventId}`,
        method: "POST",
        body: data,  // Simply pass the data object directly
      }),
      invalidatesTags: ["EventTask"],
    }),

    // Get all tasks for a specific event
    getEventTasks: builder.query({
      query: (eventId) => ({
        url: `/event/tasks/${eventId}`,
        method: "GET",
      }),
      providesTags: ["EventTask"],
    }),

    // Update event task
    updateEventTask: builder.mutation({
      query: ({ taskId, data }) => ({
        url: `/event/task/${taskId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["EventTask"],
    }),

    // Delete event task
    deleteEventTask: builder.mutation({
      query: ({ eventId, taskId }) => ({
        url: `/event/task/${eventId}/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EventTask"],
    }),

    // Update task status (complete/incomplete)
    updateTaskStatus: builder.mutation({
      query: ({ taskId, status }) => ({
        url: `/event/task/status/${taskId}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["EventTask"],
    }),

    //delete event 
    deleteEventService: builder.mutation({
      query: ({serviceId, eventId}) => ({
        url: `/event/vendor/${eventId}/${serviceId}`,
        method: "DELETE",
      })
    })
  }),
});

export const {
  useGetWeddingPlanQuery,
  useCreateEventMutation,
  useDeleteEventMutation,
  useUpdateEventMutation,
  useCreateSubEventMutation,
  useAddServiceMutation,
  useCreateEventTaskMutation,
  useGetEventTasksQuery,
  useUpdateEventTaskMutation,
  useDeleteEventTaskMutation,
  useUpdateTaskStatusMutation,
  useDeleteEventServiceMutation,
} = weddingPlanForEventApi;
