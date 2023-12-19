const HOST = process.env.DB_HOST;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const DB = process.env.DB_NAME;
const dialect = "mysql";
const pool = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000,
};

module.exports = {
  HOST,
  USER,
  PASSWORD,
  DB,
  dialect,
  pool,
};