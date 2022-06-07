import Sequelize from "sequelize";
import { MSSQL_DATE } from "../customSequelizeDataTypes";

export default (sequelize) => {
  const options = {
    timestamps: true,
    tableName: "students",
    createdAt: "studentAddDate",
    updatedAt: "studentChangeDate",
  };

  const definition = {
    ["studentID"]: {
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ["name"]: {
      allowNull: false,
      type: Sequelize.DataTypes.STRING(500),
    },
    ["email"]: {
      allowNull: true,
      type: Sequelize.DataTypes.STRING(400),
    },
    ["sex"]: {
      allowNull: true,
      type: Sequelize.DataTypes.STRING(10),
    },
    ["dateOfBirth"]: {
      allowNull: true,
      type: Sequelize.DataTypes.DATE,
    },
    ["placeOfBirth"]: {
      allowNull: true,
      type: Sequelize.DataTypes.STRING(10),
    },
    ["studentAddDate"]: {
      allowNull: true,
      type: MSSQL_DATE,
    },
    ["studentChangeDate"]: {
      allowNull: true,
      type: MSSQL_DATE,
    },
  };
  const student = sequelize.define("students", definition, options);

  //await student.sync({ force: false, alter: true });

  return student;
};
