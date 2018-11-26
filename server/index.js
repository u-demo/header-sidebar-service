const nr = require('newrelic');
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const db = require('./models/model.js');

const PORT = 3003;
const app = express();
app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}/`);
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// cannot serve static files and data from the same API endpoints
app.use('/courses/:courseId', express.static(path.join(__dirname, '/../public/dist')));

app.get('/courses/:courseId/header', (req, res) => {
  const id = req.params.courseId;
  db.any(`SELECT * FROM course WHERE id=${id}`, [true])
    .then((courseData) => {
      const course = courseData[0];
      console.log('=====================');
      console.log(course);
      console.log('=====================');
      res.json(course);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
