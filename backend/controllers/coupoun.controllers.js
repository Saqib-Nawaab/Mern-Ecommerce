import { Product } from "../models/product.model.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import bcrypt from "bcryptjs";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import { sendToken } from "../utils/sellerJwtToken.js";
import CONFIG from "../config/config.js";
import emailTemplates from "../config/emailTemplates.js";
import { uploadToCloudinary, destroy } from "../config/uploadToCloudinary.js";
import { Seller } from "../models/seller.model.js";
import { CoupounCode } from "../models/coupoun.model.js";
import { log } from "console";

const createCoupoun = asyncHandler(async (req, res, next) => {
  try {
    const {
      name,
      discount,
      value,
      minAmount,
      maxAmount,
      sellerId,
      selectedProduct,
    } = req.body;

    const isCoupounCodeExist = await CoupounCode.findOne({ name });
    if (isCoupounCodeExist) {
      return next(
        new ErrorHandler("Coupon with this name already exists", 400)
      );
    }

    const coupounData = await CoupounCode.create({
      name,
      discount,
      value,
      minAmount,
      maxAmount,
      sellerId,
      selectedProduct,
    });

    res
      .status(201)
      .json(new ApiResponse("Coupon created successfully", coupounData));
  } catch (error) {
    next(new ErrorHandler(error.message || "Coupon creation failed", 500));
  }
});

const getAllCoupouns = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(new ErrorHandler("Coupoun ID is required", 400));
    }

    const coupouns = await CoupounCode.find({ sellerId: id });

    res
      .status(200)
      .json(new ApiResponse("Coupouns fetched successfully", coupouns));
  } catch (error) {
    next(new ErrorHandler(error.message || "Failed to fetch coupouns", 500));
  }
});

const deleteCoupoun = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new ErrorHandler("Coupoun ID is required", 400));
    }

    const coupoun = await CoupounCode.findByIdAndDelete(id);
    if (!coupoun) {
      return next(new ErrorHandler("Coupoun not found", 404));
    }

    res.status(200).json(new ApiResponse("Coupoun deleted successfully"));
  } catch (error) {
    next(new ErrorHandler(error.message || "Failed to delete coupoun", 500));
  }
});

const getCoupon = asyncHandler(async (req, res, next) => {
  try {
    const { couponCode } = req.params;

    if (!couponCode) {
      return next(new ErrorHandler("Coupon code is required", 400));
    }

    const coupon = await CoupounCode.findOne({ name: couponCode });
    if (!coupon) {
      return next(new ErrorHandler("Coupon not found", 404));
    }

    res
      .status(200)
      .json(new ApiResponse("Coupon fetched successfully", coupon));
  } catch (error) {
    next(new ErrorHandler(error.message || "Failed to fetch coupon", 500));
  }
});



export { createCoupoun, deleteCoupoun, getAllCoupouns, getCoupon };
