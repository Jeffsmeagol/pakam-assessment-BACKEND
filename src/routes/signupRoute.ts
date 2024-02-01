import express, { Request, Response } from "express";
import bcrypt from "bcrypt";

import  User  from "../models/user";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { firstname, lastname, username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(401).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userDetails = {
      firstname,
      lastname,
      username,
      password: hashedPassword,
    };
    const user = new User(userDetails);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).send("Error creating user");
  }
});

export default router;
