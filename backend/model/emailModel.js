import mongoose from 'mongoose';

const emailSchema = mongoose.Schema(
  {
    email: {
      type: String,
    },
    messageId: {
      type: String,
    },
    message: String,
  },
  {
    timestamps: true,
  }
);

const Email = mongoose.model('Email', emailSchema);

export default Email;
