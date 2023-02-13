const passport = require('passport');
const { Strategy } = require('passport-local');
const bcrypt = require('bcrypt');

const User = require('./../models/userModel');

passport.use(new Strategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        // access to user with email
        const user = await User.findOne({ email });

        // if existed user with this email
        if (!user) {
            return done(null, false, {
                message: 'حساب کاربری با ایمیل وارد شده یافت نشد',
                type: 'error'
            });
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);

        // if matched password
        if (isMatch) {
            return done(null, user); // access to req.user
        } else {
            return done(null, false, {
                message: 'ایمیل یا رمز عبور اشتباه است',
                type: 'error'
            })
        }
    } catch (err) {
        console.log(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});