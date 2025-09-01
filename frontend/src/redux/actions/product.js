import axios from "axios";
import { server } from "../../server.js";

export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: "productCreateRequest" });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axios.post(
      `${server}/product/create-product`,
      productData,
      config
    );
    const data = response.data;
    if (response.status === 200 || response.status === 201) {
      dispatch({ type: "productCreateSuccess", payload: data });
    } else {
      dispatch({ type: "productCreateFail", payload: data.message });
    }
  } catch (error) {
    dispatch({ type: "productCreateFail", payload: error.message });
  }
};

export const getAllProducts = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getAllProductsRequest" });
    const response = await axios.get(`${server}/product/getAllProducts/${id}`);
    const data = response.data;
    if (response.status === 200 || response.status === 201) {
      dispatch({ type: "getAllProductsSuccess", payload: data });
    } else {
      dispatch({ type: "getAllProductsFail", payload: data.message });
    }
  } catch (error) {
    dispatch({ type: "getAllProductsFail", payload: error.message });
  }
};

export const resetProductSuccess = () => (dispatch) => {
  dispatch({ type: "resetProductSuccess" });
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteProductRequest" });
    const response = await axios.delete(
      `${server}/product/deleteProduct/${id}`
    );
    const data = response.data;
    if (response.status === 200 || response.status === 201) {
      dispatch({ type: "deleteProductSuccess", payload: data });
    } else {
      dispatch({ type: "deleteProductFail", payload: data.message });
    }
  } catch (error) {
    dispatch({ type: "deleteProductFail", payload: error.message });
  }
};

export const getAllProductsUser = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllProductsUserRequest" });
    const response = await axios.get(`${server}/product/getAllProductsUser`);
    const data = response.data;
    if (response.status === 200 || response.status === 201) {
      dispatch({ type: "getAllProductsUserSuccess", payload: data });
    } else {
      dispatch({ type: "getAllProductsUserFail", payload: data.message });
    }
  } catch (error) {
    dispatch({ type: "getAllProductsUserFail", payload: error.message });
  }
};


export const createReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: "createReviewRequest" });
    const response = await axios.post(`${server}/product/createReview`, reviewData);
    const data = response.data;
    if (response.status === 200 || response.status === 201) {
      dispatch({ type: "createReviewSuccess", payload: data });
    } else {
      dispatch({ type: "createReviewFail", payload: data.message });
    }
  } catch (error) {
    dispatch({ type: "createReviewFail", payload: error.message });
  }
};


export const getProductById = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getProductRequest" });
    const response = await axios.get(`${server}/product/getProduct/${id}`);
    const data = response.data;

    if (response.status === 200 || response.status === 201) {
      dispatch({ type: "getProductSuccess", payload: data });
    } else {
      dispatch({ type: "getProductFail", payload: data.message });
    }
  } catch (error) {
    dispatch({ type: "getProductFail", payload: error.message });
  }
};
