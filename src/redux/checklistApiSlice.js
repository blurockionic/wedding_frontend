import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";

export const checklistApiSlice = createApi({
  reducerPath: "checklistApiSlice",
  baseQuery:baseQueryWithReauth,
  endpoints: (builder) => ({
    saveChecklist: builder.mutation({
      query: (checklistData) => ({
        url: `/checklist/save`,
        method: "POST",
        body: checklistData,
      }),
    }),
    getChecklist: builder.query({
      query: () => ({
        url: `/checklist/get`,
        method: "GET",
      }),
    }),
  }),
});

export const { useSaveChecklistMutation, useGetChecklistQuery } = checklistApiSlice;
