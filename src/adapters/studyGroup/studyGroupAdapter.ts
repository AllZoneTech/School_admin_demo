import { injectable } from "inversify";
import { StudyGroupInterface } from "@interfaces/studyGroups/studyGroupsInterface";
import { StudyGroup } from "@models/studyGroup";
import { StudyGroupSchema } from "@models/studyGroup";
import { schemaSubset } from "@utilities/helpers/model";
import { getSequelizeModelInstance } from "@adapters/helpers/getSequelizeModelInstance";

@injectable()
export class StudyGroupAdapter implements StudyGroupInterface {
  async getStudyGroups(): Promise<StudyGroup[]> {
    const sequelizeStudyGroupInstance = await getSequelizeModelInstance(
      "study_groups"
    );

    const studyGroup = await sequelizeStudyGroupInstance.findAll();
    const studyGroups = studyGroup.map((studyGroup: any) => {
      StudyGroupSchema.validateSync(studyGroup);
      return studyGroup;
    });
    return studyGroups;
  }

  async createStudyGroup(StudyGroup: Partial<StudyGroup>): Promise<void> {
    const StudyGroupSchemaSubset = schemaSubset(
      StudyGroupSchema,
      Object.keys(StudyGroup)
    );

    const sequelizeStudyGroupInstance = await getSequelizeModelInstance(
      "study_groups"
    );

    StudyGroupSchemaSubset.validateSync(StudyGroup);
    await sequelizeStudyGroupInstance.create(StudyGroup);

    return;
  }
}
