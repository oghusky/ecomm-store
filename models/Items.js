const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  image: {
    type: String
  },
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Items", ItemSchema);