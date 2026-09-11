import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  teamMembers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
});

export const Project = mongoose.model("Project", projectSchema);
