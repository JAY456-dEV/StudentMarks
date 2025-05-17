import { Router } from "express";
import { handleCreateSubject } from "../controllers/addSubject";
import { handleGetSubjects } from "../controllers/getSubjects";

const router = Router();

router.post("/add-subject", handleCreateSubject);
router.get("/all-subjects", handleGetSubjects);

export default router;