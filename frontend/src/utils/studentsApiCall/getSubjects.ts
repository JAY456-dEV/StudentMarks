import type { Subject } from "../../types";

export const getSubjects = async (): Promise<Subject[]> => {
  try {
    const response = await fetch("http://localhost:8000/all-subjects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch subjects');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching subjects:', error);
    return [];
  }
};