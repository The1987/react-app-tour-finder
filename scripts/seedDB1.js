const mongoose = require("mongoose");
const db = require("../server/database/models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/tourBookerList",
  {
    useMongoClient: true
  }
);

const bookSeed = [
  {
  tourName: "Morristown Cycling Tour",
  tourDescription: "Enjoy historic Morristown, like they enjoyed in the Revlution.",
  tourPlace: "Morristown Train Station",
  tourAddress1: "73 E Hanover Ave",
  tourAddress2: "",
  tourCity: "Morristown",
  tourState: "NJ",
  tourZipcode: "07960",
  tourDays: "Mon - Thu",
  tourTimes: "9AM - 7PM",
  admissionType: "Adult",
  admissionPrice: 25,
  admissionTickets: 100,
  // date: new Date(Date.now())
  }
];
db.Book
  .remove({})
  .then(() => db.Book.collection.insertMany(bookSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });