const promise = require('bluebird');

const initOptions = {
  promiseLib: promise,
};

const pgp = require('pg-promise')(initOptions);

// const config = {
//   host: 'localhost',
//   port: 5432,
//   user: 'postgres',
//   password: '1234',
//   database: 'postgres',
// };

const db = pgp('postgresql://power_user:1234@ec2-18-206-55-17.compute-1.amazonaws.com:5432/postgres');
db.connect()
  .then((obj) => {
    obj.done(); // success, release the connection;
  })
  .catch((error) => {
    console.log('ERROR:', error.message || error);
  });

module.exports = db;
