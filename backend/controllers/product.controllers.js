import { Product } from "../models/product.model.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import { sendToken } from "../utils/sellerJwtToken.js";
import CONFIG from "../config/config.js";
import emailTemplates from "../config/emailTemplates.js";
import { uploadToCloudinary, destroy } from "../config/uploadToCloudinary.js";
import { Seller } from "../models/seller.model.js";
import { log } from "console";
import { User } from "../models/user.model.js";

const createProduct = asyncHandler(async (req, res, next) => {
  try {
    const {
      name,
      description,
      category,
      tags,
      originalPrice,
      discountedPrice,
      stock,
      sellerId,
    } = req.body;

    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return next(new ErrorHandler("Seller not found", 404));
    }

    if (
      !name ||
      !description ||
      !category ||
      !tags ||
      !originalPrice ||
      !discountedPrice ||
      !stock ||
      !sellerId
    ) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    if (!req.files || !req.files.file || req.files.file.length === 0) {
      return next(new ErrorHandler("Product images are required", 400));
    }

    const images = [];
    for (const file of req.files.file) {
      const result = await uploadToCloudinary(file.buffer);
      if (!result) {
        return next(new ErrorHandler("Image upload failed", 500));
      }
      images.push({ url: result.url });
    }

    const product = await Product.create({
      name,
      description,
      category,
      tags,
      originalPrice,
      discountedPrice,
      stock,
      images,
      sellerId,
      seller,
    });

    res
      .status(201)
      .json(new ApiResponse("Product created successfully", product));
  } catch (error) {
    next(new ErrorHandler(error.message || "Product creation failed", 500));
  }
});

const getAllProducts = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new ErrorHandler("Product ID is required", 400));
    }

    const products = await Product.find({ sellerId: id });

    res
      .status(200)
      .json(new ApiResponse("Products fetched successfully", products));
  } catch (error) {
    next(new ErrorHandler(error.message || "Failed to fetch products", 500));
  }
});

const deleteProduct = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new ErrorHandler("Product ID is required", 400));
    }

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    return res.status(200).json(new ApiResponse("Product deleted successfully"));
  } catch (error) {
    next(new ErrorHandler(error.message || "Failed to delete product", 500));
  }
});

const getAllProductsUser = asyncHandler(async (req, res, next) => {
  try {
    const products = await Product.find();
    return res
      .status(200)
      .json(new ApiResponse("Products fetched successfully", products));
  } catch (error) {
    next(new ErrorHandler(error.message || "Failed to fetch products", 500));
  }
});

const createReview = asyncHandler(async (req, res, next) => {
  try {
    const { productId, rating, comment, userId } = req.body;

    if (!productId || !rating || !comment || !userId) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    const product = await Product.findById(productId);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    product.review.push({
      userId: userId,
      rating,
      comment,
    });

    await product.save();

    return res
      .status(201)
      .json(new ApiResponse("Review created successfully", product));
  } catch (error) {
    next(new ErrorHandler(error.message || "Failed to create review", 500));
  }
});

const getProductById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id).lean();
  if (!product) return next(new ErrorHandler("Product not found", 404));

  // Get all user info for reviews
  const userIds = product.review.map((r) => r.userId);
  const users = await User.find({ _id: { $in: userIds } }).select(
    "name avatar"
  );

  // Merge user info into reviews
  const reviewsWithUser = product.review.map((r) => {
    const reviewer = users.find((u) => u._id.toString() === r.userId);
    return { ...r, reviewer: reviewer || null };
  });

  res.status(200).json(
    new ApiResponse("Product fetched successfully", {
      ...product,
      review: reviewsWithUser,
    })
  );
});

export {
  createProduct,
  getAllProducts,
  deleteProduct,
  getAllProductsUser,
  createReview,
  getProductById,
};
