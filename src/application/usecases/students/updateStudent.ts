import { inject, injectable } from "inversify";
import { StudentInterface } from "@interfaces/students/studentInterface";
import type { Student } from "@models/student";
@injectable()
export class UpdateStudent {
  @inject(StudentInterface) studentInterface!: StudentInterface;

  async execute(
    studentID: Student["studentID"],
    student: Partial<Student>
  ): Promise<void> {
    return this.studentInterface.updateStudent(studentID, student);
  }
}
