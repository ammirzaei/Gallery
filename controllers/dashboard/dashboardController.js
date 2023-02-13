module.exports.getIndex = (req, res) => {
    res.render('dashboard/index', {
        pageTitle: 'داشبورد',
        layout: './layouts/dashboardLayout',
        user: {
            nickName: req.user.nickName,
            avatar: req.user.avatar
        }
    });
}