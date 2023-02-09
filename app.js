const express = require('express');
const dotenv = require('dotenv');
const expressLayout = require('express-ejs-layouts');

const app = new express();

const dbConnection = require('./config/db');
const { setRoutes } = require('./middlewares/routes');
const { setStatics } = require('./middlewares/statics');

// config process.env
dotenv.config({ path: './config/config.env' })

// connect to the database
dbConnection();

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

// running project
app.listen(process.env.PORT, () => {
    console.log(`Running app on port '${process.env.PORT}' in mode '${process.env.NODE_ENV}'`);
});