import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import resourceReducer from "./resourceSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    resources: resourceReducer,
    // Add other reducers here if you create more slices
  },
  // Optional: Add middleware (e.g., for logging, async actions)
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  // Optional: Enable Redux DevTools Extension
  // devTools: process.env.NODE_ENV !== "production",
});
