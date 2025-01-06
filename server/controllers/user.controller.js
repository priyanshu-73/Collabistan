import { validationResult } from "express-validator";
import { createUser } from "../services/user.services.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import redisClient from "../services/redis.service.js";

export const userSignup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const user = await createUser({ email, password });
    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });
    console.log(token);
    res.cookie("token", token).status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const userLogin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("Email and password are required");
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json("Invalid User");
    }
    const matchPass = bcryptjs.compareSync(password, user.password);
    if (!matchPass) {
      return res.status(401).json("Invalid Credentials");
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });
    res.cookie("token", token).status(200).json({ user, token });
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error);
  }
};

export const getProfile = async (req, res) => {
  res.status(200).json({ user: req.user });
};

export const userLogout = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    redisClient.set(token, "logout", "EX", 60 * 60 * 24);
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
