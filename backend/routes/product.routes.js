import express from "express";
import uploads from "../config/multer.js";
import { createProduct, getAllProducts ,deleteProduct, getAllProductsUser, createReview,getProductById } from "../controllers/product.controllers.js";
import { isAuthenticated } from "../middlewares/auth.js";
const productRouter = express.Router();

productRouter.post("/create-product", uploads.fields([{ name: "file", maxCount: 5 }]), createProduct);
productRouter.get("/getAllProducts/:id", getAllProducts);
productRouter.delete("/deleteProduct/:id", deleteProduct);
productRouter.get("/getAllProductsUser", getAllProductsUser);
productRouter.post("/createReview", createReview);
productRouter.get("/getProduct/:id", getProductById);




export default productRouter;
