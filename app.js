const express = require('express');
const dotenv = require('dotenv');

const app = new express();

const { setRoutes } = require('./utils/routes');
const { setStatics } = require('./utils/statics');

// config process.env
dotenv.config({ path: './config/config.env' })

// use static
setStatics(app);

// use routes
setRoutes(app);

app.listen(process.env.PORT, () => {
    console.log(`Running app on port '${process.env.PORT}' in mode '${process.env.NODE_ENV}'`);
});