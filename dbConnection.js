// Loading and initializing the library:
const pgPromise = require('pg-promise')();
import config from './config.js'

// Preparing the connection details:
const { user, password, host, database, port } = config.db.dev;
const connection = `postgres://${user}:${password}@${host}:${port}/${database}`;

// Creating a new database instance from the connection details:
const db = pgPromise(connection);

// Exporting the database object for shared use:
module.exports = db;
