import jwt from "jsonwebtoken";
import ApiResponse from "../utils/ApiResponse.js";
import CONFIG from "../config/config.js";

const sendToken = (user, statusCode, res) => {
    
  const token = user.getJwtToken();

  const options = {
    expires: new Date(
      Date.now() + CONFIG.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json(
    new ApiResponse(statusCode, "Login successful", {
      user,
      token,
    })
  );
};


export { sendToken };
