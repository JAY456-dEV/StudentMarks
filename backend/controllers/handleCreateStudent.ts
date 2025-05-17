import { Request, Response } from "express";
import { Student } from "../models/Student";

export const createStudent = async (req: any, res: any) => {
  try {
    const { name, age, classNumber, rollNumber } = req.body as {
      name: string;
      age: number;
      classNumber: string;
      rollNumber: string;
    };

    if (!name || !rollNumber || !classNumber || typeof age !== "number") {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const newStudent = await Student.create({
      studentName: name,
      age,
      class: classNumber,
      rollNumber,
    });

    return res.status(201).json({
      message: "Student created",
      student: newStudent,
    });
  } catch (error) {
    console.error("Error creating student:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};