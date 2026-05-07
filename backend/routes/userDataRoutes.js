const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userDataController = require('../controllers/userDataController');

router.get('/products', auth(), userDataController.getProducts);
// Add more routes for import/export/update/delete with role checks

module.exports = router;
