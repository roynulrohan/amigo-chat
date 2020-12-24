const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = new Schema(
    {
        Username: {
            type: String,
            required: true,
        },
        Content: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: false,
        },
    }
);

module.exports = mongoose.model('Message', Message);
