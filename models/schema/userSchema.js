const yup = require('yup');

const registerSchema = yup.object().shape({
    email : yup.string().email('لطفا ایمیل معتبر وارد نمایید').required('وارد کردن ایمیل الزامی است').max(250,'ایمیل نباید بیشتر از 250 کاراکتر باشد'),
    password : yup.string().required('وارد کردن رمز عبور الزامی است').min(6,'رمز عبور نباید کمتر از 6 کاراکتر باشد').max(150,'رمز عبور نباید بیشتر از 150 کاراکتر باشد'),
    repassword : yup.string().required('وارد کردن تکرار رمز عبور الزامی است').oneOf([yup.ref('password')],'لطفا رمز های عبور یکسان وارد نمایید').min(6,'رمز عبور نباید کمتر از 6 کاراکتر باشد').max(150,'رمز عبور نباید بیشتر از 150 کاراکتر باشد'),
});

module.exports = {
    registerSchema
}