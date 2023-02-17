const { Router } = require('express');

const dashboardController = require('./../../controllers/dashboard/dashboardController');
const router = new Router();
const DashboardController = new dashboardController();

// Home Page -- GET
router.get('/', DashboardController.getIndex);

// submit Request Page -- GET
router.get('/request', DashboardController.getRequest);

// Handler request -- POST
router.post('/request', DashboardController.handleRequest);

module.exports = router;