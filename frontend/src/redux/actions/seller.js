import axios from "axios";
import { server } from "../../server";

export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadSellerRequest" });
    const { data } = await axios.get(`${server}/seller/getSeller`, {
      withCredentials: true,
    });

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
