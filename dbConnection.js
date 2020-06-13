// Loading and initializing the library:
const pgPromise = require('pg-promise')();

let db;

export default function getDB() {
  if (!db) {
    // Preparing the connection details:
    const {
      DB_USER,
      DB_PASSWORD,
      DB_HOST,
      DB_PORT,
      DB_DATABASE
    } = process.env;

    const connection = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

    db = pgPromise(connection);
  }
  return db;
}
