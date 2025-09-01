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
import Stripe from "stripe";

const stripe = new Stripe(CONFIG.STRIPE_SECRET_KEY);

const paymentProcess = asyncHandler(async (req, res, next) => {
  const { amount, currency } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency || "usd",
      metadata: {
        company: "Mern Ecommerce",
      },
    });
    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    return next(new ErrorHandler("Payment processing failed", 500));
  }
});

const stripeApiKey = asyncHandler(async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      stripeApiKey: CONFIG.STRIPE_PUBLIC_KEY,
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to retrieve Stripe API key", 500));
  }
});

export { paymentProcess, stripeApiKey };
