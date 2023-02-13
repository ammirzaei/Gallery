module.exports.getIndex = (req,res)=>{
    res.render('dashboard/index',{
        pageTitle : 'داشبورد',
        layout : './layouts/dashboardLayout',
        nickName : req.user.nickName
    });
}