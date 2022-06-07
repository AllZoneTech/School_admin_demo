import { inject, injectable } from "inversify";
import { StudyGroupInterface } from "@interfaces/studyGroups/studyGroupsInterface";
import type { StudyGroup } from "@models/studyGroup";
@injectable()
export class CreateStudyGroup {
  @inject(StudyGroupInterface) studyGroupInterface!: StudyGroupInterface;

  async execute(studyGroup: Partial<StudyGroup>): Promise<void> {
    return this.studyGroupInterface.createStudyGroup(studyGroup);
  }
}
