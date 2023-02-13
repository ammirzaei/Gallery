const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { registerSchema } = require('./schema/userSchema');

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
    avatar: {
        type: String,
        default: 'user.png'
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

// register schema for validation user inputs
userSchema.statics.registerValidation = function (body) {
    return registerSchema.validate(body, { abortEarly: false });
}

// encypting password when create and edit user
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    // encrypt
    const hashPassword = await bcrypt.hash(user.password, 10);
    user.password = hashPassword;

    next();
});

module.exports = mongoose.model('user', userSchema);
