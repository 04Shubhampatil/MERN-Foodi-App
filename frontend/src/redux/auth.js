import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    favourites: [], // ✅ must always be an array
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setFavourites: (state, action) => {
      // Ensure favourites is always an array
      state.favourites = Array.isArray(action.payload) ? action.payload : [action.payload];
    },
    addFavourite: (state, action) => {
      const recipe = action.payload;
      if (!Array.isArray(state.favourites)) state.favourites = [];
      if (!state.favourites.find(r => r._id === recipe._id)) {
        state.favourites.push(recipe);
      }
    },
    removeFavourite: (state, action) => {
      const recipe = action.payload;
      if (!Array.isArray(state.favourites)) state.favourites = [];
      state.favourites = state.favourites.filter(r => r._id !== recipe._id);
    },
  },
});

export const { setLoading, setUser, setFavourites, addFavourite, removeFavourite } = authSlice.actions;
export default authSlice.reducer;
