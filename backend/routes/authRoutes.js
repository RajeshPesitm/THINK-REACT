const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/change-password', auth(), authController.changePassword);
router.post('/create-admin', auth('admin'), authController.createAdmin);

module.exports = router;
