import { Seller } from "../models/seller.model.js";
import { Product } from "../models/product.model.js";
import { Event } from "../models/event.model.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import { sendToken } from "../utils/sellerJwtToken.js";
import CONFIG from "../config/config.js";
import emailTemplates from "../config/emailTemplates.js";
import { uploadToCloudinary, destroy } from "../config/uploadToCloudinary.js";

const createSeller = asyncHandler(async (req, res, next) => {
  const { name, email, password, phoneNumber, address, zipCode } = req.body;

  if (!name || !email || !password || !phoneNumber || !address || !zipCode) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  const existingSeller = await Seller.findOne({ email });

  if (existingSeller) {
    return next(new ErrorHandler("Seller already exists", 400));
  }

  let avatar = {
    public_id: "default",
    url: "default",
  };

  if (req.file?.buffer) {
    const cloudinaryUpload = await uploadToCloudinary(req.file.buffer);
    if (!cloudinaryUpload) {
      return next(new ErrorHandler("Avatar upload failed", 500));
    }
    avatar = cloudinaryUpload;
  }

  const activationToken = jwt.sign(
    { name, email, password, avatar, phoneNumber, address, zipCode },
    CONFIG.Seller_ACTIVATION_JWT_SECRET,
    { expiresIn: "5m" }
  );

  const activationUrl = `${CONFIG.Seller_ACTIVATION_URL}/${activationToken}`;

  const html = emailTemplates({
    name,
    activationUrl,
  });

  try {
    await sendMail({
      email,
      subject: "Account Activation",
      message: `Hello ${name}, Click on the link to activate your account: ${activationUrl}`,
      html: html,
    });

    return res.status(201).json(
      new ApiResponse(201, "Activation link sent to your email", {
        activationUrl,
      })
    );
  } catch (error) {
    console.error("Error sending activation email:", error);
    return next(new ErrorHandler("Failed to send activation email", 500));
  }
});

const activation = asyncHandler(async (req, res, next) => {
  const { activation_token } = req.body;

  if (!activation_token) {
    return next(new ErrorHandler("Activation token is required", 400));
  }

  let newUserData;
  try {
    newUserData = jwt.verify(
      activation_token,
      CONFIG.Seller_ACTIVATION_JWT_SECRET
    );
  } catch (err) {
    console.log("Error is ", err);
    return next(new ErrorHandler("Invalid or expired token", 400));
  }

  const { email, name, password, avatar, phoneNumber, address, zipCode } =
    newUserData;

  const existingSeller = await Seller.findOne({ email });

  if (existingSeller) {
    return next(
      new ErrorHandler("Seller is already activated. Please log in.", 400)
    );
  }

  const seller = await Seller.create({
    name,
    email,
    password,
    avatar: {
      public_id: avatar.public_id,
      url: avatar.url,
    },
    phoneNumber,
    address,
    zipCode,
  });

  sendToken(seller, 201, res);
});

const loginSeller = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Email and password are required", 400));
    }

    const seller = await Seller.findOne({ email }).select("+password");

    if (!seller) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordValid = await seller.comparePassword(password);

    if (!isPasswordValid) {
      return next(new ErrorHandler("Invalid  password", 401));
    }

    sendToken(seller, 200, res);
  } catch (error) {
    console.error("Login error:", error);
    return next(new ErrorHandler("Login failed", 500));
  }
});

const getSeller = asyncHandler(async (req, res, next) => {
  const seller = await Seller.findById(req.seller._id).select("-password");

  if (!seller) {
    return next(new ErrorHandler("Seller not found", 404));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Seller fetched successfully", seller));
});

const logOutSeller = asyncHandler(async (req, res, next) => {
  try {
    res.cookie("Stoken", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
    });
    return res
      .status(200)
      .json(new ApiResponse(200, "Seller logged out successfully"));
  } catch (error) {
    console.error("Logout error:", error);
    return next(new ErrorHandler("Logout failed", 500));
  }
});

const updateSeller = asyncHandler(async (req, res, next) => {
  const sellerId = req.seller._id;

  const { name, email, phoneNumber, addresses, description } = req.body;

  const currentSeller = await Seller.findById(sellerId);

  const seller = await Seller.findByIdAndUpdate(
    sellerId,
    {
      name,
      email,
      phoneNumber,
      addresses,
      description,
    },
    { new: true }
  );

  if (!seller) {
    return next(new ErrorHandler("Seller not found", 404));
  }

  if (name && name !== currentSeller.name) {
    try {
      await Product.updateMany(
        { sellerId: sellerId.toString() },
        { $set: { "seller.name": name } }
      );

      await Event.updateMany(
        { sellerId: sellerId.toString() },
        { $set: { "seller.name": name } }
      );
    } catch (error) {
      console.error("Error updating seller name in related docs:", error);
    }
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Seller updated successfully", seller));
});

const updateAvatar = asyncHandler(async (req, res, next) => {
  const sellerId = req.seller?._id;

  if (!req.file) {
    return next(new ErrorHandler("Avatar file is required", 400));
  }

  const seller = await Seller.findById(sellerId);

  if (!seller) {
    return next(new ErrorHandler("Seller not found", 404));
  }

  if (seller.avatar.public_id !== "default") {
    await destroy(seller.avatar.public_id, {
      timeout: 120000,
    });
  }

  const cloudinaryUpload = await uploadToCloudinary(req.file.buffer, {
    timeout: 120000,
  });

  seller.avatarUpdatedAt = new Date();

  await seller.save();

  if (!cloudinaryUpload) {
    return next(new ErrorHandler("Avatar upload failed", 500));
  }

  seller.avatar = {
    public_id: cloudinaryUpload.public_id,
    url: cloudinaryUpload.url,
  };

  await seller.save();

  try {
    await Product.updateMany(
      { sellerId: sellerId.toString() },
      { $set: { "seller.avatar": seller.avatar } }
    );

    await Event.updateMany(
      { sellerId: sellerId.toString() },
      { $set: { "seller.avatar": seller.avatar } }
    );
  } catch (error) {
    console.error("Error updating seller avatar in related docs:", error);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Avatar updated successfully", seller));
});

export {
  createSeller,
  activation,
  loginSeller,
  getSeller,
  logOutSeller,
  updateAvatar,
  updateSeller,
};
