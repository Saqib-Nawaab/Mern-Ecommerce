import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Event name!"],
  },

  description: {
    type: String,
    required: [true, "Please enter your Event description!"],
  },
  category: {
    type: String,
    required: [true, "Please enter your Event category!"],
  },
  tags: {
    type: String,
    required: [true, "Please enter your Event tags!"],
  },
  originalPrice: {
    type: Number,
    required: [true, "Please enter your Event original price!"],
  },
  discountedPrice: {
    type: Number,
    required: [true, "Please enter your Event discounted price!"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter your Event stock!"],
  },
  start_Date: {
    type: Date,
    required: [true, "Please enter your Event start date!"],
  },

  end_Date: {
    type: Date,
    required: [true, "Please enter your Event end date!"],
  },
  status: {
    type: String,
    enum: ["upcoming", "ongoing", "completed", "cancelled", "Running"],
    default: "upcoming",
  },

  images: [
    {
      url: {
        type: String,
        required: true,
      },
    },
  ],

  sellerId: {
    type: String,
    required: [true, "Please enter your Event seller!"],
  },
  seller: {
    type: Object,
    required: [true, "Please enter your Event seller details!"],
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

export const Event = mongoose.model("Event", eventSchema);
