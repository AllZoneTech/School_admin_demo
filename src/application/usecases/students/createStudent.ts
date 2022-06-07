import { inject, injectable } from "inversify";
import { StudentInterface } from "@interfaces/students/studentInterface";
import type { Student } from "@models/student";
@injectable()
export class CreateStudent {
  @inject(StudentInterface) studentInterface!: StudentInterface;

  async execute(student: Partial<Student>): Promise<Student["studentID"]> {
    return this.studentInterface.createStudent(student);
  }
}
