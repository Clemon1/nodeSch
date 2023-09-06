import { generateToken } from "../middleware/JWT.js";
import user from "../model/userModel.js";
import bcrypt from "bcrypt";

export const getUser = async (req, res) => {
  try {
    let getUser;
    const userId = req.user;
    getUser = await user.findById(userId, "-password");
    res.status(200).json(getUser);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// Find single user
export const singleUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const singleuser = await user.findById(id, "-password");
    res.status(200).json(singleuser);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// Client SignUp
export const clientSignUp = async (req, res) => {
  try {
    if (
      !req.body.username ||
      !req.body.fullname ||
      !req.body.email ||
      !req.body.password
    ) {
      return res.status(400).json("Fields cannot be blank");
    }
    // Checking for existing username
    const existingUserName = await user.findOne({
      username: req.body.username,
    });
    const existingUser = await user.findOne({ email: req.body.email }); // Checking for existing user
    if (existingUserName) {
      return res
        .status(401)
        .json(
          `${req.body.username} is already in use please try another username`,
        );
    }

    if (existingUser) {
      return res.status(401).json("User already exist, please login");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt); // Encrypting Password in the database
    const users = new user({
      username: req.body.username,
      email: req.body.email,
      fullname: req.body.fullname,
      profile: req.body.profile,
      password: hashedPassword,
      role: req.body.role,
    }); // Create new user
    const newUser = await users.save();
    const token = await generateToken({
      user: newUser._id,
      role: newUser.role,
    });

    res.cookie("clientToken", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 2hrs
    });
    const { password, ...otherInfo } = newUser._doc;
    res.status(200).json({ otherInfo });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// CLient  Login Controller
export const clientLogin = async (req, res) => {
  try {
    const checkUser = await user.findOne({ email: req.body.email }); // checking for existing user
    if (!checkUser) {
      return res
        .status(401)
        .json("This user does not have an account, please register");
    }
    const checkPassword = await bcrypt.compare(
      req.body.password,
      checkUser.password,
    );
    if (!checkPassword) {
      return res.status(401).json("Invalid Password");
    }
    const token = await generateToken({
      user: checkUser._id,
      role: checkUser.role,
    });
    res.cookie("clientToken", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 2hrs
    });
    const { password, ...otherInfo } = checkUser._doc;
    res.status(200).json({ otherInfo });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// Admin Register Authentication
export const adminSignUp = async (req, res) => {
  try {
    const { username, email } = req.body;
    // Checking for existing username
    const existingUserName = await user.findOne({ username });
    const existingUser = await user.findOne({ email }); // Checking for existing emailaddress

    if (
      !req.body.username ||
      !req.body.fullname ||
      !req.body.email ||
      !req.body.password
    ) {
      return res.status(400).json("Fields cannot be blank");
    }
    if (existingUserName) {
      return res
        .status(401)
        .json(`${username} is already in use please try another username`);
    }

    if (existingUser) {
      return res.status(401).json("User already exist, please login");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt); // Encrypting Password in the database
    const users = new user({
      username: req.body.username,
      email: req.body.email,
      fullname: req.body.fullname,
      profile: req.body.profile,
      password: hashedPassword,
      role: "admin",
    }); // Create new user
    const newUser = await users.save();
    // const token = await generateToken({
    //   user: newUser._id,
    //   role: newUser.role,
    // });

    res.status(200).json({ newUser });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
// Admin Login Controller

export const adminLogin = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json("Email or Password must not be empty");
    }
    const checkUser = await user.findOne({ email: req.body.email }); // checking for existing user
    if (!checkUser) {
      return res
        .status(401)
        .json("This user does not have an account, please register");
    }
    if (checkUser.role !== "admin") {
      // Checking if its an admin trying to login
      return res.status(401).json("You are not authorized to login here");
    }
    const checkPassword = await bcrypt.compare(
      req.body.password,
      checkUser.password,
    );
    if (!checkPassword) {
      return res.status(401).json("Invalid Password");
    }
    const token = await generateToken({
      user: checkUser._id,
      role: checkUser.role,
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 2hrs
    });
    const { password, ...info } = checkUser._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// View all user and filter by roles
export const view_alllUser = async (req, res) => {
  try {
    let allUser;

    const role = req.query.role;
    // Filter user based on roles
    role === ""
      ? (allUser = await user.find().sort({ createdAt: -1 }))
      : (allUser = await user
          .find({ role }, "-password")
          .sort({ createdAt: -1 }));

    res.status(200).json({ allUser });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// Search users by username, fullname and email address...
export const searchUsers = async (req, res) => {
  try {
    const { search } = req.query;
    const userSearch = await user.find({
      $or: [
        { username: { $regex: search, $options: "i" } },
        {
          fullname: { $regex: search, $options: "i" },
        },
        { email: { $regex: search, $options: "i" } },
      ],
    });
    res.status(200).json(userSearch);
  } catch (error) {
    res.status(500).json(err.message);
  }
};
