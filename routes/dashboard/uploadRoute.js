const { Router } = require('express');

const uploadController = require('./../../controllers/dashboard/uploadController');
const router = new Router();
const UploadController = new uploadController();

// Home Page -- GET
router.get('/', UploadController.getIndex);

module.exports = router;