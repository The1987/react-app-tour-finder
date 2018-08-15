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

// purchase seeds for mongo
const purchaseSeed = [
  {
    orderNumber: 001,
    purchaseName: "Chris Simpson",
    purchaseAddress1: "31 MAin Street",
    purchaseAddress2: "Apt 12",
    purchaseCity: "Rockaway",
    purchaseState: "NJ",
    purchaseZipcode: "07866",
    tourName: "Morristown Cycling Tour",
    purchaseTickets: 10,
    tourAdmission: 25,
    purchaseEmail: "mrchrishantis@gmail.com",
    purchasePhone: "5553330908",
    checkouttotal: 250,
    isConfirmed: false,
    isPurchaseed: false,
  },
  {
    orderNumber: 002,
    purchaseName: "Jack Charles",
    purchaseAddress1: "70 Sip Ave",
    purchaseAddress2: "",
    purchaseCity: "Jersey City",
    purchaseState: "NJ",
    purchaseZipcode: "07306",
    tourName: "Morristown Cycling Tour",
    tourAdmission: 4,
    tourAdmission: 10,
    purchaseEmail: "developer.act@gmail.com",
    purchasePhone: "5551114345",
    checkouttotal: 40,
    isConfirmed: false,
    isPurchaseed: false,
  }
];
db.Purchase
  .remove({})
  .then(() => db.Purchase.collection.insertMany(purchaseSeed))
  .then(data => {
    console.log(data.insertedIds.length + " Purchased records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });