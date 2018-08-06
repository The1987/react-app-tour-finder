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
    user: "AndrewMFlak",
    name: "Andrew Hatfield's Food Tour Of Jersey City",
    address: "70 Sip Ave, Jersey City, NJ 07306",
    price: 10,
    quantity: 15,
    isConfirmed: false,
    isPurchaseed: false
  },
  {
    user: "KFergRocks",
    name: "Andrew Hatfield's Food Tour Of Jersey City",
    address: "70 Sip Ave, Jersey City, NJ 07306",
    price: 10,
    quantity: 1,
    isConfirmed: false,
    isPurchaseed: false
  }
];
db.Purchase
  .remove({})
  .then(() => db.Purchase.collection.insertMany(purchaseSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

  // const userSeed = [
  //   {
  //     username: "andrewmflak",
  //     password: "12345"
  //   },
  //   {
  //     username: "TheDonaldTrump",
  //     password: "GoldenShowers"
  //   }
  // ];