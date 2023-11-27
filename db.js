const mongoose = require("mongoose");
require('dotenv').config();

// const mongoURI = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
// const mongoURI = "mongodb://127.0.0.1:27017/FlameGrill";

const mongoURI = `mongodb+srv://mhdeveloper:${process.env.MONGODB_PASSWORD}@flamegrill.doqwcgk.mongodb.net/FlameGrill?retryWrites=true&w=majority`;

const connectToMongo = async () => {
  await mongoose.connect(mongoURI);
};

module.exports = connectToMongo;
