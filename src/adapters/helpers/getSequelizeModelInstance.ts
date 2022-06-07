import { Model, Sequelize } from "sequelize";
import type { ModelCtor } from "sequelize";
import getSequelizeContext from "@adapters/sequelize";

export async function getSequelizeModelInstance(
  modelName: string
): Promise<ModelCtor<Model>> {
  const { sequelize }: { sequelize: Sequelize } = await getSequelizeContext();
  const model = sequelize.models[`${modelName}`];
  if (!model) {
    throw new Error(`Could not find sequelize model for ${modelName}`);
  }
  return model;
}
