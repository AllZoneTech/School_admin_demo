import { inject, injectable } from "inversify";
import { StudentStudyGroupInterface } from "@interfaces/studentStudyGroup/studentStudyGroupInterface";
import type { StudentStudyGroup } from "@models/studentStudyGroup";
import type { Student } from "@models/student";
@injectable()
export class GetStudentsByStudyGroupID {
  @inject(StudentStudyGroupInterface)
  studentstudyGroupInterface!: StudentStudyGroupInterface;

  async execute(
    studyGroupID: StudentStudyGroup["groupID"]
  ): Promise<Student[]> {
    return this.studentstudyGroupInterface.getStudentsByStudyGroupID(
      studyGroupID
    );
  }
}
