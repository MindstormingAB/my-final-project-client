import { createSlice } from "@reduxjs/toolkit"

export const ui = createSlice({
  name: "ui",
  initialState: {
    isLoading: false,
    isFullScreen: false
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setFullScreen: (state, action) => {
      state.isFullScreen = action.payload;
    }
  }
});