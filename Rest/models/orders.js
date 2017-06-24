const mongoose = require('mongoose');
const sale = require('./sales');
const vendor = require('./vendors');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    _sale: {
        type: Schema.Types.ObjectId,
        ref: 'sale'
    },
    _creator: {
        type: Number,
        ref: 'vendor'
    },
    item: {
        type: String,
        required: [true, 'Item is required']
    },
    customer: {
        type: String,
        required: [true, 'Customer field is required']
    },
    cost: {
        type: String,
        required: [true, 'Cost field is required']
    },
    customerEmail: {
        type: String,
        required: [true, 'Customer Email field is required']
    },
    deliveryDate: {
        type: Date,
        expires: '0s',
        default: new Date(+new Date() + 30*60000)
    }
});

const Order = mongoose.model('order', OrderSchema);

module.exports = Order;