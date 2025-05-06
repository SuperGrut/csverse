import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null, // Store the whole user object from Supabase/backend sync
  isAuthenticated: false,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = !!action.payload; // Set isAuthenticated based on payload
      state.status = "succeeded";
      state.error = null;
    },
    clearUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
    },
    setUserLoading: (state) => {
      state.status = "loading";
    },
    setUserError: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
      state.currentUser = null;
      state.isAuthenticated = false;
    },
    // You could add more reducers here later, e.g., for updating profile parts
  },
});

export const { setUserDetails, clearUser, setUserLoading, setUserError } =
  userSlice.actions;

// Selector to get the current user
export const selectCurrentUser = (state) => state.user.currentUser;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectUserStatus = (state) => state.user.status;

export default userSlice.reducer;
