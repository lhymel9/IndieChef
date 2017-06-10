const mongoose = require('mongoose');
const geoSchema = require('./geoSchema');
const crypto = require('crypto');
const item = require('./items')

const Schema = mongoose.Schema;

const VendorSchema = new Schema({
    _creatorId: {
        type: Number,
        required: [true, 'creatorId field is required']
    },
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
    approved: {
        type: Boolean,
        default: false
    },
    items: [{ type: Schema.Types.ObjectId, 
               ref: 'item' }],
    geometry: geoSchema
});

const Vendor = mongoose.model('vendor', VendorSchema);

module.exports = Vendor;