import express, { Request, Response } from "express";

import Assessment from "../models/assessment";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const assessments = await Assessment.find(
      { username: req.user.username },
      { __v: 0, username: 0 }
    );
    res.json(assessments);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving users");
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const assessment = new Assessment({
      ...req.body,
      username: req.user.username,
    });
    await assessment.save();
    res.status(201).json(assessment);
  } catch (err) {
    console.error(err);
    res.status(400).send("Error creating assessment");
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, quantity } = req.body;

  try {
    const updatedAssessment = await Assessment.findByIdAndUpdate(
      id,
      { username: req.user.username, name, description, quantity },
      { new: true }
    );

    if (!updatedAssessment) {
      return res.status(404).json({ error: "Assessment not found" });
    }

    res.json(updatedAssessment);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedAssessment = await Assessment.findByIdAndDelete(id);

    if (!deletedAssessment) {
      return res.status(404).json({ error: "Assessment not found" });
    }

    res.json(deletedAssessment);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
