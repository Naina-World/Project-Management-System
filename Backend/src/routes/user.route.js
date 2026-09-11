import express from "express";
import {
  createUserController,
  getAllUsers,
} from "../controllers/userController.js";
const router = express.Router();

router.post("/create-user", createUserController);

router.get("/get-users", getAllUsers);
export default router;
