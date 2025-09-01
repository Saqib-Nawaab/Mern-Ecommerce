import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activate: 1, // default
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setActivate: (state, action) => {
      state.activate = action.payload;
    },
    resetActivate: (state) => {
      state.activate = 1;
    },
  },
});

export const { setActivate, resetActivate } = profileSlice.actions;
export default profileSlice.reducer;
