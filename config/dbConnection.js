const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('mongoDB is connected sucka!!.........');
  } catch (error) {
    console.log(error.message);
    //exits function if there is an error
    process.exit(1);
  }
};

module.exports = connectDB;
