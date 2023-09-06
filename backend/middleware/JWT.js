import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();
// Generate JWT Tokens
const secretKey = process.env.JWT_SECRET;

export const generateToken = ({ user, role }) => {
  const token = jwt.sign({ user, role }, secretKey, { expiresIn: '30d' });
  return token;
};

// Verify JWT Tokens
export const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = decoded.user;
    req.role = decoded.role;

    next();
  });
};

// Checking if its an admin making the request
export const isAdmin = (req, res, next) => {
  if (req.role != 'admin') {
    return res
      .status(401)
      .json({ message: 'You are not authorized to view the data' });
  }
  next();
};

// Checks if its a User making the request
export const isUser = (req, res, next) => {
  if (req.role !== 'user') {
    return res.status(401).json({ message: 'Not authorized' });
  }
  next();
};
