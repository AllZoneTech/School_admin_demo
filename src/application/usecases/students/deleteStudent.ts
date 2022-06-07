import { inject, injectable } from "inversify";
import { StudentInterface } from "@interfaces/students/studentInterface";
import type { Student } from "@models/student";
@injectable()
export class DeleteStudent {
  @inject(StudentInterface) studentInterface!: StudentInterface;

  async execute(studentID: Student["studentID"]): Promise<void> {
    return this.studentInterface.deleteStudent(studentID);
  }
}
