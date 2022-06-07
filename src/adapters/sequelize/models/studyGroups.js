import Sequelize from "sequelize";

export default (sequelize) => {
  const options = {
    timestamps: false,
    tableName: "study_groups",
  };

  const definition = {
    ["groupID"]: {
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ["name"]: {
      allowNull: false,
      type: Sequelize.DataTypes.STRING(500),
    },
    ["leaderOfGroup"]: {
      allowNull: true,
      type: Sequelize.DataTypes.STRING(400),
    },
    ["subject"]: {
      allowNull: true,
      type: Sequelize.DataTypes.STRING(20),
    },
    ["timeOfStudy"]: {
      allowNull: true,
      type: Sequelize.DataTypes.DATE,
    },
    ["noOfStudents"]: {
      allowNull: true,
      type: Sequelize.DataTypes.INTEGER,
      default: 0,
    },
  };
  const studyGroup = sequelize.define("study_groups", definition, options);

  return studyGroup;
};
