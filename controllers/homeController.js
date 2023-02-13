module.exports.getIndex = (req,res)=>{
    res.render('home/index',{
        pageTitle : 'صفحه اصلی',
        authenticated : req.isAuthenticated()
    });
}