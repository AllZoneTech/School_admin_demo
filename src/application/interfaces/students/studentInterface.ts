import type { Student } from "@models/student";

export const StudentInterface = Symbol("interfaces.students");

export interface StudentInterface {
  getStudents(): Promise<Student[]>;
  createStudent(student: Partial<Student>): Promise<Student["studentID"]>;
  updateStudent(
    studentID: Student["studentID"],
    student: Partial<Student>
  ): Promise<void>;
  deleteStudent(studentID: Student["studentID"]): Promise<void>;
}
