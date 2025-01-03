import "express-async-errors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import { authenticateUser } from "./middlewares/authMiddleware.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.static(path.resolve(__dirname, "./public")));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);

  app.listen(port, () => {
    console.log(`Port is listening on port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
