import user from "../model/userModel.js";

const getUsers = async (req, res) => {
  try {
    const users = await user.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json(error?.message);
  }
};

export default getUsers;
