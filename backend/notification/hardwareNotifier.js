import mongoose from 'mongoose';
import db from '../config/dbUrl.js';
import notifier from './notifier.js';
import user from '../model/userModel.js';

const hardwareNotifier = async (data) => {
  try {
    await mongoose.connect(db);
    const adminUsers = await user.find({ role: 'admin' });
    const clientComposer = {
      userId: data.userID._id.toString(),
      subject: `Hardware Request - ${data.productID.name}`,
      email: data.userID?.email,
      message: `Hello ${data.userID.fullname}, \nYou requested for the following hardware subscription. the details are:\n Productname: ${data.productID.name}\nMining Hashrate: ${data.productID.specification.miningHashrate}\nPower Consumption: ${data.productID.specification.powerConsumption}\nSubcription Fee: ${data.productID.specification.fee}\nQuantity: ${data.quantity}\nCurrent Status: ${data.status}\nYou will be notified as soon as admin approves your request.\nWarmest Regards,\nNanohostng Team.`,
    };
    const adminComposer = {
      userId: adminUsers._id,
      subject: `Hardware Request - ${data.productID.name}`,
      email: data.userID?.email,
      message: `Hello, \nA client has requested for the following hardware subscription. the details are:\n Productname: ${data.productID.name}\nMining Hashrate: ${data.productID.specification.miningHashrate}\nPower Consumption: ${data.productID.specification.powerConsumption}\nSubcription Fee: ${data.productID.specification.fee}\nQuantity: ${data.quantity}\nCurrent Status: ${data.status}\nYou will be notified as soon as admin approves your request.\nWarmest Regards,\nNanohostng Team.`,
    };
    await notifier(
      clientComposer.userId,
      clientComposer.email,
      clientComposer.subject,
      clientComposer.message
    );
    for (let i = 0; i < adminUsers.length; i++) {
      await notifier(
        adminUsers[i]._id.toString(),
        adminComposer.email,
        adminComposer.subject,
        adminComposer.message
      );
    }
  } catch (error) {
    console.log(error);
  }
};
// hardwareNotifier();
export default hardwareNotifier;
