import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null,
  stripeApiKey: "",
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadUserSuccess", (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    })
    .addCase("LoadUserFail", (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    })
    .addCase("LogoutUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LogoutUserSuccess", (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    })
    .addCase("LogoutUserFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("UpdateAvatarRequest", (state) => {
      state.loading = true;
    })
    .addCase("UpdateAvatarSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("UpdateAvatarFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("AddNewUserAddressRequest", (state) => {
      state.loading = true;
    })
    .addCase("AddNewUserAddressSuccess", (state, action) => {
      state.loading = false;
      state.user = {
        ...state.user,
        addresses: [...state.user.addresses, action.payload],
      };
    })
    .addCase("AddNewUserAddressFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("DeleteUserAddressRequest", (state) => {
      state.loading = true;
    })
    .addCase("DeleteUserAddressSuccess", (state, action) => {
      state.loading = false;
      state.user = {
        ...state.user,
        addresses: state.user.addresses.filter(
          (address) => address._id !== action.payload._id
        ),
      };
    })
    .addCase("DeleteUserAddressFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("ChangePasswordRequest", (state) => {
      state.loading = true;
    })
    .addCase("ChangePasswordSuccess", (state) => {
      state.loading = false;
    })
    .addCase("ChangePasswordFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("GetStripeApiKeyRequest", (state) => {
      state.loading = true;
    })
    .addCase("GetStripeApiKeySuccess", (state, action) => {
      state.loading = false;
      state.stripeApiKey = action.payload;
    })
    .addCase("GetStripeApiKeyFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
