const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const geoSchema = new Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    },
});

module.exports = geoSchema