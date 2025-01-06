import express, { urlencoded } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import db from "./db/db.js";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
db(process.env.MONGO_URI);

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/user", userRouter);

export default app;
