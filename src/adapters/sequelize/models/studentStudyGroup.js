import Sequelize from "sequelize";

export default (sequelize) => {
  const options = {
    timestamps: false,
    tableName: "student_study_groups",
  };

  const definition = {
    ["studentStudyGroupID"]: {
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ["studentID"]: {
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER,
    },
    ["groupID"]: {
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER,
    },
  };
  const studentStudyGroup = sequelize.define(
    "student_study_groups",
    definition,
    options
  );

  return studentStudyGroup;
};
