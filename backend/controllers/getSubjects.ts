import { Request, Response } from "express";
import { Subject } from "../models/Subject";

export async function handleGetSubjects(req: Request, res: Response) {
  try {
    const subjects = await Subject.find();
    res.status(200).json(subjects);
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
