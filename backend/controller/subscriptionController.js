import Subscription from "../model/subscriptionModel.js";
import user from "../model/userModel.js";
import Product from "../model/productModel.js";

export const createSubscription = async (req, res) => {
  //logic for users to subscribe a product
  try {
    //destructure req.body object to get productId and userId
    const { productId, userId, startDate, dueDate, quantity } = req.body;
    //verify if there is userId and productId
    if (!productId || !userId || !quantity || !startDate || !dueDate) {
      return res.status(400).json("Fields must not be empty");
    }
    //confirm if user and product exist in database and flag error if they  dont
    if (
      !(await user.findById(userId)) ||
      !(await Product.findById(productId))
    ) {
      return res
        .status(404)
        .json({ message: "user or product does not exist" });
    }
    // create subscription collection
    const subObj = {
      productId,
      userId,
      startDate,
      dueDate,
      quantity,
    };
    const sub = await Subscription.create(subObj);
    //respond with successful creation result
    res.status(200).json(sub);
  } catch (error) {
    // catch any error in code and respond with error code
    res.status(500).json(error.message);
  }
};
export const getSubscription = async (req, res) => {
  //get single subscription logic
  try {
    //destructure id from req params
    const { id } = req.params;
    //respond with error if no id or invalid id
    if (!id) {
      res.status(400).json({ message: "invalid id " });
    }
    //find id in db and respond with it
    const sub = await Subscription.findById(id)
      .populate("productId")
      .populate("userId")
      .exec();
    res.status(200).json(sub);
  } catch (error) {
    //catch any error and respond with error message with status code 400
    res.status(500).json({ message: error?.message });
  }
};

// Get number of users subcribes to each product

export const getNoOfUsersSubcribesToProduct = async (req, res) => {
  try {
    const productSubscribers = await Subscription.aggregate([
      {
        $group: {
          _id: "$productId",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $project: {
          _id: 0,
          productId: "$_id",
          productName: "$product.name",
          subscriberCount: "$count",
        },
      },
    ]);

    res.json({ productSubscribers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllSubscriptions = async (req, res) => {
  //find and respond with all subscriptions
  try {
    //get all subsriptions
    const subs = await Subscription.find()
      .populate("userId")
      .populate("productId")
      .sort({ createdAt: -1 })
      .exec();

    //respond with subscriptions
    res.status(200).json(subs);
  } catch (error) {
    //catch any error and respond with error message with status code 400
    res.status(500).json({ message: error?.message });
  }
};
export const getAllUserSubsriptions = async (req, res) => {
  //this will search for and return all subscription for a single user

  try {
    //destructure userId from req query
    const { userId } = req.query;

    //check for valid id and res with error 400 if not included
    if (!userId) {
      res.status(400).json({ message: "invalid query string" });
    }
    //check if user exist and res with 404 status and  message
    if (!(await user.findById(userId))) {
      res.status(404).json({ message: "user does not exist" });
    }
    //create an aggregation pipeline that matches the userId and sort data with latest first
    const subs = await Subscription.find({ userId: userId })
      .populate("productId")
      .populate("userId")
      .sort({ createdAt: -1 })
      .exec();
    //respond with data
    res.status(200).json(subs);
  } catch (error) {
    //catch any error and respond with error message with status code 400
    res.status(500).json({ message: error?.message });
  }
};

export const updateSubscription = async (req, res) => {
  // /update subscription
  try {
    //destructure userId from req params
    const { id } = req.params;
    //check for valid id and res with error 400 if not included
    if (!id) {
      res.status(400).json({ message: "invalid query string" });
    }
    //check if user exist and res with 404 status and  message
    if (!(await Subscription.findOne(id))) {
      res.status(404).json({ message: "Subscription does not exist" });
    }
    const sub = await Subscription.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    //respond with  update data
    res.status(200).json(sub);
  } catch (error) {
    //catch any error and respond with error message with status code 400
    res.status(400).json({ message: error?.message });
  }
};
export const deleteSubscription = async (req, res) => {
  //terminate subscription but not delete, there would always be a record of the ssubscription
  try {
    //destructure userId from req params
    const { id } = req.params;
    //check for valid id and res with error 400 if not included
    if (!id) {
      res.status(400).json({ message: "invalid query string" });
    }
    //check if user exist and res with 404 status and  message
    if (!(await Subscription.findOne(id))) {
      res.status(404).json({ message: "user does not exist" });
    }
    await Subscription.findByIdAndUpdate(
      id,
      { $set: { active: false } },
      { new: true },
    );
    //respond with staus 200 only
    res.status(200);
  } catch (error) {
    //catch any error and respond with error message with status code 400
    res.status(400).json({ message: error?.message });
  }
};

export const getMessage = async (req, res) => {
  try {
    res.status(200).json({ messages: "finally arrived at destination" });
  } catch (error) {
    res.status(400).json({ messages: error?.message });
  }
};
