import { group } from "console";
import mongoose from "mongoose";
import { type } from "os";

const conversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
    groupTitle: {
      type: String,
    },
    lastMessage: {
      type: String,
    },
    lastMessageId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Conversation = mongoose.model("Conversation", conversationSchema);
