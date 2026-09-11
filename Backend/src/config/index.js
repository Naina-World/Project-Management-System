import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const initialiseDatabse = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MONGO_URI is not set. Add it to your .env file.");
    }
    await mongoose.connect(uri);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while database connection", error);
  }
};
