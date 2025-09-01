import express from "express";
import uploads from "../config/multer.js";
import { createCoupoun, deleteCoupoun,  getAllCoupouns, getCoupon } from "../controllers/coupoun.controllers.js";

const coupounRouter = express.Router();

coupounRouter.post("/create-coupoun", uploads.none(), createCoupoun);
coupounRouter.get("/getAllCoupouns/:id", getAllCoupouns);
coupounRouter.delete("/deleteCoupoun/:id", deleteCoupoun);
coupounRouter.get("/getCoupon/:couponCode", getCoupon );

export default coupounRouter;
