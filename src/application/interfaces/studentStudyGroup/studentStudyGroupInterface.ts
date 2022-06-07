import type { StudentStudyGroup } from "@models/studentStudyGroup";
import type { Student } from "@models/student";

export const StudentStudyGroupInterface = Symbol(
  "interfaces.studentStudyGroups"
);

export interface StudentStudyGroupInterface {
  getStudentsByStudyGroupID(
    studyGroupID: StudentStudyGroup["groupID"]
  ): Promise<Student[]>;
  createStudentStudyGroup(
    studentID: StudentStudyGroup["studentID"],
    groupIDs: Array<StudentStudyGroup["groupID"]>
  ): Promise<void>;
  deleteStudentStudyGroup(
    StudentStudyGroup: Partial<StudentStudyGroup>
  ): Promise<void>;
}
