import formatDistanceToNow from 'date-fns/formatDistanceToNow/index.js';
const process = (sub) => {
  const formatDate = formatDistanceToNow(sub.dueDate, { addSuffix: true });
  const userId = sub.userId._id.toString();
  const subject = 'NanoHost Subscription Expiry';
  const email = sub.userId.email;
  const message = `hello ${sub.userId.fullname}, your Subscription to the following product with NanoHost is about to expire: ${sub.productId.name} and expire ${formatDate}. Please get in touch with admin to avoid disconnection`;
  return { userId, subject, email, message };
};

const composer = async (sub) => {
  let finalSub = [];
  if (!sub) {
    return 'Invalid array';
  }
  for (let i = 0; i < sub.length; i++) {
    finalSub.push(process(sub[i]));
  }
  return finalSub;
};

export default composer;
