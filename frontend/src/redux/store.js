import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add more reducers here as needed
  },
});

export default store;