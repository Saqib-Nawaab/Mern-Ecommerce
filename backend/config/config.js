import dotenv from "dotenv";

if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({
    path: "./config/.env",
    debug: false,
  });
}

const CONFIG = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",

  MONGODB_URL: process.env.MONGODB_URL,
  MONGODB_Local_URL: process.env.MONGODB_Local_URL,

  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  Seller_JWT_SECRET_KEY: process.env.Seller_JWT_SECRET_KEY,

  JWT_EXPIRES: process.env.JWT_EXPIRES || "7d",
  Seller_JWT_EXPIRES: process.env.Seller_JWT_EXPIRES || "7d",

  JWT_COOKIE_EXPIRE: process.env.JWT_COOKIE_EXPIRE || 7,
  Seller_JWT_COOKIE_EXPIRE: process.env.Seller_JWT_COOKIE_EXPIRE || 7,

  SMTP_PASS: process.env.SMTP_PASS,
  SMTP_HOST: process.env.SMTP_HOST || "smtp.gmail.com",
  SMTP_PORT: process.env.SMTP_PORT || 465,
  SMTP_SERVICE: process.env.SMTP_SERVICE || "gmail",
  SMTP_USER: process.env.SMTP_USER,
  SMTP_FROM_EMAIL: process.env.SMTP_FROM_EMAIL,

  ACTIVATION_URL: process.env.ACTIVATION_URL || (process.env.NODE_ENV === "production" ? "https://mern-ecommerce-frontend-delta-amber.vercel.app/activate" : "http://localhost:5173/activate"),
  ACTIVATION_JWT_SECRET: process.env.ACTIVATION_JWT_SECRET,
  Seller_ACTIVATION_URL: process.env.Seller_ACTIVATION_URL || (process.env.NODE_ENV === "production" ? "https://mern-ecommerce-frontend-delta-amber.vercel.app/activate-seller" : "http://localhost:5173/activate-seller"),
  Seller_ACTIVATION_JWT_SECRET: process.env.Seller_ACTIVATION_JWT_SECRET,

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

  STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
};

export default CONFIG;
