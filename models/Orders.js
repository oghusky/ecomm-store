const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({});

module.exports = mongoose.model("Orders", OrderSchema);