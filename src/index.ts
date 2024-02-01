import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

import assessmentRoute from "./routes/assessmentRoute";
import signupRoute from "./routes/signupRoute";
import loginRoute from "./routes/loginRoute";
import authMiddleware from "./middleware/authMiddleware";

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://adebowalejeff:M6VsLsqiOddr3gmf@cluster0.kemjulm.mongodb.net/pakam?retryWrites=true&w=majority";

app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/assessments", authMiddleware, assessmentRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(
      `Server is running on http://localhost:${PORT}`,
      "listening for requests"
    );
  });
});
