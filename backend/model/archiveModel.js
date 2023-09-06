import mongoose from 'mongoose';
const archiveSchema = mongoose.Schema(
  {
    id: {
      type: String,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
    subject: {
      type: String,
    },
    message: {
      type: String,
    },
    email: {
      type: String,
    },
    read: {
      type: Boolean,
      default: false,
    },
    created: Date,
    updated: Date,
  },
  {
    timestamps: true,
  }
);

const Archive = mongoose.model('Archive', archiveSchema);
export default Archive;
