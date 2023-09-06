import Queue from './queue.js';
import composer from './subComposer.js';
import notifier from './notifier.js';
import subscriptionListener from './listener.js';
import deQueue from './deQueue.js';

//this is the notification hub. when complete it will generate notification based on the type of notification, generte automatically when a user subscription is about to expire, when approvals are received or when admin simply wants to send custom messages to any or all users in the platform would be handled seamlessly in this hub
// initiate a new instance  of the queue object
const messageQueue = new Queue('mongodb://127.0.0.1:27017/NanoDB');

const notification = async () => {
  setInterval(async () => {
    const dueSubs = await subscriptionListener();
    if (dueSubs) {
      console.log('calling composer function');
      const finalSubs = await composer(dueSubs);
      for (let i = 0; i < finalSubs.length; i++) {
        console.log('calling notifier function');
        await notifier(
          finalSubs[i].userId,
          finalSubs[i].email,
          finalSubs[i].subject,
          finalSubs[i].message
        );
      }
    }
  }, 12 * 60 * 60 * 1000);
  setInterval(async () => {
    const peek = await messageQueue.peek();
    if (peek) {
      await deQueue();
      console.log(peek);
    } else {
      console.log('nothing to deQueue');
    }
  }, 20000);
};
notification();
