import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isSellerAuthenticated: false,
  isLoading: false,
  seller: null,
  error: null,
};

export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadSellerRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("LoadSellerSuccess", (state, action) => {
      state.isLoading = false;
      state.isSellerAuthenticated = true;
      state.seller = action.payload;
    })
    .addCase("LoadSellerFail", (state, action) => {
      state.isLoading = false;
      state.isSellerAuthenticated = false;
      state.error = action.payload;
    })
    .addCase("SellerLoginSuccess", (state, action) => {
      state.isSellerAuthenticated = true;
      state.seller = action.payload;
      state.isLoading = false;
    })
    .addCase("SellerLogout", (state) => {
      state.isSellerAuthenticated = false;
      state.seller = null;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
