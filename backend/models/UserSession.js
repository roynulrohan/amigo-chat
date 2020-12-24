const mongoose = require('mongoose');

const UserSession = new mongoose.Schema({
    userId: {
        type: String,
        default: '',
    },
    timestamp: {
        type: Date,
        default: Date.now(),
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    // expire so database doesn't get filled with userSessions
    expire_at: { type: Date, default: Date.now, expires: 86400 },
});

module.exports = mongoose.model('UserSession', UserSession);
