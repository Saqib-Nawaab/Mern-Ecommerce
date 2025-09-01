import ErrorHandler from "../utils/ErrorHandler.js";
import asyncHandler from "./asyncHandler.js";
import jwt from "jsonwebtoken";
import { Seller } from "../models/seller.model.js";
import { User } from "../models/user.model.js";
import CONFIG from "../config/config.js";

const isAuthenticated = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  try {
    const decodedData = jwt.verify(token, CONFIG.JWT_SECRET_KEY);
    req.user = await User.findById(decodedData.id);
    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid token", 401));
  }
});

const isSellerAuthenticated = asyncHandler(async (req, res, next) => {
  const token = req.cookies.Stoken || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  try {
    const decodedData = jwt.verify(token, CONFIG.Seller_JWT_SECRET_KEY);
    req.seller = await Seller.findById(decodedData.id);
    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid token", 401));
  }
});

export { isAuthenticated, isSellerAuthenticated };
