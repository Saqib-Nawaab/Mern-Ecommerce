import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import CONFIG from "../config/config.js";

const sellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Shop name!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email!"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [4, "Password should be greater than 4 characters"],
    select: false,
  },
  phoneNumber: {
    type: Number,
    required: [true, "Please enter your phone number!"],
  },
  address: {
    type: String,
    required: [true, "Please enter your shop address!"],
  },
  zipCode: {
    type: Number,
    required: [true, "Please enter your shop zip code!"],
  },
  role: {
    type: String,
    default: "seller",
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  description: {
    type: String,
    default: "No description provided",
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordTime: Date,
});

sellerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

sellerSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, CONFIG.Seller_JWT_SECRET_KEY, {
    expiresIn: CONFIG.Seller_JWT_EXPIRES || "7d",
  });
};

sellerSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const Seller = mongoose.model("Seller", sellerSchema);
