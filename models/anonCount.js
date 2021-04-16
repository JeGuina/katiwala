const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    id: { type: Number, require: true },
    count: { type: Number }
})

const model = mongoose.model('dataModels', dataSchema);

module.exports = model;