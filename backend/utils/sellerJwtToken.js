import jwt from "jsonwebtoken";
import ApiResponse from "../utils/ApiResponse.js";
import CONFIG from "../config/config.js";

const sendToken = (seller, statusCode, res) => {
    
  const token = seller.getJwtToken();

  const options = {
    expires: new Date(
      Date.now() + CONFIG.Seller_JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: CONFIG.NODE_ENV === "production",
    sameSite: CONFIG.NODE_ENV === "production" ? "none" : "lax",
  };

  res.status(statusCode).cookie("Stoken", token, options).json(
    new ApiResponse(statusCode, "Login successful", {
      seller,
      token,
    })
  );
};


export { sendToken };
