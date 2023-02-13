const { Router } = require('express');

const uploadController = require('./../../controllers/dashboard/uploadController');
const router = new Router();

// Home Page -- GET
router.get('/', uploadController.getIndex);

module.exports = router;