import mongoose from "mongoose";

export const initialiseDatabse = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/project_management");
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while database connection", error);
  }
};
