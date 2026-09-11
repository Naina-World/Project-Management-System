import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  projectId: {
    type: mongoose.Schema.ObjectId,
    ref: "Project",
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    default: "pending",
  },
  assignedTo: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

export const Task = mongoose.model("Task", taskSchema);
