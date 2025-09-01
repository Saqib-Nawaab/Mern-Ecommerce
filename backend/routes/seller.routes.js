import express from "express";
import uploads from "../config/multer.js";
import { isSellerAuthenticated } from "../middlewares/auth.js";
import {
  createSeller,
  activation,
  loginSeller,
  getSeller,
  logOutSeller,
  updateAvatar,
  updateSeller,
} from "../controllers/seller.controllers.js";

const sellerRouter = express.Router();

sellerRouter.post("/create-seller", uploads.single("file"), createSeller);
sellerRouter.post("/activation-seller", activation);
sellerRouter.post("/login-seller", loginSeller);
sellerRouter.get("/getSeller", isSellerAuthenticated, getSeller);
sellerRouter.get("/logout-seller", isSellerAuthenticated, logOutSeller);
sellerRouter.post("/update-seller", isSellerAuthenticated, updateSeller);
sellerRouter.post("/update-avatar",isSellerAuthenticated,uploads.single("file"),updateAvatar);

export default sellerRouter;
