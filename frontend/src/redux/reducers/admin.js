import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  dashboardStats: null,
  users: [],
  sellers: [],
  products: [],
  orders: [],
  events: [],
  pagination: {
    users: { currentPage: 1, totalPages: 1, totalUsers: 0 },
    sellers: { currentPage: 1, totalPages: 1, totalSellers: 0 },
    products: { currentPage: 1, totalPages: 1, totalProducts: 0 },
    orders: { currentPage: 1, totalPages: 1, totalOrders: 0 },
    events: { currentPage: 1, totalPages: 1, totalEvents: 0 },
  },
};

export const adminReducer = createReducer(initialState, (builder) => {
  builder
    // Dashboard Stats
    .addCase("GetDashboardStatsRequest", (state) => {
      state.loading = true;
    })
    .addCase("GetDashboardStatsSuccess", (state, action) => {
      state.loading = false;
      state.dashboardStats = action.payload;
    })
    .addCase("GetDashboardStatsFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Get All Users
    .addCase("GetAllUsersRequest", (state) => {
      state.loading = true;
    })
    .addCase("GetAllUsersSuccess", (state, action) => {
      state.loading = false;
      state.users = action.payload.users;
      state.pagination.users = action.payload.pagination;
    })
    .addCase("GetAllUsersFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Get All Sellers
    .addCase("GetAllSellersRequest", (state) => {
      state.loading = true;
    })
    .addCase("GetAllSellersSuccess", (state, action) => {
      state.loading = false;
      state.sellers = action.payload.sellers;
      state.pagination.sellers = action.payload.pagination;
    })
    .addCase("GetAllSellersFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Get All Products
    .addCase("GetAllProductsRequest", (state) => {
      state.loading = true;
    })
    .addCase("GetAllProductsSuccess", (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.pagination.products = action.payload.pagination;
    })
    .addCase("GetAllProductsFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Get All Orders
    .addCase("GetAllOrdersRequest", (state) => {
      state.loading = true;
    })
    .addCase("GetAllOrdersSuccess", (state, action) => {
      state.loading = false;
      state.orders = action.payload.orders;
      state.pagination.orders = action.payload.pagination;
    })
    .addCase("GetAllOrdersFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Get All Events
    .addCase("GetAllEventsRequest", (state) => {
      state.loading = true;
    })
    .addCase("GetAllEventsSuccess", (state, action) => {
      state.loading = false;
      state.events = action.payload.events;
      state.pagination.events = action.payload.pagination;
    })
    .addCase("GetAllEventsFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Delete User
    .addCase("DeleteUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("DeleteUserSuccess", (state, action) => {
      state.loading = false;
      state.users = state.users.filter(user => user._id !== action.payload.userId);
      state.pagination.users.totalUsers -= 1;
    })
    .addCase("DeleteUserFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Delete Seller
    .addCase("DeleteSellerRequest", (state) => {
      state.loading = true;
    })
    .addCase("DeleteSellerSuccess", (state, action) => {
      state.loading = false;
      state.sellers = state.sellers.filter(seller => seller._id !== action.payload.sellerId);
      state.pagination.sellers.totalSellers -= 1;
    })
    .addCase("DeleteSellerFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Delete Product
    .addCase("DeleteProductRequest", (state) => {
      state.loading = true;
    })
    .addCase("DeleteProductSuccess", (state, action) => {
      state.loading = false;
      state.products = state.products.filter(product => product._id !== action.payload.productId);
      state.pagination.products.totalProducts -= 1;
    })
    .addCase("DeleteProductFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Update User Role
    .addCase("UpdateUserRoleRequest", (state) => {
      state.loading = true;
    })
    .addCase("UpdateUserRoleSuccess", (state, action) => {
      state.loading = false;
      const userIndex = state.users.findIndex(user => user._id === action.payload._id);
      if (userIndex !== -1) {
        state.users[userIndex] = action.payload;
      }
    })
    .addCase("UpdateUserRoleFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Delete Event
    .addCase("DeleteEventRequest", (state) => {
      state.loading = true;
    })
    .addCase("DeleteEventSuccess", (state, action) => {
      state.loading = false;
      state.events = state.events.filter(event => event._id !== action.payload.eventId);
      state.pagination.events.totalEvents -= 1;
    })
    .addCase("DeleteEventFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});
