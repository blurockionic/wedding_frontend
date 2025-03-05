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
        }
      }),
      invalidatesTags: ["WeddingPlan"],
    }),

    // Create event task
    createEventTask: builder.mutation({
      query: ({data, eventId}) => ({
        url: `/task/${eventId}`,
        method: "POST",
        body: data
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
      query: ({taskId, data}) => ({
        url: `/task/${taskId}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["EventTask"],
    }),

    // Delete event task
    deleteEventTask: builder.mutation({
      query: (taskId) => ({
        url: `/task/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EventTask"],
    }),

    // Update task status (complete/incomplete)
    updateTaskStatus: builder.mutation({
      query: ({taskId, status}) => ({
        url: `/task/status/${taskId}`,
        method: "PATCH",
        body: { status }
      }),
      invalidatesTags: ["EventTask"],
    }),
  }),
});

export const {
  useGetWeddingPlanQuery,
  useCreateEventMutation,
  useCreateEventTaskMutation,
  useGetEventTasksQuery,
  useUpdateEventTaskMutation,
  useDeleteEventTaskMutation,
  useUpdateTaskStatusMutation,
} = weddingPlanForEventApi;