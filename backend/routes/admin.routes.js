import express from "express";
import {
  getAllUsers,
  getAllSellers,
  getAllProducts,
  getAllOrders,
  getAllEvents,
  deleteUser,
  deleteSeller,
  deleteProduct,
  updateUserRole,
  getDashboardStats,
} from "../controllers/admin.controllers.js";

const adminRouter = express.Router();

// Dashboard stats
adminRouter.get("/dashboard-stats", getDashboardStats);

// User management
adminRouter.get("/users", getAllUsers);
adminRouter.delete("/user/:id", deleteUser);
adminRouter.put("/user/:id/role", updateUserRole);

// Seller management
adminRouter.get("/sellers", getAllSellers);
adminRouter.delete("/seller/:id", deleteSeller);

// Product management
adminRouter.get("/products", getAllProducts);
adminRouter.delete("/product/:id", deleteProduct);

// Order management
adminRouter.get("/orders", getAllOrders);

// Event management
adminRouter.get("/events", getAllEvents);

export default adminRouter;
