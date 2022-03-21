const { Schema, model } = require('mongoose');

const PaymentSchema = new Schema({
  cardNumber: {
    type: String,
    require: true,
  },
  expirationDate: String,
  cvv: String,
  amount: Number,
  date: String,
});

module.exports = model('Payment', PaymentSchema);
