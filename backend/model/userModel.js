import mongoose from "mongoose";

const userModel = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username input must not be empty"],
    },
    fullname: {
      type: String,
      required: [true, "Fullname input must not be empty"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email must be not be empty"],
    },
    profile: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Please input password"],
    },
    role: {
      type: String,
      enum: ["admin", "user", "staff"],
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

const user = mongoose.model("user", userModel);

export default user;
