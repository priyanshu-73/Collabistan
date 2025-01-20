import Project from "../models/project.model.js";
import User from "../models/user.model.js";
import { createProject } from "../services/project.service.js";
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
