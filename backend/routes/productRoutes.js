const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const productController = require('../controllers/productController');

router.get('/products', productController.getProducts);
router.get('/products/export', productController.exportProducts);
router.post('/products/import', upload.single('file'), productController.importProducts);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
