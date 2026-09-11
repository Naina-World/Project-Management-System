import express from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  updateProject,
} from "../controllers/projectController.js";

const router = express.Router();

router.post("/create-project", createProject);
router.get("/get-project", getAllProjects);
router.put("/update/project/:id", updateProject);
router.delete("/delete/project/:id", deleteProject);
export default router;
