const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nickName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 150
    },
    email: {
        type: String,
        required: true,
        trim: true,
        maxlength: 250,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 150
    },
    role: {
        type: String,
        default: 'user',
        enum: ['admin', 'photographer', 'user']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('user', userSchema);
