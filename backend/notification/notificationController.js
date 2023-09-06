import Notification from '../model/notificationModel.js';
import Archive from '../model/archiveModel.js';

export const getNotification = async (req, res) => {
  try {
    const notification = await Notification.find();
    res.status(200).json(notification);
  } catch (err) {
    res.status(404).json({ message: 'invalid request' });
  }
};
export const getSingleNotification = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: 'Invalid id' });
    }
    const notification = await Notification.findById(id);
    res.status(200).json([notification]);
  } catch (err) {
    res.status(400).json(err?.message);
  }
};
export const getUserNotifications = async (req, res) => {
  try {
    //destructure userId fom req query
    const { userId } = req.query;
    // console.log(userId);
    //verify its a valid userId if no userid return bad request status and message
    if (!userId) {
      res.status(400).json({ message: 'Please input userId in query' });
    }
    //find notification where userId matches query
    const notifications = await Notification.find({ userId: userId }).exec();
    // console.log(notifications);
    //return response with notification
    res.status(200).json(notifications);
  } catch (error) {
    //return error message
    res.status(404).json(error?.message);
  }
};

export const updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    if (!id) {
      res.status(400).json({ message: 'invalid Id params' });
    }
    const notification = await Notification.findById(id);
    if (!notification) {
      res.status(404).json({ message: 'that notification doesnt exist' });
    }

    const status = { read: req.body.read };
    const update = await Notification.findByIdAndUpdate(id, status, {
      new: true,
    });
    // console.log(update);
    res.status(200).json(update);
  } catch (err) {
    res.status(400).json(err?.message);
  }
};

export const archiveNotification = async (req, res) => {
  try {
    //receive ids for many notifications or a single one. find notifications based on their ids. create archive document and delete from notification
    // console.log(req.body);
    const { id } = req.body;
    if (!id) {
      res.status(400).json({ message: 'Invalid id' });
    }
    //verify notificatio with that id exist
    const notification = await Notification.findById(id);
    if (!notification) {
      res.status(404).json({ message: 'Notification does not exist' });
    }
    // console.log(notification);
    //create rchive from retrived notification data
    const archiveBody = {
      id: notification._id,
      userId: notification.userId,
      email: notification.email,
      message: notification.message,
      read: notification.read,
      subject: notification.subject,
      created: notification.createdAt,
      updated: notification.updatedAt,
    };
    const archive = await Archive.create(archiveBody);
    if (archive) {
      await Notification.findByIdAndDelete(id);
    }
    res.status(200).json(archive);
  } catch (err) {
    res.status(400).json(err?.message);
  }
};
