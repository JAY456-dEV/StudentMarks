export async function getStudentsMarks() {
  const response = await fetch("http://localhost:7000/students", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data
}
