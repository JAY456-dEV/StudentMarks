import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Student } from "./models/Student";
import { Subject } from "./models/Subject";
import { Mark } from "./models/Mark";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("database connection error:", err));

app.post("/create-student", async (req: any, res: any) => {
  try {
    const {
      name,
      age,
      classNumber,
      rollNumber,
    }: { name: string; age: number; classNumber: string; rollNumber: string } =
      req.body;
    if (!name || !rollNumber || !classNumber || typeof age !== "number") {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const newStudent = await Student.create({
      studentName: name,
      age,
      class: classNumber,
      rollNumber,
    });

    return res
      .status(201)
      .json({ message: "Student created", student: newStudent });
  } catch (error) {
    console.error("Error creating student:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/add-marks", async (req, res) => {
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
});

app.post("/add-subject", async (req: any, res: any) => {
  try {
    const { subjectId, name }: { subjectId: string; name: string } = req.body;

    if (!subjectId || !name) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const subject = await Subject.create({ subjectId, name });

    res.status(201).json({ message: "Subject created", subject });
  } catch (error) {
    console.error("Error creating subject:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/all-subjects", async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json(subjects);
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/students", async (req, res) => {
  try {
    const students = await Student.aggregate([
      {
        $lookup: {
          from: "marks",
          localField: "_id",
          foreignField: "studentId",
          as: "marks",
        },
      },
      {
        $unwind: {
          path: "$marks",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "subjects",
          localField: "marks.subjectId",
          foreignField: "_id",
          as: "marks.subject",
        },
      },
      {
        $unwind: {
          path: "$marks.subject",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          studentName: { $first: "$studentName" },
          age: { $first: "$age" },
          class: { $first: "$class" },
          rollNumber: { $first: "$rollNumber" },
          subjects: {
            $push: {
              subjectName: "$marks.subject.name",
              marks: "$marks.marks",
            },
          },
          averageMarks: { $avg: "$marks.marks" },
        },
      },
      {
        $project: {
          studentId: "$_id",
          name: "$studentName",
          age: 1,
          class: 1,
          rollNumber: 1,
          subjects: {
            $filter: {
              input: "$subjects",
              as: "subject",
              cond: { $ne: ["$$subject.subjectName", null] },
            },
          },
          averageMarks: {
            $cond: {
              if: { $gt: [{ $size: "$subjects" }, 0] },
              then: { $round: ["$averageMarks", 2] },
              else: null,
            },
          },
        },
      },
    ]);

    res.json(students);
  } catch (err) {
    console.error("Error in /students:", err);
    res.status(500).send("Failed to fetch student data");
  }
});

app.listen(8000, () => {
  console.log(`Server running on http://localhost:${8000}`);
});