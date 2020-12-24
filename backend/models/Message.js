const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = new Schema({
    Username: {
        type: String,
        required: true,
    },
    Content: {
        type: String,
        required: true,
    },
    DateCreated: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Message', Message);
