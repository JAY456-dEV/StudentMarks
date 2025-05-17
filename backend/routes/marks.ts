import { Router } from "express";
import { handleAddMarks } from "../controllers/addMarks";

const router = Router();

router.post("/add-marks", handleAddMarks);

export default router;
