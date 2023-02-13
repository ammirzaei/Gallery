const { Router } = require('express');

const userController = require('./../controllers/userController');
const router = new Router();

// Register Page -- GET
router.get('/register', userController.getRegister);

// Handler Register -- POST
router.post('/register', userController.handleRegister);

// Login Page -- GET
router.get('/login', userController.getLogin);

// Handler Login -- POST
router.post('/login', userController.handleLogin, userController.handleRememberMe);

module.exports = router;