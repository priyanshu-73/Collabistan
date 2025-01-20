import mongoose from "mongoose";
import Project from "../models/project.model.js";

export const createProject = ({ name, userId }) => {
  if (!name) {
    throw new Error("name is required");
  }
  if (!userId) {
    throw new Error("User id is required");
  }

  const project = Project.create({ name, users: [userId] });
  return project;
};

export const getAllProjectByUserId = async ({ userId }) => {
  if (!userId) {
    throw new Error("Please login to see your projects");
  }

  const allProjects = await Project.find({ users: userId });

  return allProjects;
};

export const getOneProject = async ({ projectId }) => {
  if (!projectId) {
    throw new Error("ProjectId is required");
  }
  const project = await Project.findOne({ _id: projectId }).populate("users");

  return project;
};

export const addUsers = async ({ projectId, users, userId }) => {
  if (!projectId) {
    throw new Error("ProjectId is required");
  }

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid PorjectId");
  }

  if (!users) {
    throw new Error("Users are required");
  }

  if (
    !Array.isArray(users) ||
    users.some((userId) => !mongoose.Types.ObjectId.isValid(userId))
  ) {
    throw new Error("Invalid userId(s) in users array");
  }

  if (!userId) {
    throw new Error("UserId is required");
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid UserId");
  }

  const project = await Project.findOne({ _id: projectId, users: userId });

  if (!project) {
    throw new Error("Invalid access");
  }

  const existingUsers = await Project.findOne(
    { _id: projectId, users: { $in: users } },
    { users: 1 }
  );

  if (existingUsers && existingUsers.users.length > 0) {
    throw new Error("One or more users are already members of this project");
  }

  const updatedProject = await Project.findOneAndUpdate(
    {
      _id: projectId,
    },
    {
      $addToSet: {
        users: {
          $each: users,
        },
      },
    },
    {
      new: true,
    }
  );

  return updatedProject;
};
