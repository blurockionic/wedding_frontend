import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [], // Store array of favorite service IDs
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
        state.favorites.push(action.payload);
      },
      removeFavorite: (state, action) => {
        state.favorites = state.favorites.filter(item => item.id !== action.payload);
      },
    resetFavorites: (state) => {
      state.favorites = [];
    },
    hydrateFavorites: (state, action) => {
      state.favorites = action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, hydrateFavorites, resetFavorites } = favoritesSlice.actions;
export default favoritesSlice;
