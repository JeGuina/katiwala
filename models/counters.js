const mongoose = require('mongoose');

const Counter = new mongoose.Schema({
    userID: { type: String, require: true, unique: true },
    count: { type: Number },
    lastUpdated: { type: Number }   

})

const model = mongoose.model('Counter', Counter);

module.exports = model;