class HomeController {
    getIndex(req,res){
        res.render('home/index',{
            pageTitle : 'صفحه اصلی',
            authenticated: req.isAuthenticated()
        });
    }
}

module.exports = HomeController;