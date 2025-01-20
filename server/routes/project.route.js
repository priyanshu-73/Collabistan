import express from "express";
import { body } from "express-validator";
import {
  addUserToProject,
  getProjects,
  newProject,
} from "../controllers/project.controller.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/create",
  isAuth,
  body("name").isString().withMessage("Invalid name"),
  newProject
);

router.get("/all", isAuth, getProjects);

router.put(
  "/addusers",
  isAuth,
  body("projectId").isString().withMessage("Project Id is required"),
  body("users")
    .isArray({ min: 1 })
    .withMessage("Users must be an array of strings")
    .bail()
    .custom((users) => users.every((user) => typeof user === "string"))
    .withMessage("Each user must be a string"),
  addUserToProject
);

export default router;
