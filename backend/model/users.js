import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// Personal Details Schema
const personalDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 13,
  },
  cnic: {
    type: String,
    required: true,
    minLength: 13,
    maxLength: 15,
  },
  address: {
    type: String,
    required: true,
  },
});

// Employment Details Schema
const employmentDetailsSchema = new mongoose.Schema({
  hireDate: {
    type: Date,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  salaryRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Salary',
  },
});

// User Schema
const userSchema = new mongoose.Schema({
  personalDetails: personalDetailsSchema,
  employmentDetails: employmentDetailsSchema,
  email: {
    type: String,
    required: true,
    validate: validator.isEmail,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  role : {
    type: String,
    enum: ["admin", "employee"],
    default: "employee"
  },
  activeToken: String,
  activeTokenExpires: Date,
  isActive: {
    type: Boolean,
    default: false,
  },
  attendanceRef: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attendance',
  }],
});

// Password Hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare Password Method
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// JWT Token Generation
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

// Active Link Token Generation
userSchema.methods.activeLinkToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.activeToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.activeTokenExpires = Date.now() + 5 * 60 * 1000;
  return resetToken;
};

export const User = mongoose.model("User", userSchema);