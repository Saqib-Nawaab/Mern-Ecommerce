import { User } from "../models/user.model.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import { sendToken } from "../utils/jwtToken.js";
import CONFIG from "../config/config.js";
import emailTemplates from "../config/emailTemplates.js";
import { uploadToCloudinary, destroy } from "../config/uploadToCloudinary.js";

const createUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("Name, email, and password are required", 400));
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(new ErrorHandler("User already exists", 400));
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
    { name, email, password, avatar },
    CONFIG.ACTIVATION_JWT_SECRET,
    { expiresIn: "5m" }
  );

  const activationUrl = `${CONFIG.ACTIVATION_URL}/${activationToken}`;

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
    newUserData = jwt.verify(activation_token, CONFIG.ACTIVATION_JWT_SECRET);
  } catch (err) {
    return next(new ErrorHandler("Invalid or expired token", 400));
  }

  const { email, name, password, avatar } = newUserData;

  const existingUser = await User.findOne({ email });

  if (existingUser) {

    return res.status(200).json({
      success: true,
      already: true,
      message: "This account is already activated. Please log in.",
    });
  }

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: avatar.public_id,
      url: avatar.url,
    },
  });

  sendToken(user, 201, res);
});

const loginUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Email and password are required", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return next(new ErrorHandler("Invalid  password", 401));
    }

    sendToken(user, 200, res);
  } catch (error) {
    console.error("Login error:", error);
    return next(new ErrorHandler("Login failed", 500));
  }
});

const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "User fetched successfully", user));
});

const logOutUser = asyncHandler(async (req, res, next) => {
  try {
    res.cookie("token", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
    });

    return res
      .status(200)
      .json(new ApiResponse(200, "User logged out successfully"));
  } catch (error) {
    console.error("Logout error:", error);
    return next(new ErrorHandler("Logout failed", 500));
  }
});

const updateUser = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  const { name, email, phoneNumber, addresses } = req.body;

  const user = await User.findByIdAndUpdate(
    userId,
    {
      name,
      email,
      phoneNumber,
      addresses,
    },
    { new: true }
  );

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "User updated successfully", user));
});

const updateAvatar = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  if (!req.file) {
    return next(new ErrorHandler("Avatar file is required", 400));
  }

  const user = await User.findById(userId);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  if (user.avatar.public_id !== "default") {
    await destroy(user.avatar.public_id, {
      timeout: 120000,
    });
  }

  const cloudinaryUpload = await uploadToCloudinary(req.file.buffer, {
    timeout: 120000,
  });

  user.avatarUpdatedAt = new Date();

  await user.save();

  if (!cloudinaryUpload) {
    return next(new ErrorHandler("Avatar upload failed", 500));
  }

  user.avatar = {
    public_id: cloudinaryUpload.public_id,
    url: cloudinaryUpload.url,
  };

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Avatar updated successfully", user));
});

const addNewUserAddress = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { country, city, address1, address2, zipCode, addressType } = req.body;

  if (!country || !city || !address1 || !addressType) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const newAddress = {
    country,
    city,
    address1,
    address2,
    zipCode,
    addressType,
  };

  user.addresses.push(newAddress);
  await user.save();

  return res
    .status(201)
    .json(new ApiResponse(201, "Address added successfully", user));
});

const deleteUserAddress = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { addressId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  const addressIndex = user.addresses.findIndex(
    (address) => address._id.toString() === addressId
  );

  if (addressIndex === -1) {
    return next(new ErrorHandler("Address not found", 404));
  }

  user.addresses.splice(addressIndex, 1);
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Address deleted successfully", user));
});

const changePassword = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(userId).select("+password");
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    return next(new ErrorHandler("Current password is incorrect", 401));
  }

  user.password = newPassword;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Password changed successfully"));
});

const userInfo = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, "User information retrieved successfully", user)
    );
});

export {
  createUser,
  activation,
  loginUser,
  getUser,
  userInfo,
  logOutUser,
  addNewUserAddress,
  deleteUserAddress,
  updateUser,
  updateAvatar,
  changePassword,
};
