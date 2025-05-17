import React, { useEffect, useState } from "react";
import { useModal } from "../hooks/useModal";
import Modal from "./Modal";
import StudentForm from "./StudentForm";
import MarksForm from "./MarksForm";
import { Plus, GraduationCap } from "lucide-react";
import type { StudentWithMarks } from "../types";

const StudentsList: React.FC<{
  studentsWithMarks: StudentWithMarks[];
  setStudentsWithMarks: React.Dispatch<
    React.SetStateAction<StudentWithMarks[]>
  >;
  getStudentsMarks: any;
}> = ({ studentsWithMarks, setStudentsWithMarks, getStudentsMarks }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterdData, setFilterdData] = useState<any>([]);
  const studentModal = useModal();
  const marksModal = useModal();

  const handleSuccess = (data: any) => {
    getStudentsMarks();
    marksModal.closeModal();
  };

  function handleStudentSuccess(data: any) {
    getStudentsMarks();
    studentModal.closeModal();
  }

  useEffect(() => {
    const filteredStudents = studentsWithMarks.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber.includes(searchTerm) ||
        student.class.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilterdData(filteredStudents);
  }, [studentsWithMarks, searchTerm]);

  async function handleDelete(id: string) {
    try {
      const response = await fetch(`http://localhost:7000/students/delete-students/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response?.ok) {
        getStudentsMarks();
      }
    } catch (error) {
      console.log("Error to delete student", error);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex-1 max-w-lg">
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-4 ml-4">
          <button
            onClick={studentModal.openModal}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Student
          </button>
          <button
            onClick={marksModal.openModal}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <GraduationCap className="w-4 h-4 mr-2" />
            Add Marks
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filterdData && filterdData.length
          ? filterdData?.map((student: any) => (
              <div
                onClick={() => handleDelete(student?._id)}
                key={student._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative"
              >
                <button
                  className="right-2 top-0 p-1 rounded-full absolute"
                  aria-label="Delete subject"
                >
                  <div className="h-4 w-4 text-gray-400 hover:text-red-500">
                    X
                  </div>
                </button>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {student.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Roll No: {student.rollNumber}
                      </p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {student.class}
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-500">
                        Average Score
                      </span>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          student.averageMarks >= 90
                            ? "bg-green-100 text-green-800"
                            : student.averageMarks >= 80
                            ? "bg-blue-100 text-blue-800"
                            : student.averageMarks >= 70
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {student.averageMarks}%
                      </span>
                    </div>

                    <div className="space-y-2">
                      {student?.subjects.map((subject: any, index: number) => (
                        <div
                          key={index}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-gray-600">
                            {subject.subjectName}
                          </span>
                          <span className="font-medium">
                            {subject.marks && subject.marks + "%"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          : "No Students Added"}
      </div>

      <Modal
        isOpen={studentModal.isOpen}
        onClose={studentModal.closeModal}
        title="Add New Student"
      >
        <StudentForm onSuccess={handleStudentSuccess} />
      </Modal>

      <Modal
        isOpen={marksModal.isOpen}
        onClose={marksModal.closeModal}
        title="Add Student Marks"
      >
        <MarksForm
          onSuccess={handleSuccess}
          studentsWithMarks={studentsWithMarks}
        />
      </Modal>
    </div>
  );
};

export default StudentsList;
