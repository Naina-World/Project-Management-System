import db from "../models/index.js";
const { User } = db;

export const createUserController = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({
        message: "Name and Email are required",
      });
    }

    const user = await User.create({
      name,
      email,
    });

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Internal Servor error",
      error,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(201).json({
      message: "User fetched successfully",
      users,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Internal Servor error",
      error,
    });
  }
};
