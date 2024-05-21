// routes/product.js

const express = require('express');
const router = express.Router();
const { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/product');
const { authenticateToken } = require('../middleware/authenticate');

// Apply the authentication middleware to the product routes
router.get('/', authenticateToken, getAllProducts);
router.get('/:id', authenticateToken, getProduct);
router.post('/', authenticateToken, createProduct);
router.put('/:id', authenticateToken, updateProduct);
router.delete('/:id', authenticateToken, deleteProduct);

module.exports = router;
