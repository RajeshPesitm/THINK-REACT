const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const adminController = require('../controllers/adminController');

router.get('/users', auth('admin'), adminController.getAllUsers);
router.delete('/users/:id', auth('admin'), adminController.deleteUser);

module.exports = router;
