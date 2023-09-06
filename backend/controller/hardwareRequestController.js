import hardwareRequest from "../model/hardwareRequestModel.js";
import user from "../model/userModel.js";
import hardwareNotifier from "../notification/hardwareNotifier.js";
import hardwareApproval from "../notification/hardwareApproval.js";

// Request for hardware
export const createRequest = async (req, res) => {
  try {
    const { userID, productID, quantity, status } = req.body;
    if (!userID || !productID || !quantity) {
      return res.status(400).json("Fields must not be empty");
    }
    const request = new hardwareRequest({
      userID,
      productID,
      quantity,
      status,
    });
    const newRequest = await request.save();
    const notice = await hardwareRequest
      .findById(newRequest._id)
      .populate("userID")
      .populate("productID")
      .exec();
    await hardwareNotifier(notice);

    res.status(200).json(newRequest);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// View all request

export const all_Request = async (req, res) => {
  try {
    const allReq = await hardwareRequest
      .find()
      .populate("userID")
      .populate("productID")
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).json(allReq);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
//View single hardware request

export const view_SingleRequest = async (req, res) => {
  try {
    const id = req.params.id;
    const singleReq = await hardwareRequest
      .findById(id)
      .populate("userID")
      .populate("productID")
      .exec();
    res.status(200).json(singleReq);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// customer viewing their own request
export const customer_Request = async (req, res) => {
  try {
    const { userID } = req.query;

    const customerReq = await hardwareRequest
      .find({ userID })

      .populate("productID")
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).json(customerReq);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// Admin updating status of the request

export const update_hardwareRequest = async (req, res) => {
  try {
    const id = req.params.id;
    const updateReq = await hardwareRequest.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true },
    );

    await hardwareApproval(updateReq);

    res.status(200).json(updateReq);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
