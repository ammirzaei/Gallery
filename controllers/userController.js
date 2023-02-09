module.exports.getRegister = (req,res)=>{
    res.render('user/register', {
        pageTitle : 'ثبت نام',
        path : '/user',
        layout : './layouts/userLayout'
    });
}