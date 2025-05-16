export interface Student {
  _id: string;
  name: string;
  age: string;
  rollNumber: string;
  class: string;
  studentId: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
}

export interface Mark {
  id: string;
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
