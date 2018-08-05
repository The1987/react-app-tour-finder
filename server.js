
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const booksController = require("./controllers/booksController")
const app = express();
const PORT = process.env.PORT || 3001;
const dbConnection = require('./database') 
 
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(booksController);

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/tourBookerList",
  {
    useMongoClient: true
  }
);

// PassPort
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('./passport');
// const app = express()
// const PORT = 8080

// Route requires
const user = require('./routes/user')

// MIDDLEWARE
app.use(morgan('dev'))

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));

// Sessions
app.use(
	session({
		secret: "VANHALEN",
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false, //required
		saveUninitialized: false //required
	})
)

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser


// Routes
require('./routes/user')(app)
app.use('/user/operator', user)

// Starting Server 
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})

// Start the API server
// app.listen(PORT, function() {
//   console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
// });
