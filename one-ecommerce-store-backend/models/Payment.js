const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    method: String, // paypal, credit card
    status: String, //paid, pending, refunded
    transactionId: String,
    date: Date,
});

module.exports = paymentSchema;