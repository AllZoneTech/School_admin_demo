import * as yup from "yup";
import { OptionalObjectSchema, TypeOfShape } from "yup/lib/object";
import { AnyObject, Maybe } from "yup/lib/types";

type YupSchemaDefinition<TSchema> = TSchema extends OptionalObjectSchema<
  infer TSchemaDefinition
>
  ? TSchemaDefinition
  : TSchema extends OptionalObjectSchema<
      infer TSchemaDefinition,
      AnyObject,
      Maybe<TypeOfShape<infer TSchemaDefinition>>
    >
  ? TSchemaDefinition
  : never;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function schemaSubset<
  TSchema,
  TSchemaDefinition extends YupSchemaDefinition<TSchema>,
  TField extends keyof TSchemaDefinition,
  TFieldList extends TField[],
  TSubsetSchema extends OptionalObjectSchema<
    Pick<TSchemaDefinition, TFieldList[number]>
  >
>(schema: TSchema, propertyPaths: TFieldList | string[]): TSubsetSchema {
  const schemaShape = propertyPaths
    .map((path) => {
      const key = path.toString();
      return [key, yup.reach(schema, key)];
    })
    .reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value,
      }),
      {}
    );

  return yup.object(schemaShape) as TSubsetSchema;
}

type ModelMap<TModel> = Record<string, keyof TModel>;
type MappedModel<TModel, TModelMap extends ModelMap<TModel>> = {
  [TKey in keyof TModelMap]: TModelMap[TKey];
};

type MappingFunction<TModel> = (
  model: TModel
) => MappedModel<TModel, ModelMap<TModel>>;
type InverseMappingFunction<TModel> = (
  mappedModel: MappedModel<TModel, ModelMap<TModel>>
) => TModel;

export function generateMappingFunctionsForModel<TModel>(
  mapping: ModelMap<TModel>
): [MappingFunction<TModel>, InverseMappingFunction<TModel>] {
  const modelToMappedModel = Object.fromEntries(
    Object.entries(mapping).map(([key, value]) => [value, key])
  );
  return [
    (model: TModel) =>
      Object.fromEntries(
        Object.entries(model).map(([key, value]) => {
          const mappedKey = modelToMappedModel[key];

          return [mappedKey, value];
        })
      ),
    (mappedModel: MappedModel<TModel, typeof mapping>) =>
      Object.fromEntries(
        Object.entries(mappedModel).map(([mappedKey, value]) => {
          const originalKey = mapping[mappedKey];

          return [originalKey, value];
        })
      ),
  ];
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const enumProperty = <T>(
  enumObject: { [s: string]: T } | ArrayLike<T>
) => yup.mixed<T>().oneOf([null, ...Object.values(enumObject)]);
