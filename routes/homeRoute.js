const { Router } = require('express');

const homeController = require('../controllers/homeController');
const router = new Router();
const HomeController = new homeController();

// Home page -- GET
router.get('/', HomeController.getIndex);

module.exports = router;