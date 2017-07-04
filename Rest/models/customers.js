const mongoose = require('mongoose');
const geoSchema = require('./geoSchema');
const crypto = require('crypto');

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
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
    address: {
        type: String,
        required: [true, 'Address field required']
    },
    geometry: geoSchema
});

const Customer = mongoose.model('customer', CustomerSchema);

module.exports = Customer;