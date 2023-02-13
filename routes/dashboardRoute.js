const { Router } = require('express');

const dashboardController = require('./../controllers/dashboardController');
const router = new Router();

// Home Page -- GET
router.get('/', dashboardController.getIndex);

module.exports = router;