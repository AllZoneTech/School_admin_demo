import initializeSequelize from "./initializeSequelize";
const cache = {};
// TODO: Convert sequelize to TS
const secretID = process.env.DB_HOST;
export default async () => {
  if (cache[secretID]) {
    return cache[secretID];
  }

  cache[secretID] = initializeSequelize();

  return cache[secretID];
};

export const trimQuery = (query) => query.replace(/\s+/g, " ");
