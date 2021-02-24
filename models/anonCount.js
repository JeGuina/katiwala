const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    anonCount: Number,
})

module.exports = mongoose.model("Anon", dataSchema);