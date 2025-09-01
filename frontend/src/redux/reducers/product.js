import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  success: false,
  product: null,
  error: null,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("productCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("productCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      state.success = true;
      state.error = null;
    })
    .addCase("productCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
      state.product = null;
    })
    .addCase("getAllProductsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllProductsSuccess", (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      state.success = true;
      state.error = null;
    })
    .addCase("getAllProductsFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
      state.product = null;
    })
    .addCase("getAllProductsUserRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllProductsUserSuccess", (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      state.success = true;
      state.error = null;
    })
    .addCase("getAllProductsUserFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
      state.product = null;
    })
    .addCase("clearError", (state) => {
      state.error = null;
    })
    .addCase("deleteProductRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteProductSuccess", (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.product = state.product.filter(
        (item) => item._id !== action.payload._id
      );
      state.error = null;
    })
    .addCase("deleteProductFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("createReviewRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("createReviewSuccess", (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.product = action.payload;
    })
    .addCase("createReviewFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("getProductRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getProductSuccess", (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      state.success = true;
      state.error = null;
    })
    .addCase("getProductFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("resetProductSuccess", (state) => {
      state.success = false;
    });
});
