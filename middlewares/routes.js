module.exports.setRoutes = (app) => {
    app.use(require('./../routes/userRoute'))
    app.use(require('./../routes/homeRoute'));
}