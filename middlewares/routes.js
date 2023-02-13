const { authenticated } = require('./auth');

module.exports.setRoutes = (app) => {
    app.use('/dashboard', authenticated, require('./../routes/dashboard/dashboardRoute'));
    app.use('/dashboard/upload', authenticated, require('./../routes/dashboard/uploadRoute'));
    app.use(require('./../routes/userRoute'))
    app.use(require('./../routes/homeRoute'));
}