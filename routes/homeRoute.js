const { Router } = require('express');

const homeController = require('../controllers/homeController');
const router = new Router();

// Home page -- GET
router.get('/', homeController.getIndex);

module.exports = router;