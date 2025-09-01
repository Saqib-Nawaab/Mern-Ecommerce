import express from "express";
import uploads from "../config/multer.js";
import { paymentProcess, stripeApiKey } from "../controllers/payment.controllers.js";

const paymentRouter = express.Router();

paymentRouter.post("/process", paymentProcess);
paymentRouter.post("/stripeApiKey", stripeApiKey);

export default paymentRouter;
