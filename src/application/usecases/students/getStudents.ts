import { inject, injectable } from "inversify";
import { StudentInterface } from "@interfaces/students/studentInterface";
import { Student } from "@models/student";

@injectable()
export class GetStudents {
  @inject(StudentInterface) studentInterface!: StudentInterface;

  async execute(): Promise<Student[]> {
    return this.studentInterface.getStudents();
  }
}
