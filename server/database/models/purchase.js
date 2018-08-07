const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
  user: {type: String, required: false },
  name: {type: String, required: true },
  address: { type: String, required: true },
  price: {type: Number, required: true},
  qty: {type: Number, required: false},
  checkouttotal: {type: Number, required: false},
  isConfirmed: {type: Boolean, required: false},
  isPurchased: {type: Boolean, required: false},
});

const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = Purchase;
