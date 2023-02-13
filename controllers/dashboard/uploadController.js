module.exports.getIndex = (req, res) => {
    res.render('dashboard/upload/index', {
        pageTitle: 'آپلود تصاویر',
        layout: './layouts/dashboardLayout',
        path : '/upload',
        user: {
            nickName: req.user.nickName,
            avatar: req.user.avatar
        }
    });
}