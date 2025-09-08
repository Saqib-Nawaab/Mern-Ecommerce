import axios from "axios";
import { server } from "../../server";

// Get dashboard stats
export const getDashboardStats = () => async (dispatch) => {
  try {
    dispatch({ type: "GetDashboardStatsRequest" });
    const { data } = await axios.get(`${server}/admin/dashboard-stats`, {
      withCredentials: true,
    });

    dispatch({
      type: "GetDashboardStatsSuccess",
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: "GetDashboardStatsFail",
      payload: error?.response?.data?.message || "Failed to get dashboard stats",
    });
  }
};

// Get all users
export const getAllUsers = (page = 1, limit = 10) => async (dispatch) => {
  try {
    dispatch({ type: "GetAllUsersRequest" });
    const { data } = await axios.get(`${server}/admin/users?page=${page}&limit=${limit}`, {
      withCredentials: true,
    });

    dispatch({
      type: "GetAllUsersSuccess",
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: "GetAllUsersFail",
      payload: error?.response?.data?.message || "Failed to get users",
    });
  }
};

// Get all sellers
export const getAllSellers = (page = 1, limit = 10) => async (dispatch) => {
  try {
    dispatch({ type: "GetAllSellersRequest" });
    const { data } = await axios.get(`${server}/admin/sellers?page=${page}&limit=${limit}`, {
      withCredentials: true,
    });

    dispatch({
      type: "GetAllSellersSuccess",
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: "GetAllSellersFail",
      payload: error?.response?.data?.message || "Failed to get sellers",
    });
  }
};

// Get all products
export const getAllProducts = (page = 1, limit = 10) => async (dispatch) => {
  try {
    dispatch({ type: "GetAllProductsRequest" });
    const { data } = await axios.get(`${server}/admin/products?page=${page}&limit=${limit}`, {
      withCredentials: true,
    });

    dispatch({
      type: "GetAllProductsSuccess",
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: "GetAllProductsFail",
      payload: error?.response?.data?.message || "Failed to get products",
    });
  }
};

// Get all orders
export const getAllOrders = (page = 1, limit = 10) => async (dispatch) => {
  try {
    dispatch({ type: "GetAllOrdersRequest" });
    const { data } = await axios.get(`${server}/admin/orders?page=${page}&limit=${limit}`, {
      withCredentials: true,
    });

    dispatch({
      type: "GetAllOrdersSuccess",
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: "GetAllOrdersFail",
      payload: error?.response?.data?.message || "Failed to get orders",
    });
  }
};

// Get all events
export const getAllEvents = (page = 1, limit = 10) => async (dispatch) => {
  try {
    dispatch({ type: "GetAllEventsRequest" });
    const { data } = await axios.get(`${server}/admin/events?page=${page}&limit=${limit}`, {
      withCredentials: true,
    });

    dispatch({
      type: "GetAllEventsSuccess",
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: "GetAllEventsFail",
      payload: error?.response?.data?.message || "Failed to get events",
    });
  }
};

// Delete user
export const deleteUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "DeleteUserRequest" });
    const { data } = await axios.delete(`${server}/admin/user/${userId}`, {
      withCredentials: true,
    });

    dispatch({
      type: "DeleteUserSuccess",
      payload: { userId, message: data.message },
    });
  } catch (error) {
    dispatch({
      type: "DeleteUserFail",
      payload: error?.response?.data?.message || "Failed to delete user",
    });
  }
};

// Delete seller
export const deleteSeller = (sellerId) => async (dispatch) => {
  try {
    dispatch({ type: "DeleteSellerRequest" });
    const { data } = await axios.delete(`${server}/admin/seller/${sellerId}`, {
      withCredentials: true,
    });

    dispatch({
      type: "DeleteSellerSuccess",
      payload: { sellerId, message: data.message },
    });
  } catch (error) {
    dispatch({
      type: "DeleteSellerFail",
      payload: error?.response?.data?.message || "Failed to delete seller",
    });
  }
};

// Delete product
export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: "DeleteProductRequest" });
    const { data } = await axios.delete(`${server}/admin/product/${productId}`, {
      withCredentials: true,
    });

    dispatch({
      type: "DeleteProductSuccess",
      payload: { productId, message: data.message },
    });
  } catch (error) {
    dispatch({
      type: "DeleteProductFail",
      payload: error?.response?.data?.message || "Failed to delete product",
    });
  }
};

// Delete event
export const deleteEvent = (eventId) => async (dispatch) => {
  try {
    dispatch({ type: "DeleteEventRequest" });
    const { data } = await axios.delete(`${server}/event/deleteEvent/${eventId}`, {
      withCredentials: true,
    });

    dispatch({
      type: "DeleteEventSuccess",
      payload: { eventId, message: data.message },
    });
  } catch (error) {
    dispatch({
      type: "DeleteEventFail",
      payload: error?.response?.data?.message || "Failed to delete event",
    });
  }
};

// Update user role
export const updateUserRole = (userId, role) => async (dispatch) => {
  try {
    dispatch({ type: "UpdateUserRoleRequest" });
    const { data } = await axios.put(`${server}/admin/user/${userId}/role`, { role }, {
      withCredentials: true,
    });

    dispatch({
      type: "UpdateUserRoleSuccess",
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: "UpdateUserRoleFail",
      payload: error?.response?.data?.message || "Failed to update user role",
    });
  }
};








