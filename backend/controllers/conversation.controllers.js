import asyncHandler from "../middlewares/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { Conversation } from "../models/conversation.model.js";
import { User } from "../models/user.model.js";
import { Seller } from "../models/seller.model.js";

const createNewConversation = asyncHandler(async (req, res, next) => {
  const { senderId, receiverId, groupTitle } = req.body;

  const isConversationExist = await Conversation.findOne({
    members: { $all: [senderId, receiverId] },
  });

  if (isConversationExist) {
    return res.status(200).json(new ApiResponse(200, "Conversation exists", isConversationExist));
  } else {
    const conversation = await Conversation.create({
      members: [senderId, receiverId],
      groupTitle: groupTitle,
    });
    return res.status(201).json(new ApiResponse(201, "Conversation created", conversation));
  }
});

const getAllSellerConversations = asyncHandler(async (req, res, next) => {
  const { sellerId } = req.params;
  const conversations = await Conversation.find({ members: { $in: [sellerId] } }).sort({ updatedAt: -1 });

  const conversationsWithUserData = await Promise.all(
    conversations.map(async (conv) => {
      const userId = conv.members.find((member) => member !== sellerId);
      if (userId) {
        const user = await User.findById(userId);
        return {
          ...conv._doc,
          userName: user?.name,
          userAvatar: user?.avatar?.url,
        };
      }
      return conv._doc;
    })
  );
  return res.status(200).json(new ApiResponse(200, "Fetched successfully", conversationsWithUserData));
});

const getAllUserConversations = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const conversations = await Conversation.find({ members: { $in: [userId] } }).sort({ updatedAt: -1 });

  const conversationsWithShopData = await Promise.all(
    conversations.map(async (conv) => {
      const sellerId = conv.members.find((member) => member !== userId);
      if (sellerId) {
        const seller = await Seller.findById(sellerId);
        return {
          ...conv._doc,
          shopName: seller?.name,
          shopAvatar: seller?.avatar?.url,
        };
      }
      return conv._doc;
    })
  );
  return res.status(200).json(new ApiResponse(200, "Fetched successfully", conversationsWithShopData));
});

const updateLastMessage = asyncHandler(async (req, res, next) => {
  const { lastMessage, lastMessageId } = req.body;
  const { id } = req.params;

  const conversation = await Conversation.findByIdAndUpdate(
    id,
    {
      lastMessage,
      lastMessageId,
    },
    { new: true }
  );
  if (!conversation) return next(new ErrorHandler("Conversation not found", 404));

  return res.status(200).json(new ApiResponse(200, "Conversation updated successfully", conversation));
});

export { createNewConversation, getAllSellerConversations, getAllUserConversations, updateLastMessage };