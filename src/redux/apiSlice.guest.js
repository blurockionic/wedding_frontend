import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiGuestSlice = createApi({
  reducerPath: "guestSlice",

  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/v1/guest`,
    credentials: "include",
  }),

  endpoints: (builder) => ({

    getGuests: builder.query({
      query: () => "/",
    }),


    addGuest: builder.mutation({
      query: (guestData) => ({
        url: "/",
        method: "POST",
        body: guestData,
      }),
    }),


    updateGuestStatus: builder.mutation({
      query: ({ guestId, status }) => ({
        url: `/${guestId}`,
        method: "PUT",
        body: { status },
      }),
    }),


    deleteGuest: builder.mutation({
      query: (guestId) => ({
        url: `/${guestId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetGuestsQuery,
  useAddGuestMutation,
  useUpdateGuestStatusMutation,
  useDeleteGuestMutation,
} = apiGuestSlice;
