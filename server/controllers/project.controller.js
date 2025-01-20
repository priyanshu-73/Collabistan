import Project from "../models/project.model.js";
import User from "../models/user.model.js";
import {
  addUsers,
  createProject,
  getAllProjectByUserId,
} from "../services/project.service.js";
import { validationResult } from "express-validator";

export const newProject = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name } = req.body;
    const email = req.user.email;
    const loggedInUser = await User.findOne({ email });

    const exist = await Project.findOne({ name });
    if (exist) {
      return res
        .status(400)
        .json({ message: "Project with this name already exists" });
    }

    const userId = loggedInUser._id;

    const project = await createProject({ name, userId });

    res.status(201).json(project);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const getProjects = async (req, res) => {
  try {
    const loggedInUser = await User.findOne({ email: req.user.email });

    const projects = await getAllProjectByUserId({ userId: loggedInUser._id });

    res.status(200).json({ projects: projects });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const addUserToProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const loggedInUser = await User.findOne({ email: req.user.email });
    const { projectId, users } = req.body;

    const project = await addUsers({
      projectId,
      users,
      userId: loggedInUser._id,
    });

    res.status(200).json({ project: project });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};
