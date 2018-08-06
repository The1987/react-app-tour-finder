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
    name: "Andrew Hatfield's Food Tour Of Jersey City",
    address: "70 Sip Ave, Jersey City, NJ 07306",
    price: 10,
    qty: 20,
    date: "11/12/18",
    time: 10,
    description: 'A delightfully educational and delicious tour of Jersey Citys journal square food establishments.',
    // date: new Date(Date.now())
  },
  {
    name: "Small Group Central Park Bike Tour",
    address: "Near Central Park",
    price: 20,
    qty: 50,
    date: "11/15/18",
    time: 8,
    description: 'You’ll cover much more of Central Park’s 843 acres of meadows, woods and ponds on a bike than you ever could on foot. Meet up with the guide from Central Park Tours Inc. to pick out your wheels for the day, then set off from the south end of the park. You’ll spy iconic landmarks, plus a few lesser-known gems. And since the tour is always capped at just eight people, you’ll have plenty of opportunities to ask questions along the way.',
    // date: new Date(Date.now())
  },
  {
    name: "Small Group Walking Tour of New York City Architecture",
    address: "Tudor City at 2nd Avenue",
    price: 35,
    qty: 10,
    date: "09/20/18",
    time: 5,
    description: 'Times Square, the Chrysler Building, Grand Central Terminal, the New York Public Library, Tudor City: all these world-famous architectural landmarks share space on Manhattans 42nd Street. On this three-hour tour of Midtown, you’ll wander the much-storied thoroughfare with a local expert. Take in the sites and spot examples of Art Deco, Beaux Arts and International Style architecture and learn how each style ties into the city’s history.',
    // date: new Date(Date.now())
  },
  {
    name: "Boroughs of the Dead: Macabre New York City Walking Tour",
    address: "131 East 10th Street, New York, NY",
    price: 45,
    qty: 100,
    date: "01/01/19",
    time: 6,
    description: 'Boroughs of the Dead is a boutique tour company devoted to strange, dark and unusual walking tours of New York City. Our unique tours are meticulously written and researched one-of-a-kind creations led by expert guides. We are a locally-owned, independently operated business.',
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