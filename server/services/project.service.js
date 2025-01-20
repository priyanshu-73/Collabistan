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
