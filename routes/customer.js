const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/products',customerController.getAllProducts);
router.get('/products/category/:category',customerController.getProductsByCategory);

// Routes requiring authentication
router.post('/register', customerController.register);
router.post('/login', customerController.login);
router.post('/cart', authenticateUser, customerController.addToCart);
router.post('/checkout', authenticateUser, customerController.checkout);

// Middleware to authenticate user
function authenticateUser(req, res, next) {
    // Check if user is authenticated
    // For example, you can check if the user is logged in or if they have a valid session/token
    if (req.isAuthenticated()) {
        // User is authenticated, proceed to the next middleware or route handler
        return next();
    } else {
        // User is not authenticated, send an error response
        return res.status(401).json({ error: 'Unauthorized' });
    }
}

module.exports = router;
