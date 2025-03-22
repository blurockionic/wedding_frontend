import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";

export const apiGuestSlice = createApi({
  reducerPath: "guestSlice",
  baseQuery:baseQueryWithReauth,

  endpoints: (builder) => ({

    getGuests: builder.query({
      query: () => "/",
    }),


    addGuest: builder.mutation({
      query: (guestData) => ({
        url: "/",
        method: "POST",
        body: {...guestData},
      }),
    }),


    updateGuestStatus: builder.mutation({
      query: ({ guestId,guestInputDAta }) => ({
        url: `/${guestId}`,
        method: "PUT",
        body: { guestInputDAta },
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
