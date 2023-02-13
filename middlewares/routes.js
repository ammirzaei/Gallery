const { authenticated } = require('./auth');

module.exports.setRoutes = (app) => {
    app.use('/dashboard', authenticated, require('./../routes/dashboardRoute'))
    app.use(require('./../routes/userRoute'))
    app.use(require('./../routes/homeRoute'));
}