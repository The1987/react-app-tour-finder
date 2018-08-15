const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  tourName: { type: String, required: true },
  tourDescription: { type: String, required: false },
  tourPlace: { type: String, required: false },
  tourAddress1: { type: String, required: true },
  tourAddress2: {type: String, required: false },
  tourCity: {type: String, required: false },
  tourState: {type: String, required: false },
  tourZipcode: {type: String, required: false },
  tourDays: {type: String, required: false },
  tourTimes: {type: String, required: false },
  admissionType: {type: String, required: false },
  tourAdmission: {type: Number, required: false },
  admissionTickets: {type: Number, required: false },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
