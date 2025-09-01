import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Message } from "../models/messages.model.js";
import { Conversation } from "../models/conversation.model.js";
import { uploadToCloudinary } from "../config/uploadToCloudinary.js";

const createNewMessage = asyncHandler(async (req, res, next) => {
  const { sender, conversationId, text } = req.body;

  if (!sender || !conversationId) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  let images = [];
  if (req.files && req.files.images && req.files.images.length > 0) {
    for (const file of req.files.images) {
      const result = await uploadToCloudinary(file.buffer, "messages");
      if (!result) {
        return next(new ErrorHandler("Image upload failed", 500));
      }
      images.push({ url: result.url, public_id: result.public_id });
    }
  }

  const message = await Message.create({
    sender,
    conversationId,
    text,
    images: images.length > 0 ? images[0] : null,
  });

  const lastMessageText = text || (images.length > 0 ? "[Image sent]" : "");
  await Conversation.findByIdAndUpdate(
    conversationId,
    {
      lastMessage: lastMessageText,
      lastMessageId: message._id,
      updatedAt: new Date(),
    },
    { new: true }
  );
  return res.status(201).json(new ApiResponse(201, "Message created", message));
});

const getMessages = asyncHandler(async (req, res, next) => {
  const { conversationId } = req.params;
  const msgs = await Message.find({ conversationId });
  return res.status(200).json(new ApiResponse(200, "Messages fetched", msgs));
});


export { createNewMessage, getMessages };


