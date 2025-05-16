import { Student, Subject, Mark } from '../types';

export const initialStudents: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    rollNumber: '101',
    class: '10A',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    rollNumber: '102',
    class: '10A',
  },
  {
    id: '3',
    name: 'Michael Johnson',
    email: 'michael.johnson@example.com',
    rollNumber: '103',
    class: '10B',
  },
];

export const initialSubjects: Subject[] = [
  {
    id: '1',
    name: 'Mathematics',
    code: 'MATH101',
  },
  {
    id: '2',
    name: 'Science',
    code: 'SCI101',
  },
  {
    id: '3',
    name: 'English',
    code: 'ENG101',
  },
  {
    id: '4',
    name: 'History',
    code: 'HIST101',
  },
  {
    id: '5',
    name: 'Computer Science',
    code: 'CS101',
  },
];

export const initialMarks: Mark[] = [
  {
    id: '1',
    studentId: '1',
    subjectId: '1',
    marks: 85,
  },
  {
    id: '2',
    studentId: '1',
    subjectId: '2',
    marks: 78,
  },
  {
    id: '3',
    studentId: '1',
    subjectId: '3',
    marks: 92,
  },
  {
    id: '4',
    studentId: '2',
    subjectId: '1',
    marks: 76,
  },
  {
    id: '5',
    studentId: '2',
    subjectId: '2',
    marks: 88,
  },
  {
    id: '6',
    studentId: '3',
    subjectId: '4',
    marks: 94,
  },
];