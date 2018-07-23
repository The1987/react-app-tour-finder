const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist",
  {
    useMongoClient: true
  }
);

// let users = [
//     {
//     username: "cat",
//     password: "123",
//     },
//   ];

const bookSeed = [
  {
      name: "Small Group Central Park Bike Tour",
      address: "Near Central Park",
      price: 20,
      description:'You’ll cover much more of Central Park’s 843 acres of meadows, woods and ponds on a bike than you ever could on foot. Meet up with the guide from Central Park Tours Inc. to pick out your wheels for the day, then set off from the south end of the park. You’ll spy iconic landmarks, plus a few lesser-known gems. And since the tour is always capped at just eight people, you’ll have plenty of opportunities to ask questions along the way.',
    },
    {
      name: "Small Group Walking Tour of New York City Architecture",
      address: "Tudor City at 2nd Avenue",
      price: 35,
      description: 'Times Square, the Chrysler Building, Grand Central Terminal, the New York Public Library, Tudor City: all these world-famous architectural landmarks share space on Manhattans 42nd Street. On this three-hour tour of Midtown, you’ll wander the much-storied thoroughfare with a local expert. Take in the sites and spot examples of Art Deco, Beaux Arts and International Style architecture and learn how each style ties into the city’s history.'
    },
    {
      name: "Boroughs of the Dead: Macabre New York City Walking Tour",
      address: "131 East 10th Street, New York, NY",
      price: 45,
      description: 'Boroughs of the Dead is a boutique tour company devoted to strange, dark and unusual walking tours of New York City. Our unique tours are meticulously written and researched one-of-a-kind creations led by expert guides. We are a locally-owned, independently operated business.'
    },
  //   name: "The Dead Zone",
  //   address: "Stephen King",
  //   price: 199,
  //   description:
  //     'A number-one national best seller about a man who wakes up from a five-year coma able to see people\'s futures and the terrible fate awaiting mankind in The Dead Zone - a "compulsive page-turner" (The Atlanta Journal-Constitution). Johnny Smith awakens from a five-year coma after his car accident and discovers that he can see people\'s futures and pasts when he touches them. Many consider his talent a gift; Johnny feels cursed. His fiancée married another man during his coma, and people clamor for him to solve their problems. When Johnny has a disturbing vision after he shakes the hand of an ambitious and amoral politician, he must decide if he should take drastic action to change the future. The Dead Zone is a "faultlessly paced...continuously engrossing" (Los Angeles Times) novel of second sight.',
  //   date: new Date(Date.now())
  // },
  // {
  //   name: "Lord of the Flies",
  //   address: "William Golding",
  //   price: 35,
  //   description:
  //     "The tale of a party of shipwrecked schoolboys, marooned on a coral island, who at first enjoy the freedom of the situation but soon divide into fearsome gangs which turn the paradise island into a nightmare of panic and death.",
  //   date: new Date(Date.now())
  // },
  // {
  //   name: "The Catcher in the Rye",
  //   address: "J.D. Salinger",
  //   price: 90,
  //   description:
  //     "The Catcher in the Rye is a 1951 novel by J. D. Salinger. A controversial novel originally published for adults, it has since become popular with adolescent readers for its themes of teenage angst and alienation. It has been translated into almost all of the world's major languages. Around 1 million copies are sold each year with total sales of more than 65 million books. The novel's protagonist Holden Caulfield has become an icon for teenage rebellion. The novel also deals with complex issues of innocence, identity, belonging, loss, and connection.",
  //   date: new Date(Date.now())
  // },
  // {
  //   name: "The Punch Escrow",
  //   address: "Tal M. Klein",
  //   price: 140,
  //   description:
  //     "It's the year 2147. Advancements in nanotechnology have enabled us to control aging. We’ve genetically engineered mosquitoes to feast on carbon fumes instead of blood, ending air pollution. And teleportation has become the ideal mode of transportation, offered exclusively by International Transport―the world’s most powerful corporation, in a world controlled by corporations. Joel Byram spends his days training artificial-intelligence engines to act more human and trying to salvage his deteriorating marriage. He’s pretty much an everyday twenty-second century guy with everyday problems―until he’s accidentally duplicated while teleporting. Now Joel must outsmart the shadowy organization that controls teleportation, outrun the religious sect out to destroy it, and find a way to get back to the woman he loves in a world that now has two of him.",
  //   date: new Date(Date.now())
  // },
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
