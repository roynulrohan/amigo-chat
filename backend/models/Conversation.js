const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Conversation = new Schema(
    {
        Users: {
            type: Array,
            required: true,
        },
        Messages: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    }
);

module.exports = mongoose.model('Conversation', Conversation);
