import axios from "axios";
import { server } from "../../server.js";

export const createCoupon = (couponData) => async (dispatch) => {
  try {
    dispatch({ type: "couponCreateRequest" });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      `${server}/coupon/create-coupoun`,
      couponData,
      config
    );
    const data = response.data;

    if (response.status === 200 || response.status === 201) {
      dispatch({ type: "couponCreateSuccess", payload: data });
    } else {
      dispatch({ type: "couponCreateFail", payload: data.message });
    }
  } catch (error) {
    dispatch({ type: "couponCreateFail", payload: error.message });
  }
};

export const getAllCoupons = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getAllCouponsRequest" });
    const response = await axios.get(`${server}/coupon/getAllCoupouns/${id}`);
    const data = response.data;
    if (response.status === 200 || response.status === 201) {
      dispatch({ type: "getAllCouponsSuccess", payload: data });
    } else {
      dispatch({ type: "getAllCouponsFail", payload: data.message });
    }
  } catch (error) {
    dispatch({ type: "getAllCouponsFail", payload: error.message });
  }
};

export const resetCouponSuccess = () => (dispatch) => {
  dispatch({ type: "resetCouponSuccess" });
};

export const deleteCoupon = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteCouponRequest" });
    const response = await axios.delete(`${server}/coupon/deleteCoupoun/${id}`);
    const data = response.data;
    if (response.status === 200 || response.status === 201) {
      dispatch({ type: "deleteCouponSuccess", payload: data });
    } else {
      dispatch({ type: "deleteCouponFail", payload: data.message });
    }
  } catch (error) {
    dispatch({ type: "deleteCouponFail", payload: error.message });
  }
};

export const resetCouponState = () => (dispatch) => {
  dispatch({ type: "resetCouponState" });
};
