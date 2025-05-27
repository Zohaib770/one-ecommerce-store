const mongoose = require('mongoose');

const PersonalDetailSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phone: { type: String },
    email: { type: String, required: true },
});

module.exports = mongoose.model('PersonalDetail', PersonalDetailSchema);
