import express from "express";
import {
  getAllUsers,
  getProfile,
  userLogin,
  userLogout,
  userSignup,
} from "../controllers/user.controller.js";
import { body } from "express-validator";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/signup",
  body("email").isEmail().withMessage("Invalid Email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password be at least 6 letters long"),
  userSignup
);

router.post(
  "/signin",
  body("email").isEmail().withMessage("Invalid Email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password be at least 6 letters long"),
  userLogin
);

router.get("/profile", isAuth, getProfile);
router.get("/all", isAuth, getAllUsers);
router.get("/logout", isAuth, userLogout);
export default router;
