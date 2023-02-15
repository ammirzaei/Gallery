const path = require('path');

const shortId = require('shortid');
const sharp = require('sharp');

const UserModel = require('./../../models/userModel');
const RequestModel = require('./../../models/requestModel');
const rootDir = require('./../../utils/rootDir');

module.exports.getIndex = async (req, res) => {
    // access to if exist request
    const request = await RequestModel.findOne({ user: req.user.id });

    res.render('dashboard/index', {
        pageTitle: 'داشبورد',
        layout: './layouts/dashboardLayout',
        path: '/dashboard',
        isRequest : request?.status,
        user: {
            nickName: req.user.nickName,
            avatar: req.user.avatar
        }
    });
}

module.exports.getRequest = async (req, res) => {
    // access to if exist request
    const request = await RequestModel.findOne({ user: req.user.id });

    if (req.user.role === 'user' && !request) {
        res.render('dashboard/request', {
            pageTitle: 'ثبت درخواست',
            path: '/dashboard',
            layout: './layouts/dashboardLayout',
            user: {
                nickName: req.user.nickName,
                avatar: req.user.avatar
            },
            errors: []
        });
    } else {
        res.redirect('/dashboard');
    }
}

module.exports.handleRequest = async (req, res) => {
    try {
        //#region User

        // access to avatar input
        const avatar = req.files?.avatar;

        req.body.avatar = avatar;
        // validation user inputs
        await UserModel.requestValidation(req.body);

        // create avatar path
        const avatarName = shortId.generate() + path.extname(avatar.name);
        const avatarPath = `${rootDir}/public/img/avatars/${avatarName}`;

        // compress avatar with sharp
        await sharp(avatar.data).jpeg({
            quality: 50
        }).toFile(avatarPath).catch((err) => {
            console.log(err);
        });

        // access to user from db
        const user = await UserModel.findById(req.user.id);

        // replace new value
        user.nickName = req.body.nickName;
        user.avatar = avatarName;

        // save to db
        await user.save();

        //#endregion User

        //#region Request
        await RequestModel.create({
            user: user.id
        });
        //#endregion Request

        res.redirect('/dashboard');
    } catch (err) {
        const errors = [];

        // if exist error validation
        if (err?.inner) {
            err.inner.forEach(error => {
                errors.push({
                    name: error.path,
                    message: error.message
                });
            })
        }

        res.render('dashboard/request', {
            pageTitle: 'ثبت درخواست',
            path: '/dashboard',
            layout: './layouts/dashboardLayout',
            user: {
                nickName: req.user.nickName,
                avatar: req.user.avatar
            },
            errors
        });
    }
}