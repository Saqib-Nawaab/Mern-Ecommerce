import express from "express";
import { createNewMessage, getMessages } from "../controllers/message.controllers.js";
import uploads from "../config/multer.js";

const messageRouter = express.Router();

messageRouter.post("/create-new-message", uploads.fields([{ name: "images", maxCount: 10 }]), createNewMessage);
messageRouter.get("/get-all-messages/:conversationId", getMessages);

export default messageRouter;