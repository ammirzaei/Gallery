const fetch = require('node-fetch');
const shortid = require('shortid');
const passport = require('passport');
const urlLocal = require('url-local');

const User = require('./../models/userModel');

module.exports.getRegister = (req, res) => {
    res.render('user/register', {
        pageTitle: 'ثبت نام',
        layout: './layouts/userLayout',
        success: req.flash('success'),
        error: req.flash('error'),
        warning: req.flash('warning'),
        errors: []
    });
}

module.exports.handleRegister = async (req, res) => {
    try {
        // access to response recaptcha in view
        const resRecaptcha = req.body['g-recaptcha-response'];

        // if confirm recaptcha
        if (!resRecaptcha) {
            req.flash('warning', 'لطفا reCAPTCHA را تایید کنید');
            return res.redirect('/register');
        }

        // if valid recaptcha
        if (!handleRecaptcha(resRecaptcha, req.ip)) {
            req.flash('error', 'در اعتبارسنجی reCAPTCHA مشکلی رخ داد');
            return res.redirect('/register');
        }

        // validation of user inputs
        await User.registerValidation(req.body);

        const { email } = req.body;

        // if existed email to db
        const user = await User.findOne({ email });
        if (user) {
            req.flash('warning', 'حساب کاربری از قبل با این ایمیل وارد شده ثبت شده است');
            return redirect('/register');
        }

        // created user to db
        await User.create({
            ...req.body,
            nickName: `user_${shortid.generate()}`
        });

        // successed register
        req.flash('success', 'ثبت نام شما با موفقیت انجام شد');
        res.redirect('/login');
    } catch (err) {
        const errors = [];

        // access to errors register validation for show to user
        if (err?.inner) {
            err.inner.forEach((error) => {
                errors.push({
                    name: error.path,
                    message: error.message
                });
            })
        }

        res.render('user/register', {
            pageTitle: 'ثبت نام',
            layout: './layouts/userLayout',
            success: req.flash('success'),
            error: req.flash('error'),
            warning: req.flash('warning'),
            errors
        });
    }
}

async function handleRecaptcha(resRecaptcha, remoteip) {
    const verify = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${resRecaptcha}&remoteip=${remoteip}`;

    // get response verify from google
    const response = await fetch(verify, {
        method: 'post',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
        }
    });

    // access to response google as json
    const responseJson = await response.json();

    return responseJson.success; // return response(boolean)
}

module.exports.getLogin = (req, res) => {
    // if is authenticated user
    if (req.isAuthenticated())
        return res.redirect('/');

    res.render('user/login', {
        pageTitle: 'ورود به حساب',
        layout: './layouts/userLayout',
        success: req.flash('success'),
        error: req.flash('error'),
        warning: req.flash('warning'),
        errors: [],
        redirect: req.query.redirect ? req.query.redirect : '/'
    });
}

module.exports.handleLogin = async (req, res, next) => {
    try {
        // access to response recaptcha in view
        const resRecaptcha = req.body['g-recaptcha-response'];

        // if confirm recaptcha
        if (!resRecaptcha) {
            req.flash('warning', 'لطفا reCAPTCHA را تایید کنید');
            return res.redirect('/login');
        }

        // if valid confirm recaptcha
        if (!handleRecaptcha(resRecaptcha, req.ip)) {
            req.flash('error', 'در اعتبارسنجی reCAPTCHA مشکلی رخ داد');
            return res.redirect('/login');
        }

        // authentication with passport local
        passport.authenticate('local', {
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next);

    } catch (err) {
        console.log(err);
    }
}

module.exports.handleRememberMe = (req, res) => {
    const { remmemberMe, redirect } = req.body;

    // if confirm remmemberMe
    if (remmemberMe) { // set max age
        req.session.cookie.originalMaxAge = (3600 * 1000) * 24 * 7; // 7 day
    } else {
        req.session.cookie.expire = null;
    }

    // if url is local
    if (urlLocal(redirect))
        res.redirect(redirect);
    else
        res.redirect('/');
}

module.exports.handleLogout = (req, res) => {
    if (req.isAuthenticated()) {
        req.session = null;
        req.logout((err) => {
            if (err) console.log(err);

            res.redirect('/');
        });
    } else
        res.redirect('/');
}