import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  success: false,
  order: null,
  error: null,
};

export const orderReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("getAllOrdersRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllOrdersSuccess", (state, action) => {
      state.isLoading = false;
      state.order = action.payload;
      state.success = true;
      state.error = null;
    })
    .addCase("getAllOrdersFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
      state.order = null;
    })
    .addCase("clearError", (state) => {
      state.error = null;
    })
    .addCase("deleteOrderRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteOrderSuccess", (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.order = state.order.filter(
        (item) => item._id !== action.payload._id
      );
      state.error = null;
    })
    .addCase("deleteOrderFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("getAllOrdersForSellerRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllOrdersForSellerSuccess", (state, action) => {
      state.isLoading = false;
      state.order = action.payload;
      state.success = true;
      state.error = null;
    })
    .addCase("getAllOrdersForSellerFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
      state.order = null;
    })
    .addCase("resetOrderState", (state) => {
      state.success = false;
      state.error = null;
      state.isLoading = false;
      state.order = null;
    })
    .addCase("updateOrderStatusRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("updateOrderStatusSuccess", (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.order = state.order.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
      state.error = null;
    })
    .addCase("updateOrderStatusFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("refundOrderRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("refundOrderSuccess", (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.order = state.order.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
      state.error = null;
    })
    .addCase("refundOrderFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("resetOrderSuccess", (state) => {
      state.success = false;
    });
});
