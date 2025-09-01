import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  success: false,
  event: null,
  error: null,
};

export const eventReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("eventCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("eventCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.event = action.payload;
      state.success = true;
      state.error = null;
    })
    .addCase("eventCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
      state.event = null;
    })
    .addCase("getAllEventsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllEventsSuccess", (state, action) => {
      state.isLoading = false;
      state.event = action.payload;
      state.success = true;
      state.error = null;
    })
    .addCase("getAllEventsFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
      state.event = null;
    })
    .addCase("clearError", (state) => {
      state.error = null;
    })
    .addCase("deleteEventRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteEventSuccess", (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.event = state.event.filter(
        (item) => item._id !== action.payload._id
      );
      state.error = null;
    })
    .addCase("deleteEventFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("getAllEventsUserRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllEventsUserSuccess", (state, action) => {
      state.isLoading = false;
      state.event = action.payload;
      state.success = true;
      state.error = null;
    })
    .addCase("getAllEventsUserFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
      state.event = null;
    })
    .addCase("resetEventSuccess", (state) => {
      state.success = false;
    });
});
