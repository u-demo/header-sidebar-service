//const db = require('.index.js');
const faker = require('faker');
const path = require('path');
const csv  = require('fast-csv');
const fs = require('fs');

const ccOptions = ['English', 'Spanish', 'Mandarin', 'Korean', 'Japanese', 'German', 'Russian', 'French', 'Italian'];
const tagLabel = ['Best Seller', 'Highest Rated', 'Hot & New', 'New', null];
const languages = ['English', 'English, Spanish', 'English, Mandarin', 'English, Korean', 'English, Japanese'];
const descriptionPrefix =[
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
]
let temp = [];

const getRandomNum = max => Math.floor(Math.random() * Math.floor(max));

const getRandomNumInRange = (min, max) => Math.floor(Math.random() * (max - min) + min);


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
  last_updated_at: row.last_updated_at,
  language: row.language,
  img_url: row.img_url,
  list_price: row.list_price,
  discount_price: row.discount_price,
  video_hrs: row.video_hrs,
  total_articles: row.total_articles,
  total_downloads: row.total_downloads,
  active_coupon: row.active_coupon,
  ccOptions: row.ccOptions,
}));

const writableStream = fs.createWriteStream('./courses.csv');
csvStreamCourses.pipe(writableStream);


function createCourseData() {
  // For each title in temp array,
  // Write other fake datas needed for header and sidebar
  for (let i = 0; i < 5; i += 1) {
    const desc = descriptionPrefix[Math.floor(Math.random() * descriptionPrefix.length)] + faker.hacker.noun;
    const enrollmentTotal = getRandomNumInRange(15, 105);
    const ratingsTotal = getRandomNumInRange(10, enrollmentTotal);
    const randomIdx = getRandomNum(tagLabel.length);
    const listPrice = getRandomNumInRange(50, 300);
    const discPrice = Math.floor(listPrice * (getRandomNumInRange(10, 20) * 0.01));
    let newCourse = {
      id: i + 1,
      title: temp[i],
      description: desc,
      tag: tagLabel[Math.floor(Math.random() * 5)],
      rating: Number((Math.random() * (5 - 3.4) + 3.4).toFixed(1)),
      count_ratings: ratingsTotal,
      enrollment: enrollmentTotal,
      created_by: faker.name.findName(),
      created_at: Date.now(),
      last_updated_at: `${getRandomNumInRange(1, 29)}/201${getRandomNumInRange(5, 9)}`,
      language: languages[randomIdx],
      img_url: 'https://randomuser.me/api/portraits/',
      list_price: listPrice,
      discount_price: `$${discPrice}.99`,
      video_hrs: Number((Math.random() * (30 - 12) + 12).toFixed(1)),
      total_articles: getRandomNumInRange(1, 15),
      total_downloads: getRandomNumInRange(3, 15),
      active_coupon: 'ILOVEUDEMO',
      ccOptions: ccOptions[getRandomNum(9)],
    };
    csvStreamCourses.write(newCourse);
  }
  csvStreamCourses.end();
}

// Read CSV file with course title build temp array for title
csv
  .fromPath(path.join(__dirname, '/courseData.csv'))
  .on('data', (data) => {
    // console.log(data);
    temp.push(data[1]);
  })
  .on('end', () => {
    createCourseData();
  });

  // .on(() => {
    
  //   //if(error) console.log(error);
  //   for(let i = 1; i < 6; i+=1){
  //     csvStream.write(temp[i]+', '+i);
  //   }
  //   csvStream.end();
  



// For each line of data in new CSV file,
  // make query to insert row


// client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
//   console.log(err ? err.stack : res.rows[0].message) // Hello World!
//   client.end();
//   });

