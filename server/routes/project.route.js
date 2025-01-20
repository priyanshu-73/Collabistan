import express from "express";
import { body } from "express-validator";
import { newProject } from "../controllers/project.controller.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/create",
  isAuth,
  body("name").isString().withMessage("Invalid name"),
  newProject
);

export default router;
