import Queue from './queue.js';
import mongoose from 'mongoose';
import Notification from '../model/notificationModel.js';
const dbUrl = 'mongodb://127.0.0.1:27017/NanoDB';
const messageQueue = new Queue(dbUrl);

const notifier = async (userId, email, subject, message) => {
  try {
    await mongoose.connect(dbUrl).then(() => {
      console.log('database connected');
    });
    const notification = {
      userId: userId,
      email: email,
      subject: subject,
      message: message,
    };
    // console.log(messageBody);
    await Notification.create(notification);
    await messageQueue.enqueue(notification);
  } catch (error) {
    console.log('catch executed', error?.message);
  }
};
export default notifier;
