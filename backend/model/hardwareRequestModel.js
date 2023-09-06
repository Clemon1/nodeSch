import mongoose from "mongoose";
const hardwareRequestSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Declined"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

const hardwareRequest = mongoose.model(
  "hardwareRequest",
  hardwareRequestSchema,
);
export default hardwareRequest;
