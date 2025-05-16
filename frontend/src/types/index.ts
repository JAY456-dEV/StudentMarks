export interface Student {
  _id: string;
  name: string;
  age: string;
  rollNumber: string;
  class: string;
  studentId: string;
}

export interface Subject {
  _id: string;
  subjectId: string;
  name: string;
}

export interface Mark {
  _id: string;
  studentId: string;
  subjectId: string;
  marks: number;
}

export interface StudentWithMarks extends Student {
  subjects: {
    subjectName: string;
    marks: number;
  }[];
  averageMarks: number;
}