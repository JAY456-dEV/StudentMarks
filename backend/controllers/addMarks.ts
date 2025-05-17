import { Mark } from "../models/Mark";
import { Student } from "../models/Student";
import { Subject } from "../models/Subject";

export async function handleAddMarks(req: any, res: any) {
  try {
    const { studentId, subjectId, marks } = req.body;

    if (!studentId || !subjectId || typeof marks !== "number") {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const student = await Student.findById(studentId);
    const subject = await Subject.findById(subjectId);

    if (!student || !subject) {
      return res.status(404).json({ error: "Student or subject not found" });
    }

    const newMark = await Mark.create({
      studentId,
      subjectId,
      marks,
    });

    res.status(201).json({ message: "Marks added", data: newMark });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding marks", error });
  }
}
