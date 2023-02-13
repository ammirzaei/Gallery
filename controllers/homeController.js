module.exports.getIndex = (req,res)=>{
    res.render('home/index',{
        pageTitle : 'صفحه اصلی',
        path : '/home',
        authenticated : req.isAuthenticated()
    });
}