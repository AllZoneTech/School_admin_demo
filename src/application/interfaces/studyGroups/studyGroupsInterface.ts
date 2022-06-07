import type { StudyGroup } from "@models/studyGroup";

export const StudyGroupInterface = Symbol("interfaces.studyGroups");

export interface StudyGroupInterface {
  getStudyGroups(): Promise<StudyGroup[]>;
  createStudyGroup(StudyGroup: Partial<StudyGroup>): Promise<void>;
}
