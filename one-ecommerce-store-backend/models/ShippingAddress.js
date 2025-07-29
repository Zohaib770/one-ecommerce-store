const mongoose = require('mongoose');

const shippingAddressSchema = new mongoose.Schema({
    streetAndHouseNumber: { type: String, required: true },
    zip: { type: String },
    city: { type: String, required: true },
    comment: { type: String }
});

module.exports = shippingAddressSchema;
