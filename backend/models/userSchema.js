import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String
    },
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  phone: {
    type: Number,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 12,
  },
  collegeName: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["male", "female", "others"],
  },
  interests: {
    type: String,
  },
  specialisation: {
    type: String,
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
