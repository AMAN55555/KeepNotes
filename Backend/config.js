require('dotenv').config();

const url=process.env.url;

const mongoose = require('mongoose');
mongoose.connect(url);