import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  serviceId: null, // To store the service ID
};

const serviceIdSlice = createSlice({
  name: "serviceId",
  initialState,
  reducers: {
    setServiceId(state, action) {
      state.serviceId = action.payload;
    },
    deleteServiceId(state) {
      state.serviceId = null; // Remove serviceId when service is deleted
    },
  },
});

export const { setServiceId, deleteServiceId } = serviceIdSlice.actions;
export default serviceIdSlice
