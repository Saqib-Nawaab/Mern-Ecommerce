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
import { log } from "console";
import { Event } from "../models/event.model.js";

const createEvent = asyncHandler(async (req, res, next) => {
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
      startDate,
      endDate,
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
      !sellerId ||
      !startDate ||
      !endDate
    ) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    if (!req.files || !req.files.file || req.files.file.length === 0) {
      return next(new ErrorHandler("Product images are required", 400));
    }

    const images = [];
    for (const file of req.files.file) {
      const result = await uploadToCloudinary(file.path);
      if (!result) {
        return next(new ErrorHandler("Image upload failed", 500));
      }
      images.push({ url: result.url });
    }

    const event = await Event.create({
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
      start_Date: startDate,
      end_Date: endDate,
    });

    res.status(201).json(new ApiResponse("Event created successfully", event));
  } catch (error) {
    next(new ErrorHandler(error.message || "Event creation failed", 500));
  }
});

const getAllEvents = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new ErrorHandler("Event ID is required", 400));
    }

    const events = await Event.find({ sellerId: id });

    res
      .status(200)
      .json(new ApiResponse("Events fetched successfully", events));
  } catch (error) {
    next(new ErrorHandler(error.message || "Failed to fetch events", 500));
  }
});

const deleteEvent = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new ErrorHandler("Event ID is required", 400));
    }

    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return next(new ErrorHandler("Event not found", 404));
    }

    res.status(200).json(new ApiResponse("Event deleted successfully"));
  } catch (error) {
    next(new ErrorHandler(error.message || "Failed to delete event", 500));
  }
});

const getAllEventsUser = asyncHandler(async (req, res, next) => {
  try {
    const events = await Event.find();
    if (!events || events.length === 0) {
      return next(new ErrorHandler("No events found", 404));
    }
    res
      .status(200)
      .json(new ApiResponse("Events fetched successfully", events));
  } catch (error) {
    next(new ErrorHandler(error.message || "Failed to fetch events", 500));
  }
});

export { createEvent, getAllEvents, deleteEvent, getAllEventsUser };
