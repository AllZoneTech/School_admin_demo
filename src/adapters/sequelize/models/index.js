import students from "./students";
import study_groups from "./studyGroups";
import student_study_groups from "./studentStudyGroup";

export default (sequelize) => ({
  students: students(sequelize),
  student_study_groups: student_study_groups(sequelize),
  study_groups: study_groups(sequelize),
});
