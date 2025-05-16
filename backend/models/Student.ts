import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  age: Number,
  class: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
    require: true,
    unique: true,
  },
});

export const Student = mongoose.model("Student", studentSchema);
