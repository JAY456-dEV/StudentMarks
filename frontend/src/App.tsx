import { useEffect, useState } from "react";
import StudentsList from "./components/StudentsList";
import type { StudentWithMarks } from "./types";

function App() {
  const [studentsWithMarks, setStudentsWithMarks] = useState<
    StudentWithMarks[]
  >([]);

  async function getStudentsMarks() {
    const response = await fetch("http://localhost:7000/students/get-students", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setStudentsWithMarks(data);
  }

  useEffect(() => {
    getStudentsMarks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <StudentsList
        studentsWithMarks={studentsWithMarks}
        setStudentsWithMarks={setStudentsWithMarks}
        getStudentsMarks={getStudentsMarks}
      />
    </div>
  );
}

export default App;
