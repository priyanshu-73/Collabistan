import express from "express";
import { body } from "express-validator";
import { getProjects, newProject } from "../controllers/project.controller.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/create",
  isAuth,
  body("name").isString().withMessage("Invalid name"),
  newProject
);

router.get("/all", isAuth, getProjects);

export default router;
