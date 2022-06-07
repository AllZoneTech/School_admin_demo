import { inject, injectable } from "inversify";
import { StudentStudyGroupInterface } from "@interfaces/studentStudyGroup/studentStudyGroupInterface";
import type { StudentStudyGroup } from "@models/studentStudyGroup";
@injectable()
export class DeleteStudentStudyGroup {
  @inject(StudentStudyGroupInterface)
  studentstudyGroupInterface!: StudentStudyGroupInterface;

  async execute(studentStudyGroup: Partial<StudentStudyGroup>): Promise<void> {
    return this.studentstudyGroupInterface.deleteStudentStudyGroup(
      studentStudyGroup
    );
  }
}
