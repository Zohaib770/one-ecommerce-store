require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./route/api');
const connectDB = require('./config/db.js')

const app = express();
app.use(cors());
app.use(express.json());

// constant
const PORT = process.env.BACKEND_PORT;
const MONGODB_URI = process.env.MONGODB_URI;

// Database connection
connectDB(MONGODB_URI);

// Routes
app.use('/', routes);

// Server starts
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));

