require("dotenv").config();
const promise = require('bluebird');

const initOptions = {
  promiseLib: promise,
};

const pgp = require('pg-promise')(initOptions);

// const config = {
//   host: 'localhost',
//   port: 5432,
//   user: 'postgres',
//   password: 'postgres',
//   database: 'postgres',
// };
// const db = pgp(config);

const db = pgp(process.env.DB_URL);
db.connect()
  .then((obj) => {
    obj.done(); 
  })
  .catch((error) => {
    console.log('ERROR:', error.message || error);
  });

module.exports = db;
