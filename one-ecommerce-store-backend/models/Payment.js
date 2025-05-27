const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    method: String, // paypal, credit card
    status: String, //paid, pending, refunded
    transactionId: String,
    date: Date,
});

module.exports = mongoose.model('Payment', PaymentSchema);