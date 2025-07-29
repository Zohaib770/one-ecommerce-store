const mongoose = require('mongoose');

const personalDetailSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phone: { type: String },
    email: { type: String, required: true },
});

module.exports = personalDetailSchema;
