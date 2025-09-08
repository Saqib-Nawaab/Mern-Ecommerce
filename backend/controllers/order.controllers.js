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
import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";

const createOrder = asyncHandler(async (req, res, next) => {
  try {
    const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

    const shopItemsMap = new Map();

    for (const item of cart) {
      const sellerId = item.sellerId;

      if (!shopItemsMap.has(sellerId)) {
        shopItemsMap.set(sellerId, []);
      }

      shopItemsMap.get(sellerId).push(item);
    }

    const orders = [];

    for (const [sellerId, items] of shopItemsMap) {
      const order = await Order.create({
        cart: items,
        shippingAddress,
        user,
        totalPrice,
        paymentInfo,
        status: paymentInfo?.status || "Pending",
      });

      orders.push(order);
    }

    return res.status(201).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
const getAllOrders = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.params.id;

    const orders = await Order.find({ "user._id": userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to retrieve orders", 500));
  }
});

const getOrderById = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate("user", "name email");
    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to retrieve order", 500));
  }
});

const updateOrderStatus = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findById(id);

    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }

    order.status = status;

    if (
      status.toLowerCase() === "success" ||
      status.toLowerCase() === "delivered" ||
      status.toLowerCase() === "completed"
    ) {
      for (const item of order.cart) {
        const product = await Product.findById(item._id);
        if (product) {
          product.stock = product.stock - item.quantity;
          product.sold_out = product.sold_out + item.quantity;
          await product.save({ validateBeforeSave: false });
        }
      }
    }

    if (status.toLowerCase() === "refunded") {
      for (const item of order.cart) {
        const product = await Product.findById(item._id);
        if (product) {
          product.stock = product.stock + item.quantity;
          product.sold_out = product.sold_out - item.quantity;
          await product.save({ validateBeforeSave: false });
        }
      }
    }

    await order.save();

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to update order status", 500));
  }
});

const deleteOrder = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }

    await Order.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to delete order", 500));
  }
});

const getSellerAllOrder = asyncHandler(async (req, res, next) => {
  try {
    const sellerId = req.params.id;

    const orders = await Order.find({ "cart.sellerId": sellerId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to retrieve seller orders", 500));
  }
});

const refundOrder = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }

    order.status = "Refund Processing";

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order refunded successfully",
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to refund order", 500));
  }
});

export {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getSellerAllOrder,
  deleteOrder,
  refundOrder,
};
