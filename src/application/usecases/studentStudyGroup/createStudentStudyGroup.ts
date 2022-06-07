import { inject, injectable } from "inversify";
import { StudentStudyGroupInterface } from "@interfaces/studentStudyGroup/studentStudyGroupInterface";
import type { StudentStudyGroup } from "@models/studentStudyGroup";
@injectable()
export class CreateStudentStudyGroup {
  @inject(StudentStudyGroupInterface)
  studentstudyGroupInterface!: StudentStudyGroupInterface;

  async execute(
    studentID: StudentStudyGroup["studentID"],
    groupIDs: Array<StudentStudyGroup["groupID"]>
  ): Promise<void> {
    return this.studentstudyGroupInterface.createStudentStudyGroup(
      studentID,
      groupIDs
    );
  }
}
