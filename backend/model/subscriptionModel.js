import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    startDate: {
      type: Date,
    },
    dueDate: {
      type: Date,
    },

    quantity: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      enum: ["active", "nonactive"],
      default: "active",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);
export default mongoose.model("Subscription", subscriptionSchema);
