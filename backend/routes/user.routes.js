import express from "express";
import uploads from "../config/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  createUser,
  activation,
  loginUser,
  getUser,
  logOutUser,
  updateAvatar,
  updateUser,
  addNewUserAddress,
  deleteUserAddress,
  changePassword,
  userInfo,
} from "../controllers/user.controllers.js";

const userRouter = express.Router();

userRouter.get("/getUser", isAuthenticated, getUser);
userRouter.post("/create-user", uploads.single("file"), createUser);
userRouter.post("/activation", activation);
userRouter.post("/login-user", loginUser);
userRouter.get("/logout", isAuthenticated, logOutUser);
userRouter.post("/update-user", isAuthenticated, updateUser);
userRouter.post("/update-avatar", isAuthenticated, uploads.single("file"), updateAvatar);
userRouter.post("/add-address", isAuthenticated, addNewUserAddress);
userRouter.delete("/delete-address/:addressId", isAuthenticated, deleteUserAddress);
userRouter.post("/change-password", isAuthenticated, changePassword);
userRouter.get("/user-info/:id", isAuthenticated, userInfo);




export default userRouter;
