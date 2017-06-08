const mongoose = require('mongoose');
const geoSchema = require('./geoSchema');
const crypto = require('crypto');

const Schema = mongoose.Schema;

//create names schema and model
const VendorSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email field is required']
    },
    password: {
        type: String,
        required: [true, 'Password field is required']
    },
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    rating: {
        type: String
    },
    foodTypes: {
        type: [String],
        required: [true, 'Food types field required']
    },
    phone: {
        type: String
    },
    lat: {
        type: String
    },
    lon: {
        type: String
    },
    approved: {
        type: Boolean,
        default: false
    },
    geometry: geoSchema
});

const Vendor = mongoose.model('vendor', VendorSchema);

module.exports = Vendor;