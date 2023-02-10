const fetch = require('node-fetch');
const shortid = require('shortid');

const User = require('./../models/userModel');

module.exports.getRegister = (req, res) => {
    res.render('user/register', {
        pageTitle: 'ثبت نام',
        path: '/user',
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
        res.redirect('/register');
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
            path: '/user',
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