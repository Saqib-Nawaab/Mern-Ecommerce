import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  cart: {
    type: Array,
    required: [true, "Please enter your cart items!"],
  },
  shippingAddress: {
    type: Object,
    required: [true, "Please enter your shipping address!"],
  },
  user: {
    type: Object,
    required: [true, "Please enter your user details!"],
  },
  totalPrice: {
    type: Number,
    required: [true, "Please enter your total price!"],
  },
  status: {
    type: String,
    required: [true, "Please enter your payment status!"],
  },
  type: {
    type: String,
    default: "Processing",
  },
  paymentInfo: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  paidAt: {
    type: Date,
    default: Date.now,
  },
  deliveredAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Order = mongoose.model("Order", orderSchema);
