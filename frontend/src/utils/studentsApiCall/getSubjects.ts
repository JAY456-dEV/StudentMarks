import type { Subject } from "../../types";

export const getSubjects = async (): Promise<Subject[]> => {
  const response = await fetch("http://localhost:8000/all-subjects", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};
