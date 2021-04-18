const mongoose = require('mongoose');

const Economy = new mongoose.Schema({
    userID: { type: String, require: true, unique: true },
    username: { type: String, require: true },
    serverID: { type: String, require: true },
    kcoins: { type: Number, default: 1000 },
    ktokens: { type: Number, default: 0 },
    lastDaily: { type: Number },
    dailycount: { type: Number },
    diamonds: { type: Number },
    steals: { type: Number },
    blocks: { type: Number },
    trophies: { type: Number }
})

const model = mongoose.model('Economy', Economy);

module.exports = model;