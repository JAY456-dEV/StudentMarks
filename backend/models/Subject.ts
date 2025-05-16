import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  subjectId: {
    type: String,
    required: true,
    unique: true, 
  },
  name: {
    type: String,
    required: true,
  },
});

export const Subject = mongoose.model("Subject", subjectSchema);
