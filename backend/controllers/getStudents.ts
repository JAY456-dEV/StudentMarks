import { Student } from "../models/Student";
import { Request, Response } from "express";

export async function handleGetStudents(req: Request, res: Response){
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
}