const mongoose = require('mongoose');

const shippingAddressSchema = new mongoose.Schema({
    streetAndHouseNumber: { type: String, required: true },
    zip: { type: String },
    city: { type: String, required: true },
    comment: { type: String },
    country: { type: String }
});

module.exports = mongoose.model('ShippingAddress', shippingAddressSchema, 'shipping_address');
