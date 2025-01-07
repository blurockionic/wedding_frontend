import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [], // Storing favorite IDs
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        // Remove the favorite (immutably)
        state.favorites = state.favorites.filter(
          (favoriteId) => favoriteId !== id
        );
      } else {
        // Add the favorite (immutably)
        state.favorites = [...state.favorites, id];
      }
    },
    resetFavorites: (state) => {
      state.favorites = [];
    },
    hydrateFavorites: (state, action) => {
      state.favorites = action.payload;
    },
  },
});

export const { toggleFavorite, resetFavorites, hydrateFavorites } =
  favoritesSlice.actions;
export default favoritesSlice;
