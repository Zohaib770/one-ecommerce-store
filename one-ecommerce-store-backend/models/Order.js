const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  cartItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CartItem',
      required: true
    }
  ],
  personalDetail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PersonalDetail',
    required: true
  },
  shippingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShippingAddress',
    required: true
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment',
    required: true
  },
  price: Number,
  status: String, // new, processing, shipped, deliverd, cancelled
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
