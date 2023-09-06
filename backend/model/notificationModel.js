import mongoose from 'mongoose';

const notificationSchema = mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);
const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
