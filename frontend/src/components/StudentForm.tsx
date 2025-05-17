import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { Student } from "../types";

interface StudentFormProps {
  onSuccess: (student: Student) => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ onSuccess }) => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters"),
    age: Yup.number().required("age is required"),
    rollNumber: Yup.string()
      .required("Roll number is required")
      .matches(/^[0-9]+$/, "Roll number must contain only digits"),
    class: Yup.string().required("Class is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      rollNumber: "",
      class: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const response = await fetch("http://localhost:7000/students/create-student", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values?.name,
            age: parseInt(values?.age),
            classNumber: values?.class,
            rollNumber: values?.rollNumber,
          }),
        });
        const newStudent = await response.json();
        onSuccess(newStudent);
        resetForm();
      } catch (error) {
        console.error("Error adding student:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter student name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`block w-full px-3 py-2 bg-white border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 sm:text-sm
            ${
              formik.touched.name && formik.errors.name
                ? "border-red-500"
                : "border-gray-300"
            }`}
        />
        {formik.touched.name && formik.errors.name && (
          <p className="mt-1 text-sm text-red-600">{formik.errors.name}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="age"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          age
        </label>
        <input
          id="age"
          name="age"
          type="age"
          placeholder="Enter student age"
          value={formik.values.age}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`block w-full px-3 py-2 bg-white border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 sm:text-sm
            ${
              formik.touched.age && formik.errors.age
                ? "border-red-500"
                : "border-gray-300"
            }`}
        />
        {formik.touched.age && formik.errors.age && (
          <p className="mt-1 text-sm text-red-600">{formik.errors.age}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label
            htmlFor="rollNumber"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Roll Number
          </label>
          <input
            id="rollNumber"
            name="rollNumber"
            type="text"
            placeholder="Enter roll number"
            value={formik.values.rollNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`block w-full px-3 py-2 bg-white border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 sm:text-sm
              ${
                formik.touched.rollNumber && formik.errors.rollNumber
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
          />
          {formik.touched.rollNumber && formik.errors.rollNumber && (
            <p className="mt-1 text-sm text-red-600">
              {formik.errors.rollNumber}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="class"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Class
          </label>
          <input
            id="class"
            name="class"
            type="text"
            placeholder="Enter class (e.g., 10A)"
            value={formik.values.class}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`block w-full px-3 py-2 bg-white border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 sm:text-sm
              ${
                formik.touched.class && formik.errors.class
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
          />
          {formik.touched.class && formik.errors.class && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.class}</p>
          )}
        </div>
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
            "Add Student"
          )}
        </button>
      </div>
    </form>
  );
};

export default StudentForm;
