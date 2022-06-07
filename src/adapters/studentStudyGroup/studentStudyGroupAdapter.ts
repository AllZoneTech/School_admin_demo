import { injectable } from "inversify";
import { StudentStudyGroupInterface } from "@interfaces/studentStudyGroup/studentStudyGroupInterface";
import type { StudentStudyGroup } from "@models/studentStudyGroup";
import type { Student } from "@models/student";
import type { Transaction } from "sequelize/types";
import { StudentStudyGroupSchema } from "@models/studentStudyGroup";
import { StudentSchema } from "@models/student";
import { schemaSubset } from "@utilities/helpers/model";
import { getSequelizeModelInstance } from "@adapters/helpers/getSequelizeModelInstance";
import { Op } from "sequelize";
import { Sequelize } from "sequelize";
import getSequelizeContext from "@adapters/sequelize/index";
import sendMail from "@adapters/helpers/sendEmail";

@injectable()
export class StudentStudyGroupAdapter implements StudentStudyGroupInterface {
  async getStudentsByStudyGroupID(studyGroupID: number): Promise<Student[]> {
    const sequelizeStudentInstance = await getSequelizeModelInstance(
      "students"
    );
    const sequelizeStudentStudyGroupInstance = await getSequelizeModelInstance(
      "student_study_groups"
    );

    const student = await sequelizeStudentStudyGroupInstance.findAll({
      include: [
        {
          model: sequelizeStudentInstance,
          required: false,
        },
      ],
      where: { groupID: studyGroupID },
    });
    const students = student.map((student: any) => {
      StudentSchema.validateSync(student);
      return student;
    });
    return students;
  }

  async createStudentStudyGroup(
    studentID: StudentStudyGroup["studentID"],
    groupIDs: Array<StudentStudyGroup["groupID"]>
  ): Promise<void> {
    const { sequelize }: { sequelize: Sequelize } = await getSequelizeContext();

    const sequelizeStudentStudyInstance = await getSequelizeModelInstance(
      "student_study_groups"
    );

    const sequelizeStudyGroupInstance = await getSequelizeModelInstance(
      "study_groups"
    );

    const sequelizeStudentInstance = await getSequelizeModelInstance(
      "students"
    );

    await sequelize.transaction(async (transaction: Transaction) => {
      const groups = await sequelizeStudentStudyInstance.findAll({
        attributes: ["groupID"],
        where: { studentID },
        transaction,
      });

      const previousGroupIDs = groups.map((previousGroupID: any) => {
        return previousGroupID.groupID;
      });

      await sequelizeStudentStudyInstance.destroy({
        where: { studentID },
        transaction,
      });
      await sequelizeStudyGroupInstance.decrement("noOfStudents", {
        by: 1,
        where: {
          groupID: previousGroupIDs,
        },
      });

      const newRecords = groupIDs.map((groupID) => {
        const param = { groupID, studentID };
        const studentStudyGroupSchemaSubset = schemaSubset(
          StudentStudyGroupSchema,
          Object.keys(param)
        );
        studentStudyGroupSchemaSubset.validateSync(param);

        return param;
      });

      await sequelizeStudentStudyInstance.bulkCreate(newRecords, {
        transaction,
      });

      await sequelizeStudyGroupInstance.increment("noOfStudents", {
        by: 1,
        where: {
          groupID: {
            [Op.in]: groupIDs,
          },
        },
        transaction,
      });
    });

    const groupNames = await sequelizeStudyGroupInstance.findAll({
      attributes: ["name"],
      where: {
        groupID: {
          [Op.in]: groupIDs,
        },
      },
    });

    const userEmail = await sequelizeStudentInstance.findOne({
      attributes: ["email"],
      where: {
        studentID,
      },
    });

    const groupNamesArr = groupNames.map((groupName: any) => {
      return groupName.name;
    });

    await sendMail(userEmail?.toJSON().email, groupNamesArr.join(","));

    return;
  }

  async deleteStudentStudyGroup(
    studentStudyGroup: Partial<StudentStudyGroup>
  ): Promise<void> {
    const { studentID, groupID } = studentStudyGroup;

    const studentStudyGroupSchemaSubset = schemaSubset(
      StudentStudyGroupSchema,
      Object.keys(studentStudyGroup)
    );

    const sequelizeStudentStudyInstance = await getSequelizeModelInstance(
      "student_study_groups"
    );

    const sequelizeStudyGroupInstance = await getSequelizeModelInstance(
      "study_groups"
    );

    studentStudyGroupSchemaSubset.validateSync(studentStudyGroup);
    await sequelizeStudentStudyInstance.destroy({
      where: { groupID, studentID },
    });

    await sequelizeStudyGroupInstance.decrement("noOfStudents", {
      by: 1,
      where: {
        groupID,
      },
    });

    return;
  }
}
