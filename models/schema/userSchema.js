const yup = require('yup');

const registerSchema = yup.object().shape({
    email: yup.string().email('لطفا ایمیل معتبر وارد نمایید').required('وارد کردن ایمیل الزامی است').max(250, 'ایمیل نباید بیشتر از 250 کاراکتر باشد'),
    password: yup.string().required('وارد کردن رمز عبور الزامی است').min(6, 'رمز عبور نباید کمتر از 6 کاراکتر باشد').max(150, 'رمز عبور نباید بیشتر از 150 کاراکتر باشد'),
    repassword: yup.string().required('وارد کردن تکرار رمز عبور الزامی است').oneOf([yup.ref('password')], 'لطفا رمز های عبور یکسان وارد نمایید').min(6, 'رمز عبور نباید کمتر از 6 کاراکتر باشد').max(150, 'رمز عبور نباید بیشتر از 150 کاراکتر باشد'),
});

const requestSchema = yup.object().shape({
    nickName: yup.string().required('وارد کردن نام نمایشی الزامی است').min(4, 'نام نمایشی نباید کمتر از 4 کاراکتر باشد').max(150, 'نام نمایشی نباید بیشتر 150 کاراکتر باشد'),
    avatar: yup.object().shape({
        name: yup.string().required('انتخاب آواتار الزامی است'),
        size: yup.number().max(2100000, 'حجم آواتار نباید بیشتر از 2 مگابایت باشد'),
        mimetype: yup.mixed().oneOf(['image/jpeg', 'image/png'], 'تنها فرمت های JPG , PNG را میتوانید انتخاب کنید')
    })
});
module.exports = {
    registerSchema,
    requestSchema
}