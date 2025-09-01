import express from "express";
import uploads from "../config/multer.js";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getSellerAllOrder,
  refundOrder,
} from "../controllers/order.controllers.js";

const orderRouter = express.Router();

orderRouter.post("/create-order", createOrder);
orderRouter.post("/getAllOrders/:id", getAllOrders);
orderRouter.delete("/deleteOrder/:id", deleteOrder);
orderRouter.get("/getOrder/:orderId", getOrderById);
orderRouter.put("/updateOrderStatus/:id", updateOrderStatus);
orderRouter.post("/getSellerAllOrder/:id", getSellerAllOrder);
orderRouter.post("/refundOrder/:id", refundOrder);

export default orderRouter;
