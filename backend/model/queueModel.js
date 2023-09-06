import mongoose from 'mongoose';

const queueSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    subject: {
      type: String,
    },
    email: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default queueSchema;
