const { Router } = require('express');

const dashboardController = require('./../../controllers/dashboard/dashboardController');
const router = new Router();

// Home Page -- GET
router.get('/', dashboardController.getIndex);

// submit Request Page -- GET
router.get('/request', dashboardController.getRequest);

// Handler request -- POST
router.post('/request', dashboardController.handleRequest);

module.exports = router;