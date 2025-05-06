import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const resourceSlice = createSlice({
  name: "resources",
  initialState,
  reducers: {
    setResources: (state, action) => {
      state.items = action.payload;
      state.status = "succeeded";
      state.error = null;
    },
    addResource: (state, action) => {
      // Avoid duplicates if resources have unique IDs
      // const exists = state.items.find((item) => item.id === action.payload.id);

      state.items.data.push(action.payload);
    },
    removeResource: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload); // Assuming payload is the ID
    },
    setResourcesLoading: (state) => {
      state.status = "loading";
    },
    setResourcesError: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    // Add more reducers as needed (e.g., updateResource)
  },
  // Example of handling async actions with createAsyncThunk (optional)
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchResources.pending, (state) => {
  //       state.status = 'loading';
  //     })
  //     .addCase(fetchResources.fulfilled, (state, action) => {
  //       state.status = 'succeeded';
  //       state.items = action.payload;
  //     })
  //     .addCase(fetchResources.rejected, (state, action) => {
  //       state.status = 'failed';
  //       state.error = action.error.message;
  //     });
  // },
});

export const {
  setResources,
  addResource,
  removeResource,
  setResourcesLoading,
  setResourcesError,
} = resourceSlice.actions;

// Selectors
export const selectAllResources = (state) => state.resources.items.data;
export const selectResourceStatus = (state) => state.resources.status;

export default resourceSlice.reducer;

// Example async thunk (if you need to fetch resources)
/*
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchResources = createAsyncThunk(
  'resources/fetchResources',
  async () => {
    // Replace with your actual API call
    const response = await fetch('/api/resources');
    if (!response.ok) {
      throw new Error('Failed to fetch resources');
    }
    const data = await response.json();
    return data;
  }
);
*/
