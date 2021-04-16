const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true },
    username: { type: String, require: true },
    serverID: { type: String, require: true },
    kcoins: { type: Number, default: 100 },
    daily: { type: Number }
})

const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model;