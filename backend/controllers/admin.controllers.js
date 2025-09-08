import { User } from "../models/user.model.js";
import { Seller } from "../models/seller.model.js";
import { Product } from "../models/product.model.js";
import { Order } from "../models/order.model.js";
import { Event } from "../models/event.model.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

// Get dashboard statistics
const getDashboardStats = asyncHandler(async (req, res, next) => {
  const totalUsers = await User.countDocuments();
  const totalSellers = await Seller.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalOrders = await Order.countDocuments();
  const totalEvents = await Event.countDocuments();

  // Recent orders
  const recentOrders = await Order.find()
    .populate('user', 'name email avatar')
    .sort({ createdAt: -1 })
    .limit(5);

  // Recent users
  const recentUsers = await User.find()
    .select('name email createdAt avatar')
    .sort({ createdAt: -1 })
    .limit(5);

  // Recent sellers
  const recentSellers = await Seller.find()
    .select('name email createdAt avatar')
    .sort({ createdAt: -1 })
    .limit(5);

  // Recent products
  const recentProducts = await Product.find()
    .populate('seller', 'name')
    .select('name price images createdAt')
    .sort({ createdAt: -1 })
    .limit(5);

  const stats = {
    totalUsers,
    totalSellers,
    totalProducts,
    totalOrders,
    totalEvents,
    recentOrders,
    recentUsers,
    recentSellers,
    recentProducts
  };

  return res.status(200).json(new ApiResponse(200, "Dashboard stats retrieved successfully", stats));
});

// Get all users
const getAllUsers = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const users = await User.find()
    .select('-password')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalUsers = await User.countDocuments();

  return res.status(200).json(new ApiResponse(200, "Users retrieved successfully", {
    users,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
      hasNext: page * limit < totalUsers,
      hasPrev: page > 1
    }
  }));
});

// Get all sellers
const getAllSellers = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const sellers = await Seller.find()
    .select('-password')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalSellers = await Seller.countDocuments();

  return res.status(200).json(new ApiResponse(200, "Sellers retrieved successfully", {
    sellers,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(totalSellers / limit),
      totalSellers,
      hasNext: page * limit < totalSellers,
      hasPrev: page > 1
    }
  }));
});

// Get all products
const getAllProducts = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const products = await Product.find()
    .populate('seller', 'name')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalProducts = await Product.countDocuments();

  return res.status(200).json(new ApiResponse(200, "Products retrieved successfully", {
    products,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
      hasNext: page * limit < totalProducts,
      hasPrev: page > 1
    }
  }));
});

// Get all orders
const getAllOrders = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const orders = await Order.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalOrders = await Order.countDocuments();

  return res.status(200).json(new ApiResponse(200, "Orders retrieved successfully", {
    orders,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(totalOrders / limit),
      totalOrders,
      hasNext: page * limit < totalOrders,
      hasPrev: page > 1
    }
  }));
});

// Get all events
const getAllEvents = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const events = await Event.find()
    .populate('seller', 'name')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalEvents = await Event.countDocuments();

  return res.status(200).json(new ApiResponse(200, "Events retrieved successfully", {
    events,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(totalEvents / limit),
      totalEvents,
      hasNext: page * limit < totalEvents,
      hasPrev: page > 1
    }
  }));
});

// Delete user
const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  await User.findByIdAndDelete(id);

  return res.status(200).json(new ApiResponse(200, "User deleted successfully"));
});

// Delete seller
const deleteSeller = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const seller = await Seller.findById(id);
  if (!seller) {
    return next(new ErrorHandler("Seller not found", 404));
  }

  await Seller.findByIdAndDelete(id);

  return res.status(200).json(new ApiResponse(200, "Seller deleted successfully"));
});

// Delete product
const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await Product.findByIdAndDelete(id);

  return res.status(200).json(new ApiResponse(200, "Product deleted successfully"));
});

// Update user role
const updateUserRole = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!['user', 'admin', 'seller'].includes(role)) {
    return next(new ErrorHandler("Invalid role", 400));
  }

  const user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  user.role = role;
  await user.save();

  return res.status(200).json(new ApiResponse(200, "User role updated successfully", user));
});

export {
  getAllUsers,
  getAllSellers,
  getAllProducts,
  getAllOrders,
  getAllEvents,
  deleteUser,
  deleteSeller,
  deleteProduct,
  updateUserRole,
  getDashboardStats
};
