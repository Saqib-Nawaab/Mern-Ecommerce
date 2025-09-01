import mongoose from "mongoose";

const coupounCodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Coupoun code name!"],
    unique: true,
  },
  discount: {
    type: Number,
    required: [true, "Please enter your Coupoun code discount!"],
    default: 0,
  },
  value: {
    type: Number,
    required: [true, "Please enter your Coupoun code value!"],
  },
  minAmount: {
    type: Number,
    required: [true, "Please enter your Coupoun code minimum amount!"],
  },
  maxAmount: {
    type: Number,
    required: [true, "Please enter your Coupoun code maximum amount!"],
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: [true, "Please enter your Coupoun code shop!"],
  },
  selectedProduct: {
    type: String,
    required: [true, "Please select a product for the Coupoun code!"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const CoupounCode = mongoose.model("CoupounCode", coupounCodeSchema);
