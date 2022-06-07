import { inject, injectable } from "inversify";
import { StudyGroupInterface } from "@interfaces/studyGroups/studyGroupsInterface";
import type { StudyGroup } from "@models/studyGroup";
@injectable()
export class GetStudyGroup {
  @inject(StudyGroupInterface) studyGroupInterface!: StudyGroupInterface;

  async execute(): Promise<Array<StudyGroup>> {
    return this.studyGroupInterface.getStudyGroups();
  }
}
