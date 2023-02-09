const express = require('express');
const dotenv = require('dotenv');
const expressLayout = require('express-ejs-layouts');

const app = new express();

const { setRoutes } = require('./utils/routes');
const { setStatics } = require('./utils/statics');

// config process.env
dotenv.config({ path: './config/config.env' })

// use static
setStatics(app);

// use template engine 'ejs'
app.set('view engine', 'ejs');
app.set('views', 'views');
// use layout
app.use(expressLayout);
app.set('layout', './layouts/mainLayout');
app.set('layout extractScripts', true);

// use routes
setRoutes(app);

app.listen(process.env.PORT, () => {
    console.log(`Running app on port '${process.env.PORT}' in mode '${process.env.NODE_ENV}'`);
});