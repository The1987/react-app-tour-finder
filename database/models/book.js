const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String},
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
