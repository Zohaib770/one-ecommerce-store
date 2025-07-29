const mongoose = require('mongoose');
const cartItemSchema = require('./CartItem');
const personalDetailSchema = require('./PersonalDetail');
const shippingAddressSchema = require('./ShippingAddress');
const paymentSchema = require('./Payment');

const orderSchema = new mongoose.Schema({
  cartItems: [cartItemSchema],
  personalDetail: personalDetailSchema,
  shippingAddress: shippingAddressSchema,
  payment: paymentSchema,
  price: Number,
  status: String, // new, processing, shipped, deliverd, cancelled
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
