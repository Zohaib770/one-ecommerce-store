const mongoose = require('mongoose');

const connectDB = async (uri) => {
    mongoose.connect(uri)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error("MongoDB connection error:", err));
};

module.exports = connectDB;