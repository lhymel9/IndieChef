const mongoose = require('mongoose');
const vendor = require('./vendors');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    _creator: {
        type: Number,
        ref: 'vendor'
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
    }
});

const Item = mongoose.model('item', ItemSchema);

module.exports = Item;