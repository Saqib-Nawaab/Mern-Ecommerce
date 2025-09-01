import express from "express";
import errorMiddleware from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import sellerRouter from "./routes/seller.routes.js";
import productRouter from "./routes/product.routes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import eventRouter from "./routes/event.routes.js";
import coupounRouter from "./routes/coupoun.routes.js";
import paymentRouter from "./routes/payment.routes.js";
import orderRouter from "./routes/order.routes.js";
import conversationRouter from "./routes/conversation.routes.js";
import messageRouter from "./routes/message.routes.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors({origin: "https://mern-ecommerce-frontend-rust.vercel.app",credentials: true,}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// app.use('/', express.static('uploads'));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/v2/user", userRouter);
app.use("/api/v2/seller", sellerRouter);
app.use("/api/v2/product", productRouter);
app.use("/api/v2/event", eventRouter);
app.use("/api/v2/coupon", coupounRouter);
app.use("/api/v2/payment", paymentRouter);
app.use("/api/v2/order", orderRouter);
app.use("/api/v2/message", messageRouter);
app.use("/api/v2/conversation", conversationRouter);

app.use(errorMiddleware);

export default app;
