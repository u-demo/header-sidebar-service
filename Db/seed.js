//const db = require('index.js');
const { hacker, name } = require('faker');
const path = require('path');
const csv = require('fast-csv');
const fs = require('fs');

const ccOptions = ['English', 'Spanish', 'Mandarin', 'Korean', 'Japanese', 'German', 'Russian', 'French', 'Italian'];
const tagLabel = ['Best Seller', 'Highest Rated', 'Hot & New', 'New', null];
const languages = ['English', 'English, Spanish', 'English, Mandarin', 'English, Korean', 'English, Japanese'];
const descriptionPrefix = [
  'A complete guide for ',
  'An adventure in ',
  'Learn professional ',
  'Master your skills in ',
  'The only course you need to learn ',
  'From beginner to professional in ',
  'Dive in and learn ',
  'Comprehensive programming course for ',
  'Get an in-depth understanding of core skills & advanced in ',
  'Master design principles, best practices and coding conventions for ',
];
const temp = [];

const getRandomNum = max => Math.floor(Math.random() * Math.floor(max));

const getRandomNumInRange = (min, max) => Math.floor(Math.random() * (max - min) + min);

const generateNewCourse = function generateNewCourse(i) {
  const desc = `${descriptionPrefix[getRandomNum(descriptionPrefix.length)]}${hacker.ingverb()} ${hacker.adjective()} ${hacker.abbreviation()}`;
  const enrollmentTotal = getRandomNumInRange(15, 500);
  const ratingsTotal = getRandomNumInRange(10, enrollmentTotal);
  const listPrice = getRandomNumInRange(50, 300);
  const discPrice = Math.floor(listPrice * (getRandomNumInRange(10, 20) * 0.01));
  const yearCreated = getRandomNumInRange(5, 9);
  const monthCreated = getRandomNumInRange(1, 12);
  const yearUpdated = getRandomNumInRange(yearCreated, 9);
  const monthUpdated = getRandomNumInRange(monthCreated, 12);
  // Generate cc_options
  const ccLength = getRandomNum(4);
  const ccSet = new Set();
  for (let j = 0; j < ccLength; j += 1) {
    ccSet.add(ccOptions[getRandomNum(9)]);
  }
  const ccs = Array.from(ccSet).join(', ');
  const newCourse = {
    id: i,
    title: temp[i],
    description: desc,
    tag: tagLabel[getRandomNum(tagLabel.length)],
    rating: Number((Math.random() * (5 - 3.4) + 3.4).toFixed(1)),
    count_ratings: ratingsTotal,
    enrollment: enrollmentTotal,
    created_by: name.findName(),
    created_at: `${monthCreated}/201${yearCreated}`,
    updated_at: `${monthUpdated}/201${yearUpdated}`,
    language: languages[getRandomNum(languages.length)],
    img_url: `https://s3.amazonaws.com/header-sidebar-service/course${getRandomNum(111)}.jpg`,
    list_price: `$${listPrice}.99`,
    discount_price: `$${discPrice}.99`,
    video_hrs: Number((Math.random() * (30 - 12) + 12).toFixed(1)),
    total_articles: getRandomNumInRange(1, 15),
    total_downloads: getRandomNumInRange(3, 15),
    active_coupon: 'WEDEMO',
    cc_options: ccs,
  };
  return newCourse;
};

// Format
const csvStreamCourses = csv.format({ headers: true }).transform(row => ({
  id: row.id,
  title: row.title,
  description: row.description,
  tag: row.tag,
  rating: row.rating,
  count_ratings: row.count_ratings,
  enrollment: row.enrollment,
  created_by: row.created_by,
  created_at: row.created_at,
  updated_at: row.updated_at,
  language: row.language,
  img_url: row.img_url,
  list_price: row.list_price,
  discount_price: row.discount_price,
  video_hrs: row.video_hrs,
  total_articles: row.total_articles,
  total_downloads: row.total_downloads,
  active_coupon: row.active_coupon,
  cc_options: row.cc_options,
}));

const writableStream = fs.createWriteStream('./courses.csv');
csvStreamCourses.pipe(writableStream);
const numData = 10000000;
let i = 0;
function createCourseData(callback) {
  // For each title in temp array,
  // Write other fake datas needed for header and sidebar
  let memoryAllows = true;
  while (i <= numData && memoryAllows) {
    i += 1;
    const newCourse = generateNewCourse(i);
    if (i === numData) {
      csvStreamCourses.write(newCourse, callback);
    } else {
      memoryAllows = csvStreamCourses.write(newCourse);
    }
  }
  if (i < numData && !memoryAllows) {
    writableStream.once('drain', createCourseData);
  } else {
    console.log(`WRITING ${numData} data to CSV DONE!`);
    csvStreamCourses.end();
  }
}

const writeToDB = function writeToDB() {
  console.log('WRITING TO DB!');
};

// Read CSV file with course title build temp array for title
csv
  .fromPath(path.join(__dirname, '/courseData.csv'))
  .on('data', (data) => {
    // console.log(data);
    temp.push(data[1]);
  })
  .on('end', () => {
    createCourseData(writeToDB);
  });
