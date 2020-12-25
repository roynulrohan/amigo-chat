const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const User = new Schema({
    Username: {
        type: String,
        required: true,
        trim: true,
    },
    Password: {
        type: String,
        required: true,
    },
    Contacts: {
        type: Array,
        default: [],
    },
    DateCreated: {
        type: Date,
        default: Date.now,
    },
    PhotoURL: {
        type: String,
        default: '',
    },
});

User.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.Password);
};

module.exports = mongoose.model('User', User);
