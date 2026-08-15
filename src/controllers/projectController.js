import db from "../models/index.js";
const { User, Project } = db;

export const createProject = async (req, res) => {
  try {
    let body = req.body || {};
    const { title = "", createdBy = null } = body;

    if (!title || !createdBy) {
      return res.status(400).json({
        message: "Title and createdBy are required",
      });
    }

    const user = await User.findById(createdBy);
    if (!user) {
      return res.status(400).json({
        message: "No such user exist",
      });
    }

    const allowedBody = {
      title: true,
      description: true,
      createdBy: true,
      teamMembers: true,
    };

    let payload = {};

    for (const key in body) {
      if (allowedBody?.[key]) {
        payload[key] = body[key];
      }
    }

    const project = await Project.create({ ...payload });

    return res.status(201).json({
      message: "Project Created successfully",
      project,
    });
  } catch (error) {
    console.log("error=>createProject", error);
    return res.status(400).json({
      message: "Internal Servor error",
      error,
    });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({})
      .populate("createdBy")
      .populate("teamMembers");
    return res.status(201).json({
      message: "Projects fetched successfully",
      projects,
    });
  } catch (error) {
    console.log("error=>getAllProjects", error);
    return res.status(400).json({
      message: "Internal Servor error",
      error,
    });
  }
};

export const updateProject = async (req, res) => {
  const projectId = req.params?.id;
  let body = req.body || {};
  if (!projectId) {
    return res.status(400).json({
      message: "Project Id is required",
    });
  }

  const allowedBody = {
    title: true,
    description: true,
    createdBy: true,
    teamMembers: true,
  };

  let payload = {};

  for (const key in body) {
    if (allowedBody?.[key]) {
      payload[key] = body[key];
    }
  }

  const project = await Project.findByIdAndUpdate(
    projectId,
    {
      ...payload,
    },
    {
      new: true,
    }
  );

  if (!project) {
    return res.status(400).json({
      message: "Project does not exist",
    });
  }

  return res.status(200).json({
    message: "Project updated successfully",
    project,
  });
};

export const deleteProject = async (req, res) => {
  const projectId = req.params?.id;
  if (!projectId) {
    return res.status(400).json({
      message: "Project Id is required",
    });
  }

  const project = await Project.findByIdAndDelete(projectId);
  if (!project) {
    return res.status(400).json({
      message: "Project does not exist",
    });
  }

  return res.status(200).json({
    message: "Project deleted successfully",
    project,
  });
};
