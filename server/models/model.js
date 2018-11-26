const promise = require('bluebird');

const initOptions = {
  promiseLib: promise,
};

const pgp = require('pg-promise')(initOptions);

const config = {
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '1234',
  database: 'postgres',
};
const db = pgp(config);

module.exports = db;
