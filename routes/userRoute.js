const { Router } = require('express');

const userController = require('./../controllers/userController');
const router = new Router();
const UserController = new userController();

// Register Page -- GET
router.get('/register', UserController.getRegister);

// Handler Register -- POST
router.post('/register', UserController.handleRegister);

// Login Page -- GET
router.get('/login', UserController.getLogin);

// Handler Login -- POST
router.post('/login', UserController.handleLogin, UserController.handleRememberMe);

// Handler Logout -- GET
router.get('/logout', UserController.handleLogout);

module.exports = router;