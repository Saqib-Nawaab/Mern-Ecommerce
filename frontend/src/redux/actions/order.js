import axios from "axios";
import { server } from "../../server.js";

export const getAllOrders = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getAllOrdersRequest" });
    const response = await axios.post(`${server}/order/getAllOrders/${id}`);

    const data = response.data;
    if (response.status === 200 || response.status === 201) {
      dispatch({ type: "getAllOrdersSuccess", payload: data });
    } else {
      dispatch({ type: "getAllOrdersFail", payload: data.message });
    }
  } catch (error) {
    dispatch({ type: "getAllOrdersFail", payload: error.message });
  }
};

export const resetOrderSuccess = () => (dispatch) => {
  dispatch({ type: "resetOrderSuccess" });
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteOrderRequest" });
    const response = await axios.delete(`${server}/order/deleteOrder/${id}`);
    const data = response.data;
    if (response.status === 200 || response.status === 201) {
      dispatch({ type: "deleteOrderSuccess", payload: data });
    } else {
      dispatch({ type: "deleteOrderFail", payload: data.message });
    }
  } catch (error) {
    dispatch({ type: "deleteOrderFail", payload: error.message });
  }
};

export const resetOrderState = () => (dispatch) => {
  dispatch({ type: "resetOrderState" });
};

export const getSellerAllOrders = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getAllOrdersForSellerRequest" });
    const response = await axios.post(
      `${server}/order/getSellerAllOrder/${id}`
    );

    const data = response.data;
    if (response.status === 200 || response.status === 201) {
      dispatch({ type: "getAllOrdersForSellerSuccess", payload: data });
    } else {
      dispatch({ type: "getAllOrdersForSellerFail", payload: data.message });
    }
  } catch (error) {
    dispatch({ type: "getAllOrdersForSellerFail", payload: error.message });
  }
};

export const updateOrderStatus = (orderId, status) => async (dispatch) => {
  try {
    dispatch({ type: "updateOrderStatusRequest" });
    const response = await axios.put(
      `${server}/order/updateOrderStatus/${orderId}`,
      { status }
    );
    const data = response.data;
    if (response.status === 200 || response.status === 201) {
      dispatch({ type: "updateOrderStatusSuccess", payload: data });
    } else {
      dispatch({ type: "updateOrderStatusFail", payload: data.message });
    }
  } catch (error) {
    dispatch({ type: "updateOrderStatusFail", payload: error.message });
  }
};

export const refundOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: "refundOrderRequest" });
    const response = await axios.post(`${server}/order/refundOrder/${orderId}`);
    const data = response.data;
    if (response.status === 200 || response.status === 201) {
      dispatch({ type: "refundOrderSuccess", payload: data });
    } else {
      dispatch({ type: "refundOrderFail", payload: data.message });
    }
  } catch (error) {
    dispatch({ type: "refundOrderFail", payload: error.message });
  }
};
