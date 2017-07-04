const mongoose = require('mongoose');
const vendor = require('./vendors');
const item = require('./items');

const Schema = mongoose.Schema;

const SaleSchema = new Schema({
    _creator: {
        type: Number,
        ref: 'vendor',
        required: [true, 'Creator field is required']
    },
    _item: { 
        type: String, 
        ref: 'item',
        required: [true, 'Item field is required']
    },
    customer: {
        type: String,
        required: [true, 'Customer field is required']
    },
    total: {
        type: String,
        required: [true, 'Total field is required']
    },
    date: {
        type: String,
        required: [true, 'Date field is required']
    }
});

const Sale = mongoose.model('sale', SaleSchema);

module.exports = Sale;