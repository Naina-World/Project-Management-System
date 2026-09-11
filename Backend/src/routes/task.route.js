import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/create-task", createTask);
router.get("/get-task", getAllTasks);
router.put("/update/task/:id", updateTask);
router.delete("/delete/task/:id", deleteTask);
export default router;
