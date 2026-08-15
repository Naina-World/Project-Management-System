import db from "../models/index.js";
const { Task, User, Project } = db;

export const createTask = async (req, res) => {
  try {
    let body = req.body || {};
    const { title = "", createdBy = null, projectId = null } = body;

    if (!title || !createdBy || !projectId) {
      return res.status(400).json({
        message: "Title,  ProjectId and createdBy are required",
      });
    }

    const user = await User.findById(createdBy);
    if (!user) {
      return res.status(400).json({
        message: "No such user exist",
      });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(400).json({
        message: "No such Project exist",
      });
    }

    const allowedBody = {
      title: true,
      description: true,
      createdBy: true,
      status: true,
      assignedTo: true,
      projectId: true,
    };

    let payload = {};

    for (const key in body) {
      if (allowedBody?.[key]) {
        payload[key] = body[key];
      }
    }

    const task = await Task.create({ ...payload });

    return res.status(201).json({
      message: "Task Created successfully",
      task,
    });
  } catch (error) {
    console.log("error=>Task", error);
    return res.status(400).json({
      message: "Internal Servor error",
      error,
    });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({})
      .populate("createdBy")
      .populate("assignedTo")
      .populate("projectId");
    return res.status(201).json({
      message: "Tasks fetched successfully",
      tasks,
    });
  } catch (error) {
    console.log("error=>getAllProjects", error);
    return res.status(400).json({
      message: "Internal Servor error",
      error,
    });
  }
};

export const updateTask = async (req, res) => {
  const taskId = req.params?.id;
  let body = req.body || {};
  if (!taskId) {
    return res.status(400).json({
      message: "Task Id is required",
    });
  }

  const allowedBody = {
    title: true,
    description: true,
    createdBy: true,
    status: true,
    assignedTo: true,
  };
  let payload = {};

  for (const key in body) {
    if (allowedBody?.[key]) {
      payload[key] = body[key];
    }
  }

  const task = await Task.findByIdAndUpdate(
    taskId,
    {
      ...payload,
    },
    {
      new: true,
    }
  );

  if (!task) {
    return res.status(400).json({
      message: "Task does not exist",
    });
  }

  return res.status(200).json({
    message: "Taks updated successfully",
    task,
  });
};

export const deleteTask = async (req, res) => {
  const taskId = req.params?.id;
  if (!taskId) {
    return res.status(400).json({
      message: "Task Id is required",
    });
  }

  const task = await Task.findByIdAndDelete(taskId);
  if (!task) {
    return res.status(400).json({
      message: "Task does not exist",
    });
  }

  return res.status(200).json({
    message: "Task deleted successfully",
    task,
  });
};
