import Subscription from '../model/subscriptionModel.js';
import mongoose from 'mongoose';
import Product from '../model/productModel.js';
import user from '../model/userModel.js';
import * as dateFns from 'date-fns';
const db = 'mongodb://127.0.0.1:27017/NanoDB';

// check for specific changes to certain features of application
// compose a mail for pass it to queue service

//listen to changes on subscription
const compare = (data) => {
  //this function compares the due dates to now and filters out all those less than 5 days to expire from any given data array
  const now = new Date(); //create and insatnce of the date object
  const due = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000); //use getTime method to convert date to date from 1970 in milliseconds
  const dueSubs = data.filter((sub) => {
    const date = dateFns.getTime(sub.dueDate); //convert date to milliseconds using the dateFns module and getTime method
    return date <= due; //compare date to due date and return object that compare as true
  });
  return dueSubs;
};
const subscriptionListener = async () => {
  //finds all subscription that are about to expire and return them whenever called
  try {
    //make a database connection
    await mongoose
      .connect(db)
      .then(() => console.log('connection to db successful'));
    //fetch all subscription and fetch data of product and user we would use that information to compose the notification
    const subs = await Subscription.find()
      .populate('productId')
      .populate('userId');
    console.log('complete subs search');
    //sort for subs about to expire and return in an array
    const dueSubs = await compare(subs);
    console.log('completed sub compare');
    return dueSubs;
  } catch (error) {
    console.log(error?.message);
  } finally {
    await mongoose.connection
      .close()
      .then(() => console.log('db connection terminated'));
  }
};
// subscriptionListener();
export default subscriptionListener;
