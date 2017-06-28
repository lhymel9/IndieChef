const mongoose = require('mongoose');
const vendor = require('./vendors');
const sale = require('./sales');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    _creator: {
        type: Number,
        ref: 'vendor'
    },
    _saleId: {
        type: String,
        required: [true, '_saleId field is required']
    },
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    itemTypes: {
        type: [String],
        required: [true, 'Item types field required']
    },
    cost: {
        type: String,
        required: [true, 'Cost field required']
    },
    description: {
        type: String
    },
    sales: [{ type: Schema.Types.ObjectId, 
               ref: 'sale' }],
    path: {
        type: String,
        required: [true, 'Image path is required']
    }
});

const Item = mongoose.model('item', ItemSchema);

module.exports = Item;