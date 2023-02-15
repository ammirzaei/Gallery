module.exports.getIndex = (req, res) => {
    if (req.user.role === 'photographer') {
        res.render('dashboard/upload/index', {
            pageTitle: 'آپلود تصاویر',
            layout: './layouts/dashboardLayout',
            path: '/upload',
            user: {
                nickName: req.user.nickName,
                avatar: req.user.avatar
            }
        });
    } else {
        res.redirect('/dashboard/request');
    }

}