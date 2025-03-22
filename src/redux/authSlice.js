// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload; 
    },
    userlogout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    userUpdate:(state,action)=>{
      state.user = action.payload;
    }
  },
});

export const { login, userlogout ,userUpdate
  
} = authSlice.actions;
export default authSlice;