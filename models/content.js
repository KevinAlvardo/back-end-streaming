const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: [String], required: true },
    trailerUrl: { type: String, required: true },
    regionAvailability: { type: [String], required: true },
});

module.exports = mongoose.model('Content', contentSchema);