import support from "../model/supportModel.js";

// All Support for admin
export const allSupport = async (req, res) => {
  try {
    const getSupport = await support
      .find()
      .populate("userId")
      .sort({ createdAt: -1 })
      .exec();
    res.status(200).json(getSupport);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// All Support for a particular user
export const getUserSupport = async (req, res) => {
  try {
    const { userId } = req.query;
    const userSupport = await support.find({ userId });
    res.status(200).json(userSupport);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// View Single Support
// All Support for admin
export const singleSupport = async (req, res) => {
  try {
    const id = req.params.id;
    const getSupport = await support
      .findById({ _id: id })
      .populate("userId")
      .exec();
    res.status(200).json(getSupport);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

//Create a new support ticket

export const createSupportTicket = async (req, res) => {
  try {
    const { userId, subject, message, reply, status } = req.body;
    if (!userId) {
      return res.status(401).json("Fields must not be empty");
    }
    if (!userId || !subject || !message) {
      return res.status(401).json("Fields must not be empty");
    }
    const contact = new support({
      userId,
      subject,
      message,
      reply,
      status,
    });
    const newContact = await contact.save();
    res.status(200).json(newContact);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const updateSupport = async (req, res) => {
  try {
    const id = req.params.id;
    const updateSupport = await support.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true },
    );
    res.status(200).json(updateSupport);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const closeSupportTicket = async (req, res) => {
  try {
    const id = req.params.id;
    const updateSupport = await support.findByIdAndUpdate(
      id,
      {
        $set: { status: "Closed" },
      },
      { new: true },
    );
    res.status(200).json(updateSupport);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
