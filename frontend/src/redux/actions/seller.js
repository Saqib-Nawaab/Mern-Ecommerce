import axios from "axios";
import { server } from "../../server";

export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadSellerRequest" });
    
    // Try with cookies first
    let config = {
      withCredentials: true,
    };
    
    // If we have a seller token in localStorage, add it to headers as fallback
    const sellerToken = localStorage.getItem("sellerToken");
    if (sellerToken) {
      config.headers = {
        Authorization: `Bearer ${sellerToken}`,
      };
    }
    
    const { data } = await axios.get(`${server}/seller/getSeller`, config);

    const seller = data.data || data.seller;
    if (!seller) {
      throw new Error("No seller data found");
    }
    dispatch({
      type: "LoadSellerSuccess",
      payload: seller,
    });
  } catch (error) {
    dispatch({
      type: "LoadSellerFail",
      payload:
        error?.response?.data?.message ||
        error.message ||
        "An error occurred while loading seller data.",
    });
  }
};

export const logoutSeller = () => async (dispatch) => {
  try {
    dispatch({ type: "LogoutSellerRequest" });
    
    // Configure request with both cookies and header token
    let config = {
      withCredentials: true,
    };
    
    const sellerToken = localStorage.getItem("sellerToken");
    if (sellerToken) {
      config.headers = {
        Authorization: `Bearer ${sellerToken}`,
      };
    }
    
    const { data } = await axios.get(`${server}/seller/logout`, config);

    // Clear localStorage token
    localStorage.removeItem("sellerToken");

    dispatch({
      type: "LogoutSellerSuccess",
      payload: data.message,
    });
  } catch (error) {
    // Clear localStorage token even if logout request fails
    localStorage.removeItem("sellerToken");
    
    dispatch({
      type: "LogoutSellerFail",
      payload:
        error?.response?.data?.message ||
        error.message ||
        "An error occurred while logging out seller.",
    });
  }
};
