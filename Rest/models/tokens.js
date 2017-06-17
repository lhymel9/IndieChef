const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email field is required']
    },
    sessionActivity: {
        type: Date,
        expires: '3600s',
        default: Date.now
    },
    token: {
        type: String,
        required: [true, 'Token field is required']
    }
});

const Token = mongoose.model('token', TokenSchema);

module.exports = Token;