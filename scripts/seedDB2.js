// const mongoose = require("mongoose");
// const db = require("../database/models");
// mongoose.Promise = global.Promise;

// // This file empties the Books collection and inserts the books below

// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://localhost/tourBookerList",
//   {
//     useMongoClient: true
//   }
// );

//   const userSeed = [
//     {
//       username: "andrewmflak",
//       password: "12345"
//     },
//     {
//       username: "KFergRocks",
//       password: "password"
//     }
//   ];
//   db.User
//   .remove({})
//   .then(() => db.User.collection.insertMany(userSeed))
//   .then(data => {
//     console.log(data.insertedIds.length + " records inserted!");
//     process.exit(0);
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });