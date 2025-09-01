import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Product name!"],
  },

  description: {
    type: String,
    required: [true, "Please enter your Product description!"],
  },
  category: {
    type: String,
    required: [true, "Please enter your Product category!"],
  },
  tags: {
    type: String,
    required: [true, "Please enter your Product tags!"],
  },
  originalPrice: {
    type: Number,
    required: [true, "Please enter your Product original price!"],
  },
  discountedPrice: {
    type: Number,
    required: [true, "Please enter your Product discounted price!"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter your Product stock!"],
  },
  images: [
    {
      url: {
        type: String,
        required: true,
      },
    },
  ],
  review: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      rating: {
        type: Number,
        default: 0,
      },
      comment: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  sellerId: {
    type: String,
    required: [true, "Please enter your Product seller!"],
  },
  seller: {
    type: Object,
    required: [true, "Please enter your Product seller details!"],
  },

  sold_out: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Product = mongoose.model("Product", productSchema);
