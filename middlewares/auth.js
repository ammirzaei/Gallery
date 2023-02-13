module.exports.authenticated = (req, res, next) => {
    // if is authenticated user
    if (req.isAuthenticated())
        return next();

    req.flash('error', 'برای وارد شدن به آن صفحه ابتدا باید لاگین کنید');

    // access to url for send to login page
    const url = req.originalUrl;
    if(url === '/logout')
        return res.redirect('/login');
    
    res.redirect(`/login?redirect=${url}`);
}