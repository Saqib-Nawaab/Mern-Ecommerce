import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  success: false,
  coupon: null,
  error: null,
};

export const couponReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("couponCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("couponCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.coupon = action.payload;
      state.success = true;
      state.error = null;
    })
    .addCase("couponCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
      state.coupon = null;
    })
    .addCase("getAllCouponsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllCouponsSuccess", (state, action) => {
      state.isLoading = false;
      state.coupon = action.payload;
      state.success = true;
      state.error = null;
    })
    .addCase("getAllCouponsFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
      state.coupon = null;
    })
    .addCase("clearError", (state) => {
      state.error = null;
    })
    .addCase("deleteCouponRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteCouponSuccess", (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.coupon = state.coupon.filter(
        (item) => item._id !== action.payload._id
      );
      state.error = null;
    })
    .addCase("deleteCouponFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("resetCouponState", (state) => {
      state.success = false;
      state.error = null;
      state.isLoading = false;
      state.coupon = null;
    })
    .addCase("resetCouponSuccess", (state) => {
      state.success = false;
    });
});
