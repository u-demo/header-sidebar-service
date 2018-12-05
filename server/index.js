const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const Redis = require('ioredis');
const db = require('./models/model.js');

const PORT = 3003;
const app = express();
const redis = new Redis(process.env.REDIS_PORT, process.env.REDIS_HOST);
app.use(morgan('dev'));

app.listen(PORT, () => {
  console.log(`listening on PORT:${PORT}/`);
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// cannot serve static files and data from the same API endpoints
app.use('/courses/:courseId', express.static(path.join(__dirname, '/../public/dist')));


async function getCourse(req, res) {
  const id = req.params.courseId;
  const cachedResult = await redis.get(id);
  if (cachedResult) {
    const obj = JSON.parse(cachedResult);
    return res.status(200).send(obj);
  }
  db.any(`SELECT * FROM course WHERE id=${id}`, [true])
    .then((courseData) => {
      const course = courseData[0];
      redis.set(course.id, JSON.stringify(course));
      res.json(course);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

app.get('/courses/:courseId/header', (req, res) => {
  getCourse(req, res);
});

// app.get('/loaderio-d100739a94a0f950cc17ff4a9adb0575', (req, res) => {
//   res.send('loaderio-d100739a94a0f950cc17ff4a9adb0575');
// });