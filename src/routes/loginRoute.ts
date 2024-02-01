import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";

import User from "../models/user";

const router = express.Router();

const jwtSecret: Secret | undefined =
  process.env.JWT_SECRET_TOKEN || "change_your_jwt_secret";

if (!jwtSecret) {
  console.error(
    "JWT secret is missing. Please check your environment variables."
  );
  process.exit(1);
}

router.post("/", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid Username" });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(402).json({ message: "Invalid password credentials" });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({ username }, jwtSecret);

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

console.log(process.env.JWT_SECRET_TOKEN);
export default router;
