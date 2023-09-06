import mongoose from 'mongoose';
import hardwareRequest from '../model/hardwareRequestModel.js';
import db from '../config/dbUrl.js';
import notifier from './notifier.js';
import user from '../model/userModel.js';

const hardwareApproval = async (data) => {
  try {
    await mongoose.connect(db);
    const id = data._id.toString();
    const singleReq = await hardwareRequest
      .findById(id)
      .populate('userID')
      .populate('productID')
      .exec();
    // console.log(singleReq);
    data.userID = singleReq.userID;
    data.productID = singleReq.productID;
    // console.log('this is hardware approval', data);

    const clientRequestApproval = {
      userId: data.userID._id.toString(),
      subject: `Hardware Request - ${data.productID.name}`,
      email: data.userID?.email,
      message: `Hello ${data.userID.fullname}, \nYour request for the following hardware subscription, with details:\n Productname: ${data.productID.name}\nMining Hashrate: ${data.productID.specification.miningHashrate}\nPower Consumption: ${data.productID.specification.powerConsumption}\nSubcription Fee: ${data.productID.specification.fee}\nQuantity: ${data.quantity}\nCurrent Status: ${data.status}\nHas been approved by the admin. Its a pleasure doing business with you.\nWarmest Regards,\nNanohostng Team.`,
    };
    const clientRequestDenied = {
      userId: data.userID._id.toString(),
      subject: `Hardware Request - ${data.productID.name}`,
      email: data.userID?.email,
      message: `Hello ${data.userID.fullname}, \nYour request for the following hardware subscription, with details:\n Productname: ${data.productID.name}\nMining Hashrate: ${data.productID.specification.miningHashrate}\nPower Consumption: ${data.productID.specification.powerConsumption}\nSubcription Fee: ${data.productID.specification.fee}\nQuantity: ${data.quantity}\nCurrent Status: ${data.status}\nHas been denied by the admin. If you required further assistance please open a support ticket.\nWarmest Regards,\nNanohostng Team.`,
    };
    if (data.status === 'Approved') {
      await notifier(
        clientRequestApproval.userId,
        clientRequestApproval.email,
        clientRequestApproval.subject,
        clientRequestApproval.message
      );
    } else if (data.status === 'Declined') {
      await notifier(
        clientRequestDenied.userId,
        clientRequestDenied.email,
        clientRequestDenied.subject,
        clientRequestDenied.message
      );
    }
  } catch (error) {
    console.log(error);
    return error?.message;
  }
};

export default hardwareApproval;
