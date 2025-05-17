import { Router } from "express";
import { handleGetStudents } from "../controllers/getStudents";
import { createStudent } from "../controllers/handleCreateStudent";
import { deleteStudent } from "../controllers/deleteStudent";

const router = Router();

router.post("/create-student", createStudent);
router.get("/get-students", handleGetStudents);
router.delete("/delete-students/:id", deleteStudent);

export default router;
