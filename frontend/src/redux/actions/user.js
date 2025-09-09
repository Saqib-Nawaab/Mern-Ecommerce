import axios from "axios";
import { server } from "../../server";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadUserRequest" });
    
    // Try with cookies first
    let config = {
      withCredentials: true,
    };
    
    // If we have a token in localStorage, add it to headers as fallback
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    
    const { data } = await axios.get(`${server}/user/getUser`, config);

    const user = data.data || data.user;

    dispatch({
      type: "LoadUserSuccess",
      payload: user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload:
        error?.response?.data?.message ||
        error.message ||
        "An error occurred while loading user data.",
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LogoutUserRequest" });
    
    // Configure request with both cookies and header token
    let config = {
      withCredentials: true,
    };
    
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    
    const { data } = await axios.get(`${server}/user/logout`, config);

    // Clear localStorage token
    localStorage.removeItem("token");

    dispatch({
      type: "LogoutUserSuccess",
      payload: data.message,
    });
  } catch (error) {
    // Clear localStorage token even if logout request fails
    localStorage.removeItem("token");
    
    dispatch({
      type: "LogoutUserFail",
      payload:
        error?.response?.data?.message ||
        error.message ||
        "An error occurred while logging out.",
    });
  }
};

export const updateAvatar = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "UpdateAvatarRequest" });

    const { data } = await axios.put(`${server}/user/update-avatar`, formData, {
      withCredentials: true,
    });

    const userWithTimestamp = {
      ...data.data,
      avatar: {
        ...data.data.avatar,
        url: `${data.data.avatar.url}?v=${new Date(
          data.data.avatarUpdatedAt
        ).getTime()}`,
      },
    };

    dispatch({ type: "UpdateAvatarSuccess", payload: userWithTimestamp });
  } catch (error) {
    dispatch({
      type: "UpdateAvatarFail",
      payload: error.response?.data?.message || "Avatar update failed",
    });
  }
};

export const addNewUserAddress = (address) => async (dispatch) => {
  try {
    dispatch({ type: "AddNewUserAddressRequest" });

    const { data } = await axios.post(`${server}/user/add-address`, address, {
      withCredentials: true,
    });

    dispatch({ type: "AddNewUserAddressSuccess", payload: data.data });
    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: "AddNewUserAddressFail",
      payload: error.response?.data?.message || "Failed to add address",
    });
  }
};

export const deleteUserAddress = (addressId) => async (dispatch) => {
  try {
    dispatch({ type: "DeleteUserAddressRequest" });

    const { data } = await axios.delete(
      `${server}/user/delete-address/${addressId}`,
      {
        withCredentials: true,
      }
    );

    dispatch({ type: "DeleteUserAddressSuccess", payload: data.data });
    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: "DeleteUserAddressFail",
      payload: error.response?.data?.message || "Failed to delete address",
    });
  }
};

export const changePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: "ChangePasswordRequest" });
    const { data } = await axios.post(
      `${server}/user/change-password`,
      passwords,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "ChangePasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "ChangePasswordFail",
      payload:
        error?.response?.data?.message ||
        error.message ||
        "An error occurred while changing password.",
    });
  }
};

export const getStripeApiKey = () => async (dispatch) => {
  try {
    dispatch({ type: "GetStripeApiKeyRequest" });
    const { data } = await axios.post(
      `${server}/payment/stripeApiKey`,
      {},
      {
        withCredentials: true,
      }
    );
    dispatch({ type: "GetStripeApiKeySuccess", payload: data.stripeApiKey });
  } catch (error) {
    dispatch({
      type: "GetStripeApiKeyFail",
      payload:
        error?.response?.data?.message ||
        error.message ||
        "An error occurred while fetching Stripe API key.",
    });
  }
};
