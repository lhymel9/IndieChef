const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SaltSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email field is required']
    },
    salt: {
        type: String,
        required: [true, 'Password field is required']
    }
});

const Salt = mongoose.model('salt', SaltSchema);

module.exports = Salt;