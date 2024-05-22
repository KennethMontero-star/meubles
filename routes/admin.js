const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Get all customers
router.get('/customers', adminController.getAllCustomers);

// Get specific customer by ID
router.get('/customers/:id', adminController.getCustomerById);

// Edit customer information
router.put('/customers/:id', adminController.editCustomerInformation); // Corrected method name

// Delete customer by ID
router.delete('/customers/:id', adminController.deleteCustomer);

router.get('/products',adminController.getAllProducts);
router.get('/products/:id',adminController.getProductById);
router.post('/products',adminController.createProduct);
router.put('/products/:id',adminController.updateProduct);
router.delete('/products/:id',adminController.deleteProduct);
router.get('/products/category/:category',adminController.getProductsByCategory);

module.exports = router;
