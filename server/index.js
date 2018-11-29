const nr = require('newrelic');
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const db = require('./models/model.js');

const PORT = 3003;
const app = express();
app.listen(PORT, () => {
  console.log(`listening on PORT:${PORT}/`);
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// cannot serve static files and data from the same API endpoints
app.use('/courses/:courseId', express.static(path.join(__dirname, '/../public/dist')));
app.use('/loaderio-769cc825dca07328f5eadbf6d5c06ea3', express.static(path.join(__dirname, '/../public/dist/loaderio-4a786d9500ed513a377f938f4e81be12.txt')));
app.get('/courses/:courseId/header', (req, res) => {
  const id = req.params.courseId;
  db.any(`SELECT * FROM course WHERE id=${id}`, [true])
    .then((courseData) => {
      const course = courseData[0];
      res.json(course);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get('/loaderio-d100739a94a0f950cc17ff4a9adb0575', (req, res) => {
  res.send('loaderio-d100739a94a0f950cc17ff4a9adb0575');
});

