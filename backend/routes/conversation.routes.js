import express from "express";
import { createNewConversation, getAllSellerConversations, getAllUserConversations, updateLastMessage } from "../controllers/conversation.controllers.js";

const conversationRouter = express.Router();

conversationRouter.post("/create-new-conversation", createNewConversation);
conversationRouter.get("/get-all-conversation-seller/:sellerId", getAllSellerConversations);
conversationRouter.get("/get-all-conversation-user/:userId", getAllUserConversations);
conversationRouter.put("/update-last-message/:id", updateLastMessage);

export default conversationRouter;