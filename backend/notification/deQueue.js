import Queue from './queue.js';
import sendEmail from './Mailer.js';
const dbUrl = 'mongodb://127.0.0.1:27017/NanoDB';

const messageQueue = new Queue(dbUrl);

const deQueue = async () => {
  try {
    const q = await messageQueue.dequeue();
    console.log('dequeue complete');
    const { userId, subject, message, email } = q[0];
    console.log(userId, subject, message, email);
    await sendEmail({ userId, subject, message, email });
    console.log('sendmail complete');
    return true;
  } catch (err) {
    console.log(err?.message);
    return false;
  }
};
// deQueue();
export default deQueue;
