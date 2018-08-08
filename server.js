const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const booksController = require("./controllers/booksController")
const app = express();
const PORT = process.env.PORT || 3001;

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(booksController);

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist",
//   {
//     useMongoClient: true
//   }
// );
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);
var MONGODB_URI = "mongodb://ACTdevelopers:Fullstack123!@ds013414.mlab.com:13414/heroku_rxjqcz5m" || "mongodb://localhost/reactreadinglist";

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});