const { Client } = require('pg');
const path = require('path');

const coursesCSV = path.join(__dirname, '/courses.csv');

const client = new Client({
  user: 'postgres',
  password: '1234',
  database: 'postgres',
  port: 5432,
});
const dropDatabase = () => {
  client.query('DROP DATABASE IF EXISTS header_sidebar_service;')
    .then(() => {
      console.log('Database Dropped!');
    })
    .catch(err => console.log(err));
};
const createDatabase = () => {
  client.query('CREATE DATABASE header_sidebar_service;')
    .then(() => {
      console.log('Database Created!');
    })
    .catch(err => console.log(err));
};
const createTables = () => (
  // creates course table
  client.query(`
    CREATE TABLE IF NOT EXISTS course (
      id SERIAL PRIMARY KEY,
      title VARCHAR(200),
      description VARCHAR(255),
      tag VARCHAR(13),
      rating NUMERIC(2, 1),
      count_ratings SERIAL,
      enrollment SERIAL,
      created_by NAME, 
      created_at VARCHAR(7),
      updated_at VARCHAR(7),
      language VARCHAR(17),
      img_url VARCHAR(61),
      list_price VARCHAR(7),
      discount_price VARCHAR(7),
      video_hrs NUMERIC(3,1),
      total_articles SERIAL, 
      total_downloads SERIAL,
      active_coupon VARCHAR(11),
      cc_options VARCHAR(27)
    );`)
    .then(() => {
      console.log('Table Created!');
    })
    .catch(err => console.log(err))
);

const populateCourseData = () => {
  client.query(
    `COPY course(id, title, description, tag, rating, count_ratings, enrollment, created_by, created_at, updated_at, language, img_url, list_price, discount_price, video_hrs, total_articles, total_downloads, active_coupon, cc_options) FROM '${coursesCSV}' DELIMITER ',' CSV HEADER;`,
  )
    .then(() => {
      console.log('Courses correctly copied!');
    })
    .catch(err => console.log(err));
};

client.connect()
  .then(() => console.log('Postgres Connected!'))
  .then(() => {
    dropDatabase();
  })
  .then(() => {
    createDatabase();
  })
  .then(() => {
    createTables();
  })
  .then(() => {
    populateCourseData();
  })
  .catch(err => console.log(err));
  

//module.exports = db;
