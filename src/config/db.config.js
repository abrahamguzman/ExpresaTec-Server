const HOST = process.env.DB_HOST;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const DB = process.env.DB_NAME;
const dialect = "mysql";

module.exports = {
  HOST,
  USER,
  PASSWORD,
  DB,
  dialect,
};