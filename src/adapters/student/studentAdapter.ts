import { injectable } from "inversify";
import { StudentInterface } from "@interfaces/students/studentInterface";
import { Student } from "@models/student";
import { StudentSchema } from "@models/student";
import { schemaSubset } from "@utilities/helpers/model";
import { getSequelizeModelInstance } from "@adapters/helpers/getSequelizeModelInstance";

@injectable()
export class StudentAdapter implements StudentInterface {
  async getStudents(): Promise<Student[]> {
    const sequelizeStudentInstance = await getSequelizeModelInstance(
      "students"
    );
    const sequelizeStudentStudyGroupInstance = await getSequelizeModelInstance(
      "student_study_groups"
    );
    const sequelizeStudyGroupInstance = await getSequelizeModelInstance(
      "study_groups"
    );

    const student = await sequelizeStudentInstance.findAll({
      include: [
        {
          model: sequelizeStudentStudyGroupInstance,
          as: "student_study_groups",
          required: false,
          attributes: ["studentStudyGroupID"],
          include: [
            {
              model: sequelizeStudyGroupInstance,
            },
          ],
        },
      ],
    });
    const students = student.map((student: any) => {
      StudentSchema.validateSync(student);
      return student;
    });
    return students;
  }

  async createStudent(
    student: Partial<Student>
  ): Promise<Student["studentID"]> {
    const studentSchemaSubset = schemaSubset(
      StudentSchema,
      Object.keys(student)
    );

    const sequelizeStudentInstance = await getSequelizeModelInstance(
      "students"
    );

    studentSchemaSubset.validateSync(student);
    const x = await sequelizeStudentInstance.create(student);
    console.log("XXXXXXX", x.toJSON().studentID);
    return x.toJSON().studentID;
  }

  async updateStudent(
    studentID: Student["studentID"],
    student: Partial<Student>
  ): Promise<void> {
    const studentSchemaSubset = schemaSubset(
      StudentSchema,
      Object.keys(student)
    );

    const sequelizeStudentInstance = await getSequelizeModelInstance(
      "students"
    );

    studentSchemaSubset.validateSync(student);
    await sequelizeStudentInstance.update(student, {
      where: {
        studentID,
      },
    });

    return;
  }
  async deleteStudent(studentID: Student["studentID"]): Promise<void> {
    const sequelizeStudentInstance = await getSequelizeModelInstance(
      "students"
    );
    await sequelizeStudentInstance.destroy({ where: { studentID } });

    return;
  }
}
