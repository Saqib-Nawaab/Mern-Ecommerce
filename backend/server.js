import dotenv from "dotenv";
import app from "./app.js";
import connectDatabase from "./db/DataBase.js";
import validateConfig from "./utils/validateConfig.js";
import CONFIG from "./config/config.js";
import connectCloudinary from "./config/cloudinary.js";

process.on("uncaughtException", (err) => {
  console.log("Error is ", err);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});

validateConfig();
connectDatabase();
connectCloudinary();

const server = app.listen(CONFIG.PORT  || 2000, () => {
  console.log(`Server is running on http://localhost:${CONFIG.PORT  || 2000}`);
});

process.on("unhandledRejection", (err) => {
  console.log("Error is ", err);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
