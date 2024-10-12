import mongoose from "mongoose";
import validator from "validator";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 8,
  },
  email: {
    type: String,
    isValid: validator.isEmail,
  },
  phone: {
    type: Number,
    required: true,
    minLength: 10
  },
  message: {
    type: String,
    required: true,
    minLength: 10,
  },
});

export const Message = mongoose.model("Message", schema);