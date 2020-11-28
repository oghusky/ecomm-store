const mongoose = require('mongoose');

const connectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/ecomm",
      {
        useCreateIndex: true,
        useFindAndModify: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    console.log("DB CONNECTED");
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = connectDB;
