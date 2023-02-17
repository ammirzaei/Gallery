const express = require('express');
const dotenv = require('dotenv');
const expressLayout = require('express-ejs-layouts');
const expressSession = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const mongoStore = require('connect-mongo');
const fileUpload = require('express-fileupload');

const app = new express();

const dbConnection = require('./config/db');
const { setRoutes } = require('./middlewares/routes');
const { setStatics } = require('./middlewares/statics');

// config process.env
dotenv.config({ path: './config/config.env' })

// config passport
require('./config/passport');

// use body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to the database
dbConnection();

// use static
setStatics(app);

// use session
app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    unset: 'destroy',
    saveUninitialized: false,
    cookie: {
        httpOnly: true
    },
    store: mongoStore.create({
        mongoUrl: process.env.MONGO_URI
    })
}));

// use passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// use flash to the req.flash
app.use(flash());

// use file upload to the req.files
app.use(fileUpload());

// use template engine 'ejs'
app.set('view engine', 'ejs');
app.set('views', 'views');
// use layout
app.use(expressLayout);
app.set('layout', './layouts/mainLayout');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);

// use routes
setRoutes(app);

// running project
app.listen(process.env.PORT, () => {
    console.log(`Running app on port '${process.env.PORT}' in mode '${process.env.NODE_ENV}'`);
});