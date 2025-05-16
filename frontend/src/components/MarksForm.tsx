import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getSubjects } from "../utils/studentsApiCall/getSubjects";
import type { Mark, Student, StudentWithMarks, Subject } from "../types";

interface MarksFormProps {
  onSuccess: (mark: Mark) => void;
  studentsWithMarks: StudentWithMarks[];
}

const MarksForm: React.FC<MarksFormProps> = ({
  onSuccess,
  studentsWithMarks,
}) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [existingMarks, setExistingMarks] = useState<Mark[]>([]);

  useEffect(() => {
    setStudents(studentsWithMarks);
  }, [studentsWithMarks]);

  async function handleGetSubject() {
    const data = await getSubjects();
    setSubjects(data);
  }

  useEffect(() => {
    handleGetSubject();
  }, []);

  const validationSchema = Yup.object({
    studentId: Yup.string().required("Student is required"),
    subjectId: Yup.string().required("Subject is required"),
    marks: Yup.number()
      .required("Marks are required")
      .min(0, "Marks cannot be negative")
      .max(100, "Marks cannot exceed 100"),
  });

  const formik = useFormik({
    initialValues: {
      studentId: "",
      subjectId: "",
      marks: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting, setFieldError }) => {
      try {
        const response = await fetch("http://localhost:8000/add-marks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentId: values.studentId,
            subjectId: values.subjectId,
            marks: Number(values.marks),
          }),
        });
        
        const data = await response.json();
        console.log(data,"adddemarak")
        // onSuccess(newMark);
        resetForm();
      } catch (error) {
        console.error("Error adding marks:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div className="mb-4">
        <label
          htmlFor="studentId"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Student
        </label>
        <select
          id="studentId"
          name="studentId"
          value={formik.values.studentId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`block w-full px-3 py-2 bg-white border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 sm:text-sm
            ${
              formik.touched.studentId && formik.errors.studentId
                ? "border-red-500"
                : "border-gray-300"
            }`}
        >
          <option value="">Select a student</option>
          {students.map((student) => (
            <option key={student._id} value={student._id}>
              {student.name} ({student.rollNumber})
            </option>
          ))}
        </select>
        {formik.touched.studentId && formik.errors.studentId && (
          <p className="mt-1 text-sm text-red-600">{formik.errors.studentId}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="subjectId"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Subject
        </label>
        <select
          id="subjectId"
          name="subjectId"
          value={formik.values.subjectId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`block w-full px-3 py-2 bg-white border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 sm:text-sm
            ${
              formik.touched.subjectId && formik.errors.subjectId
                ? "border-red-500"
                : "border-gray-300"
            }`}
        >
          <option value="">Select a subject</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
        {formik.touched.subjectId && formik.errors.subjectId && (
          <p className="mt-1 text-sm text-red-600">{formik.errors.subjectId}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="marks"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Marks
        </label>
        <input
          id="marks"
          name="marks"
          type="number"
          placeholder="Enter marks (0-100)"
          value={formik.values.marks}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          min={0}
          max={100}
          className={`block w-full px-3 py-2 bg-white border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 sm:text-sm
            ${
              formik.touched.marks && formik.errors.marks
                ? "border-red-500"
                : "border-gray-300"
            }`}
        />
        {formik.touched.marks && formik.errors.marks && (
          <p className="mt-1 text-sm text-red-600">{formik.errors.marks}</p>
        )}
      </div>

      <div className="flex justify-end mt-4">
        <button
          type="submit"
          disabled={formik.isSubmitting || !formik.isValid}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors
            ${
              (formik.isSubmitting || !formik.isValid) &&
              "opacity-50 cursor-not-allowed"
            }`}
        >
          {formik.isSubmitting ? (
            <span className="inline-flex items-center">
              <span className="mr-2">Loading...</span>
            </span>
          ) : (
            "Add Marks"
          )}
        </button>
      </div>
    </form>
  );
};

export default MarksForm;
