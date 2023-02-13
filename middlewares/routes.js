const { authenticated } = require('./auth');

module.exports.setRoutes = (app) => {
    app.use('/dashboard', authenticated, require('./../routes/dashboard/dashboardRoute'))
    app.use(require('./../routes/userRoute'))
    app.use(require('./../routes/homeRoute'));
}