import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Student } from "./models/Student";
import { Subject } from "./models/Subject";
import { Mark } from "./models/Mark";
import cors from "cors";
import studentsRoute from "./routes/student";
import subjectRoute from "./routes/subject";
import marksRoute from "./routes/marks";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/students", studentsRoute);
app.use("/subject", subjectRoute);
app.use("/marks", marksRoute);

mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("database connection error:", err));

app.listen(7000, () => {
  console.log(`Server running on http://localhost:${7000}`);
});
