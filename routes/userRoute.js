const { Router } = require('express');

const userController = require('./../controllers/userController');
const router = new Router();

// Register Page -- GET
router.get('/register', userController.getRegister);

// Handler Register -- POST
router.post('/register', userController.handleRegister);

module.exports = router;