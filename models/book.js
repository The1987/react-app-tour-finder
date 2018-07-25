const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  // selectedFile: { type: FormData},
  // date: { type: Date, default: Date.now }

});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
