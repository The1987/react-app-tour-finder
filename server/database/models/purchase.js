const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
  orderNumber: { type: Number, required: false },
  purchaseName: { type: String, required: false },
  purchaseAddress1: { type: String, required: false },
  purchaseAddress2: { type: String, required: false },
  purchaseCity: { type: String, required: false },
  purchaseState: { type: String, required: false },
  purchaseZipcode: { type: String, required: false },
  purchaseTickets: { type: Number, required: false },
  tourAdmission: { type: Number, required: false },
  purchaseEmail: { type: String, required: false },
  purchasePhone: { type: String, required: false },
  checkouttotal: { type: Number, required: false },
  isConfirmed: { type: Boolean, required: false },
  isPurchaseed: { type: Boolean, required: false },
});

const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = Purchase;
