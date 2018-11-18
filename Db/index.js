const { Client } = require('pg');

const seeds = require('./seed.js');

const client = new Client({
  user: 'postgres',
  password: '1234',
  database: 'postgres',
  port: 5432,
});

client.connect()
  .then(() => console.log('Postgres Connected!'))
  .catch(error => console.log(error));
  

const createTables = () => (
  // creates course table
  client.query(`
    CREATE TABLE course (
    id INTEGER NOT NULL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description VARCHAR(255),
    tag VARCHAR(13),
    rating NUMERIC(1, 1) DEFAULT 0.0,
    count_ratings SERIAL DEFAULT 0,
    enrollment SERIAL DEFAULT 0,
    created_by NAME, 
    created_at VARCHAR(7) DEFAULT NOW(),
    last_updated_at VARCHAR(7) DEFAULT NOW(),
    language VARCHAR(17),
    img_url
    list_price VARCHAR() DEFAULT FREE
    discount_price VARCHAR() DEFAULT FREE
    video_hrs NUMERIC(3,1) DEFAULT 0.0,
    articles SERIAL(3) DEFAULT 0, 
    count_downloads SERIAL DEFAULT 0,
    active_coupon VARCHAR(11)
    cc []
  )`)
    .then(() => {
      console.log('Table Created!');
    })
);

const populateCourseData = () => {
  const { courseSeeds } = seeds;
  const queryStr = 'INSERT INTO Course SET ?';
  const promises = courseSeeds.map(seed => client.queryAsync(queryStr, seed));
  return Promise.all(promises);
};


// client.query('DROP DATABASE IF EXISTS headerSidebar')
//   .then(() => client.queryAsync('CREATE DATABASE IF NOT EXISTS headerSidebar'))
//   .then(() => console.log(`Connected to CheckoutData database as ID ${client.threadId}`))
//   .then(() => client.queryAsync('USE headerSidebar'))
//   .then(() => createTables(client))
//   .then(() => populateCourseData())
//   .then(() => populateCCData())
//   .then(() => populateCourseCCData())
//   .then(() => client.end())
//   .then(() => process.exit())
//   .catch((err) => {
//     throw new Error(err);
//   });

module.exports = db;
