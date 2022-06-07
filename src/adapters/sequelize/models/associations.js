export default (models) => {
  console.log("vals", models);
  models.students.hasMany(models.student_study_groups, {
    as: "student_study_groups",
    foreignKey: "studentID",
  });

  models.student_study_groups.belongsTo(models.students, {
    targetKey: "studentID",
    foreignKey: "studentID",
  });

  models.student_study_groups.belongsTo(models.study_groups, {
    targetKey: "groupID",
    foreignKey: "groupID",
  });
};
