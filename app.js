const express = require('express');

const app = new express();

const { setRoutes } = require('./utils/routes');
const { setStatics } = require('./utils/statics');

// use static
setStatics(app);

// use routes
setRoutes(app);

app.listen(3000, () => {
    console.log('Running app on port 3000');
});