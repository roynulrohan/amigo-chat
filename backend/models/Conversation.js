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
        expireAt: {
            type: Date,
            default: Date.now,
            index: { expires: '5d' },
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
