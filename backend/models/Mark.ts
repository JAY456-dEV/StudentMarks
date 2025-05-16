import mongoose, { Schema } from "mongoose";

const markSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  subjectId: {
    type: Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
});

export const Mark = mongoose.model("Mark", markSchema);
