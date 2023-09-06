// Database Connection
import mongoose from "mongoose";
export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting to database");
  }
};

// dbConnect();
