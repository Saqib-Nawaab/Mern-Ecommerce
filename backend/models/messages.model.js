import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    images: {
      url: { type: String },
      public_id: { type: String },
    },
    conversationId: {
      type: String,
      required: true,
    },
    seen: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Message = mongoose.model("Message", messageSchema);