import mongoose from "mongoose";
const supportSchema = mongoose.Schema(
  {
    id: {
      type: String,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    subject: {
      type: String,
      require: true,
    },
    message: {
      type: String,
      require: true,
    },
    reply: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },
  },
  {
    timestamps: true,
  },
);

const support = mongoose.model("support", supportSchema);
export default support;
