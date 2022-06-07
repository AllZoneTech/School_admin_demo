import Sequelize from "sequelize";
import modelsInitializer from "./models";
import associations from "./models/associations";
import db from "./db/config";
import * as tedious from "tedious";

export default async function initializeSequelize() {
  const sequelize = new Sequelize(db.DBNAME, db.USER, db.PASSWORD, {
    host: db.HOST,
    dialect: db.dialect,
    // operatorsAliases: false,
    port: db.port,

    ...db.pool,
  });

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  console.info("INITIALIZING MODELS");
  const models = modelsInitializer(sequelize);
  console.info("CREATING ASSOCIATIONS");
  const modelAssociations = associations(models);

  return {
    sequelize,
    models,
    modelAssociations,
  };
}
